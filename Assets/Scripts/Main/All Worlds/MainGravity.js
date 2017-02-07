#pragma strict
import System.Linq;

// Gravity Vars

enum Direction { Down, Right, Up, Left };
enum ObjectDirection { Down, Right, Up, Left }

public var gravity : float = 9.81;
public var lunaGravity : float = 9.81;

public var gravityDirection = Direction.Down;
public var gravityObjectDirection = ObjectDirection.Down;

// Move & Jump

public var moveSpeed : float;
public var accelerationRate : float = 13;
public var jumpHeight : float;
public var maxJumps = 1;
public var numJumps = 0; // number of current jumps

public var touchingGround = true;
public var isMoving = false;
public var isFrozen = false;
public var feetDistanceFromCenter : float;

// Orientation & Rotation

public var cameraRotationEnabled : boolean = true;
public var facingRight = true;
public var rotateRate : float;
private var nextRotate = 0.0;
public var canRotate = true;
public var isSubcutaneous = false;
public var canMove = true;
public var canRotate180 = false;
public var canDoExperimentalRotation = false;

private var normalGravObjects = ["DeathRock", "NiceBox", "BlackHoleBox"];
private var reverseGravObjects = ["ReverseObject", "ReverseDeathObject"];
private var leftieGravObjects = ["LeftieObject", "LeftieDeathObject"];
private var rightieGravObjects = ["RightieObject", "RightieDeathObject"];
private var groundObjects = ["Ground", "StubbornGround", "StubbornGroundReverse", "RotaterL", "RotaterR", "Rotater180", "Rotater-180", "NiceBox", "BlackHoleBox", "Door"];

var vertical = ["x", "y"];
var horizontal = ["y", "x"];
var upDownAxis = vertical;

private var AButton = "";
private var MovementAxis = "";
private var GravRotateRightButton = "";
private var GravRotateLeftButton = "";


private var wind : AudioSource;

function Start () {
	setWorldGravityShift();
	wind = GameObject.Find("Wind").GetComponent(AudioSource);

	var gameSettings;
	if (!GameObject.Find("GameSettings")) {
		gameSettings = false;
	} else {
	}

	if (!gameSettings) { // dev
		AButton = "A Button Macintosh";
		MovementAxis = "Left Joystick Macintosh";
		GravRotateRightButton = "Right Trigger Macintosh";
		GravRotateLeftButton = "Left Trigger Macintosh";
	} else {
		var gameSettingsRef : GameObject = GameObject.Find("GameSettings");

		AButton = gameSettingsRef.GetComponent(GameSettings).AButton;
		MovementAxis = gameSettingsRef.GetComponent(GameSettings).MovementAxis;
		GravRotateRightButton = gameSettingsRef.GetComponent(GameSettings).GravRotateRightButton;
		GravRotateLeftButton = gameSettingsRef.GetComponent(GameSettings).GravRotateLeftButton;
	}
}

function setWorldGravityShift() {
	switch (gravityObjectDirection)
	{
		case ObjectDirection.Down:
			setAxisForcesTo(vertical, 9.81);
			break;
		case ObjectDirection.Up:
			setAxisForcesTo(vertical, -9.81);
			break;
		case ObjectDirection.Left:
			if (gravityIsUpOrDown()) {
				setAxisForcesTo(horizontal, 9.81);
			} else {
				setAxisForcesTo(horizontal, -9.81);
			}
			break;
		case ObjectDirection.Right:
			if (gravityIsUpOrDown()) {
				setAxisForcesTo(horizontal, -9.81);
			} else {
				setAxisForcesTo(horizontal, 9.81);
			}
			break;
	}
}

function setAxisForcesTo(dir : String[], grav : float) {
	upDownAxis = dir; gravity = grav;
}

