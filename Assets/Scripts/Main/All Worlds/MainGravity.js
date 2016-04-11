#pragma strict
import System.Linq;

// Gravity Vars

enum Direction { Down, Right, Up, Left };
enum ObjectDirection { Down, Right, Up, Left }

private var gravity = 9.81;
private var lunaGravity = 9.81;

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

private var facingRight = true;
public var rotateRate : float;
private var nextRotate = 0.0;
public var canRotate = true;
public var canRotate180 = false;

private var normalGravObjects = ["DeathRock", "NiceBox", "BlackHoleBox"];
private var reverseGravObjects = ["ReverseObject", "ReverseDeathObject"];
private var groundObjects = ["Ground", "ShifterL", "ShifterR", "ShifterD", "ShifterU", "RotaterL", "RotaterR", "NiceBox", "BlackHoleBox", "Door"];

var vertical = ["x", "y"];
var horizontal = ["y", "x"];
var upDownAxis = vertical;

private var wind : AudioSource;

function Start () {
	setWorldGravityShift();
	wind = GameObject.Find("Wind").GetComponent(AudioSource);
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
			setAxisForcesTo(horizontal, 9.81);
			break;
		case ObjectDirection.Right:
			setAxisForcesTo(horizontal, -9.81);
			break;
	}
}

function setAxisForcesTo(dir : String[], grav : float) {
	upDownAxis = dir; gravity = grav;
}

function Update() {
	// Gravity Rotation

	if (isFrozen) { return false; }

	if (Input.GetKeyDown(KeyCode.RightArrow) && canRotateGravity()) {
		adjustGravityRight();
		rotatePlayerAndObjects(90);
		rotateCameraInDegrees(90);
	}

	if (Input.GetKeyDown(KeyCode.LeftArrow) && canRotateGravity()) {
		adjustGravityLeft();
		rotatePlayerAndObjects(-90);
		rotateCameraInDegrees(-90);
	}

	if (canRotate180)
	{
		if (Input.GetKeyDown(KeyCode.UpArrow) && canRotateGravity()) {
			adjustGravity180();
			rotatePlayerAndObjects(-180);
			rotateCameraInDegrees(-180);
		}

		if (Input.GetKeyDown(KeyCode.DownArrow) && canRotateGravity()) {
			adjustGravity180();
			rotatePlayerAndObjects(180);
			rotateCameraInDegrees(180);
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

function rotateCameraInDegrees(degrees : float) {
	GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).rotate(degrees, rotateRate);
	playSound("RotateGravitySound");
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
	nextRotate = Time.time + rotateRate + 0.2;
	adjustShifters(["ShifterD", "ShifterU"], Vector3.forward * degrees);
	adjustShifters(["ShifterL", "ShifterR"], Vector3.forward * -degrees);
}

function adjustShifters(shifters : String[], degrees : Vector3) {
	for (var shifter : String in shifters) {
		var shift = GameObject.FindGameObjectWithTag(shifter);
		if (shift != null) {
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

function canRotateGravity() {
	return (Time.time > nextRotate + 0.001 && canRotate);
}

function setObjectGravitySettings(gravitySetting : float, axis : String) {
	objGravity(normalGravObjects, gravitySetting, axis);
	objGravity(reverseGravObjects, -gravitySetting, axis);
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
	if (Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.D)) {
		isMoving = true;
	} else {
		isMoving = false;
	}
}

// Movement and Orientation

function setMovements(jumpHeight : float, moveSpeed : float) {
	var x; var y;
	Jump(x, y, jumpHeight);
	if (Input.GetKey(KeyCode.A)) { Move(x, y, -moveSpeed, facingRight);   } // Left
	if (Input.GetKey(KeyCode.D)) { Move(x, y, moveSpeed, !facingRight);   } // Right
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

	if (Mathf.Abs(newVelocity) > Mathf.Abs(speed)) {
		newVelocity = speed;
	}
	return newVelocity;
}


function Jump(x, y, jump) {
	var rigidbody = GetComponent(Rigidbody2D);
	if (Input.GetKeyDown(KeyCode.Space) && canJump()) {
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
	playSound("JumpSound");
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
		GetComponent(MovementSounds).onGround = true;
	} else {
		touchingGround = false;
		GetComponent(MovementSounds).onGround = false;
	}
}

function playerIsTouchingGround(contactPoint : RaycastHit2D) {
	var itemIsGround : boolean = false;
	for (var item : String in groundObjects) {
		if (contactPoint.collider.tag == item) {
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


function adjustFallingSounds(rigidbody : Rigidbody2D) {
	if (gravityIsUpOrDown()) {
		wind.volume = Mathf.Abs(rigidbody.velocity.y / 80);
	} else {
		wind.volume = Mathf.Abs(rigidbody.velocity.x / 80);
	}
}

function playSound(tag : String) {
  var audio = GameObject.FindGameObjectWithTag(tag).GetComponent(AudioSource);
  audio.Play();
}