function Update() {
	// Gravity Rotation

	if (isFrozen) { return false; }

	if (Input.GetKeyDown(KeyCode.Backspace)) {
		GetComponent(PlayerGameStates).Die();
	}

	if ((Input.GetKeyDown(KeyCode.RightArrow) || Input.GetAxis(GravRotateRightButton) > 0) && canRotateGravity() && !isSubcutaneous) {
		if (SaveData.currentData) {
			if (SaveData.currentData.rotation == 90) {
				shiftRight();
			} else {
				shiftLeft();
			}
		} else {
			shiftRight();
		}
		setWorldGravityShift();
	}

	if ((Input.GetKeyDown(KeyCode.LeftArrow) || Input.GetAxis(GravRotateLeftButton) > 0) && canRotateGravity() && !isSubcutaneous) {
		if (SaveData.currentData) {
			if (SaveData.currentData.rotation == 90) {
				shiftLeft();
			} else {
				shiftRight();
			}
		} else {
			shiftLeft();
		}
		setWorldGravityShift();
	}

	if (canRotate180)
	{
		if (Input.GetKeyDown(KeyCode.UpArrow) && canRotateGravity() && !isSubcutaneous) {
			adjustGravity180();
			rotatePlayerAndObjects(-180);
			rotateCameraInDegrees(-180);
		}

		if (Input.GetKeyDown(KeyCode.DownArrow) && canRotateGravity() && !isSubcutaneous) {
			adjustGravity180();
			rotatePlayerAndObjects(180);
			rotateCameraInDegrees(180);
		}
	}

	if (canDoExperimentalRotation) {
		if (Input.GetKeyDown(KeyCode.L) && canRotateGravity() && !isSubcutaneous) {
			rotatePlayerAndObjects(45);
			rotateCameraInDegrees(45);
		}

		if (Input.GetKeyDown(KeyCode.K) && canRotateGravity() && !isSubcutaneous) {
			rotatePlayerAndObjects(-45);
			rotateCameraInDegrees(-45);
		}
	}

	switch (gravityDirection)
	{
		case Direction.Down:
			setMovements(jumpHeight, moveSpeed);
			checkIfGrounded(-Vector2.up, feetDistanceFromCenter);
			break;
		case Direction.Up:
			setMovements(-jumpHeight, -moveSpeed);
			checkIfGrounded(-Vector2.down, -feetDistanceFromCenter);
			break;
		case Direction.Left:
			setMovements(jumpHeight, -moveSpeed);
			checkIfGrounded(-Vector2.right, feetDistanceFromCenter);
			break;
		case Direction.Right:
			setMovements(-jumpHeight, moveSpeed);
			checkIfGrounded(-Vector2.left, -feetDistanceFromCenter);
			break;
	}

	return true;
}

function shiftRight() {
	adjustGravityRight();
	rotatePlayerAndObjects(90);
	rotateCameraInDegrees(90);
}

function shiftLeft() {
	adjustGravityLeft();
	rotatePlayerAndObjects(-90);
	rotateCameraInDegrees(-90);
}

function rotateCameraInDegrees(degrees : float) {
	if (cameraRotationEnabled) {
		GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).rotate(degrees, rotateRate);
		Sounds.use.ConstructOneOffSound("Warp", transform.position);
	}
}

function FixedUpdate () {

	var rigidbody = GetComponent(Rigidbody2D);
	adjustFallingSounds(rigidbody);
	checkIfMoving();

	switch (gravityDirection)
	{
		case Direction.Down:
			rigidbody.velocity.y += -lunaGravity * Time.deltaTime;
			setObjectGravitySettings(-gravity, upDownAxis[1]);
			break;
		case Direction.Up:
			rigidbody.velocity.y += lunaGravity * Time.deltaTime;
			setObjectGravitySettings(gravity, upDownAxis[1]);
			break;
		case Direction.Left:
			rigidbody.velocity.x += -lunaGravity * Time.deltaTime;
			setObjectGravitySettings(-gravity, upDownAxis[0]);
			break;
		case Direction.Right:
			rigidbody.velocity.x += lunaGravity * Time.deltaTime;
			setObjectGravitySettings(gravity, upDownAxis[0]);
			break;
	}
}


function rotatePlayerAndObjects(degrees : float) {
	MoveObject.use.Rotation(transform, Vector3.forward * degrees, rotateRate);
	nextRotate = Time.time + rotateRate + 0.01;
	adjustShifters(["ShifterD", "ShifterU"], Vector3.forward * degrees);
	adjustShifters(["ShifterL"], Vector3.forward * degrees);
	adjustShifters(["ShifterR"], Vector3.forward * degrees);
	adjustShifters(["StubbornGround"], Vector3.forward * degrees);
	adjustShifters(["StubbornGroundReverse"], Vector3.forward * -degrees);
}

function adjustShifters(shifters : String[], degrees : Vector3) {
	for (var shifter : String in shifters) {
		var shifts = GameObject.FindGameObjectsWithTag(shifter);
		for (var shift in shifts) {
			MoveObject.use.Rotation(shift.transform, degrees, rotateRate);
		}
	}
}


function adjustGravityLeft()
{
	switch (gravityDirection)
	{
		case Direction.Down:
			gravityDirection = Direction.Left;
			break;
		case Direction.Left:
			gravityDirection = Direction.Up;
			break;
		case Direction.Up:
			gravityDirection = Direction.Right;
			break;
		case Direction.Right:
			gravityDirection = Direction.Down;
			break;
	}
}

function adjustGravityRight()
{
	switch (gravityDirection)
	{
		case Direction.Down:
			gravityDirection = Direction.Right;
			break;
		case Direction.Right:
			gravityDirection = Direction.Up;
			break;
		case Direction.Up:
			gravityDirection = Direction.Left;
			break;
		case Direction.Left:
			gravityDirection = Direction.Down;
			break;
	}
}

function adjustGravity180()
{
	switch (gravityDirection)
	{
		case Direction.Down:
			gravityDirection = Direction.Up;
			break;
		case Direction.Right:
			gravityDirection = Direction.Left;
			break;
		case Direction.Up:
			gravityDirection = Direction.Down;
			break;
		case Direction.Left:
			gravityDirection = Direction.Right;
			break;
	}
}

// for checkpoints only to be called on level load after death if checkpoint has been triggered
function adjustGravityTo(direction) {
	switch (direction)
	{
		case "Down":
			gravityDirection = Direction.Down;
			setCameraAndPlayerImmediatelyTo(0);
			break;
		case "Up":
			gravityDirection = Direction.Up;
			setCameraAndPlayerImmediatelyTo(180);
			break;
		case "Left":
			gravityDirection = Direction.Left;
			setCameraAndPlayerImmediatelyTo(-90);
			break;
		case "Right":
			gravityDirection = Direction.Right;
			setCameraAndPlayerImmediatelyTo(90);
			break;
	}
}

function setCameraAndPlayerImmediatelyTo(degree) {
	GameObject.Find("Camera").transform.rotation = Quaternion.Euler(Vector3(0,0,degree));
	transform.rotation = Quaternion.Euler(Vector3(0,0,degree));
}

function canRotateGravity() {
	return (Time.time > nextRotate + 0.001 && (canRotate || isSubcutaneous));
}

function setObjectGravitySettings(gravitySetting : float, axis : String) {
	objGravity(normalGravObjects, gravitySetting, axis);
	objGravity(reverseGravObjects, -gravitySetting, axis);

	if (axis == "y") {
		objGravity(leftieGravObjects, gravitySetting, oppositeAxis(axis));
		objGravity(rightieGravObjects, -gravitySetting, oppositeAxis(axis));
	} else {
		objGravity(leftieGravObjects, -gravitySetting, oppositeAxis(axis));
		objGravity(rightieGravObjects, gravitySetting, oppositeAxis(axis));
	}
}

function oppositeAxis(axis) {
	if (axis == "y") { return "x"; } else { return "y"; }
}


function objGravity(taggedItems : String[], gravity : float, axis : String) {
	for (var taggedItem : String in taggedItems) {
		if (taggedItem == "BlackHoleBox") { gravity *= 10; }

		var objects = GameObject.FindGameObjectsWithTag(taggedItem);
		for (var object : GameObject in objects) {
			if (axis == "y") { object.GetComponent(Rigidbody2D).velocity.y += gravity * Time.deltaTime; }
			if (axis == "x") { object.GetComponent(Rigidbody2D).velocity.x += gravity * Time.deltaTime; }
		}

	}
}

function checkIfMoving() {
	if ((Input.GetKey(KeyCode.A) || Input.GetAxis(MovementAxis) < -0.40)  || (Input.GetKey(KeyCode.D) || Input.GetAxis(MovementAxis) >  0.40)) {
		isMoving = true;
	} else {
		isMoving = false;
	}
}

// Movement and Orientation

function setMovements(jumpHeight : float, moveSpeed : float) {
	if (!canMove) { return false; }
	var x; var y;
	Jump(x, y, jumpHeight);
	if (Input.GetKey(KeyCode.A) || Input.GetAxis(MovementAxis) < -0.40) { Move(x, y, -moveSpeed, facingRight);   } // Left
	if (Input.GetKey(KeyCode.D) || Input.GetAxis(MovementAxis) >  0.40) { Move(x, y, moveSpeed, !facingRight);   } // Right

	return true;
}

function setNoMovements() {
	GetComponent(Rigidbody2D).velocity = new Vector2(0,0);
	isFrozen = true;
}


function Move(x, y, moveSpeed : float, orientation) {
	var rigidbody = GetComponent(Rigidbody2D);

	if (gravityIsUpOrDown()) {
		x = calculateAcceleration(moveSpeed, rigidbody.velocity.x);
		y = rigidbody.velocity.y;
	} else {
		x = rigidbody.velocity.x;
		y = calculateAcceleration(moveSpeed, rigidbody.velocity.y);
	}

	calculateMovement(x,y, orientation);
}

function calculateMovement(x,y, orientation) {
	GetComponent(Rigidbody2D).velocity = new Vector2(x, y);
	flipIf(orientation);
}

function calculateAcceleration(speed : float, vectorDirection : float) {
	var newAccel = speed * accelerationRate;
	var newVelocity = (newAccel * Time.deltaTime) + vectorDirection;

	// account for acceleration from a standing position && reset velocity max if touching ground
	if (touchingGround && Mathf.Abs(newVelocity) > Mathf.Abs(speed)) {
		newVelocity = speed;
	}

	// Account for forward momentum, don't kill it on input in the same direction
	if (newVelocity > speed && Mathf.Abs(speed) == speed) {
		return vectorDirection;
	} else if (newVelocity < speed && Mathf.Abs(speed) != speed) {
		return vectorDirection;
	}

	// Account for the abs of reverse momentum being greater than the abs of speed, account for
	// direction changes at high velocities
	if (newVelocity > 0 && Mathf.Abs(speed) != speed) {
		return newVelocity;
	} else if (newVelocity < 0 && Mathf.Abs(speed) == speed) {
		return newVelocity;
	}

	return newVelocity;
}


function Jump(x, y, jump) {
	var rigidbody = GetComponent(Rigidbody2D);
	if (Input.GetButtonDown(AButton) && canJump()) {
		if (gravityIsUpOrDown()) {
			x = rigidbody.velocity.x;
			y = jump;
		} else {
			y = rigidbody.velocity.y;
			x = jump;
		}
		rigidbody.velocity = new Vector2(x, y);
		registerJump();
	}
}

function registerJump() {
	numJumps++;

	if (cameraRotationEnabled) {
		Sounds.use.PlaySoundByTag("JumpSound");
	}

	GetComponent(Animator).SetTrigger("InAir");
}

function flipIf(orientation) {
	if (orientation) {
		Flip();
	}
}

function Flip() {
	var flipScale : Vector3;
	var rigidbody : Rigidbody2D;

	rigidbody = GetComponent(Rigidbody2D);
	flipScale = rigidbody.transform.localScale;
	flipScale.x *= -1;

	rigidbody.transform.localScale = flipScale;
	facingRight = !facingRight;
}

function canJump() {
	return numJumps < maxJumps;
}


// Ground Raycast Functions

function checkIfGrounded(direction : Vector2, distance : float) {
	var vector : Vector2 = determinedRaycastVector(distance);
	var contactPoint : RaycastHit2D = Physics2D.Raycast(vector, direction);

	if (playerIsTouchingGround(contactPoint)) {
		if (!isMoving) { killDownwardsVelocity(); }
		touchingGround = true;
	} else {
		touchingGround = false;
	}
}

function playerIsTouchingGround(contactPoint : RaycastHit2D) {
	if (contactPoint.collider == null) { return false; }
	var itemIsGround : boolean = false;
	for (var item : String in groundObjects) {
		if (contactPoint.collider.CompareTag(item)) {
			itemIsGround = true;
		}
	}
	return contactPoint.distance == 0 && itemIsGround;
}

function determinedRaycastVector(distance : float) {
	if (gravityIsUpOrDown()) {
		return Vector2(transform.position.x, transform.position.y - distance);
	} else {
		return Vector2(transform.position.x - distance, transform.position.y);
	}
}

function killDownwardsVelocity() {
	if (gravityIsUpOrDown()) {
		GetComponent(Rigidbody2D).velocity.x = 0;
	} else {
		GetComponent(Rigidbody2D).velocity.y = 0;
	}
}

function gravityIsUpOrDown() {
	return	gravityDirection == Direction.Down || gravityDirection == Direction.Up;
}

function gravityIsDownOrRight() {
	return	gravityDirection == Direction.Down || gravityDirection == Direction.Right;
}


function adjustFallingSounds(rigidbody : Rigidbody2D) {
	if (cameraRotationEnabled) {
		if (gravityIsUpOrDown()) {
			wind.volume = Mathf.Abs(rigidbody.velocity.y / 80);
		} else {
			wind.volume = Mathf.Abs(rigidbody.velocity.x / 80);
		}
	}
}
