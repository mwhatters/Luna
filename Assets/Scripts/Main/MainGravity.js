#pragma strict
import System.Linq;

// Gravity Vars

enum Direction { Down, Right, Up, Left };

private var gravity = 9.81;
private var lunaGravity = 9.81;
public var gravitySettings : String;
private var gravityDirection = Direction.Down;

// Move & Jump

public var moveSpeed : float;
public var jumpHeight : float;
private var maxJumps = 1;
private var numJumps = 0; // number of current jumps
private var jumpContactPoint = [0.0, 1.0];

private var touchingGround = false;

// Orientation & Rotation

private var facingRight = true;
public var rotateRate : float;
private var nextRotate = 0.0;
public var canRotate = true;

public var frozen = false;


// Game States

public var keysFound : GameObject[];



private var isDead = false;
private var hasWon = false;

private var normalGravObjects = ["DeathRock", "NiceBox", "BlackHoleBox"];

private var upDownAxis = ["x", "y"];
var currentAxis : String;

function Start () {
	setWorldGravityShift();
}

function setWorldGravityShift() {
	if (gravitySettings == "normal") {
		upDownAxis = ["x", "y"];
		gravity = 9.81;
	} else if (gravitySettings == "reverse") {
		upDownAxis = ["x", "y"];
		gravity = -9.81;
	} else if (gravitySettings == "left shift") {
		upDownAxis = ["y", "x"];
		gravity = 9.81;
	} else if (gravitySettings == "right shift") {
		upDownAxis = ["y", "x"];
		gravity = -9.81;
	}
}

function FixedUpdate () {

	if (isDead || hasWon || frozen) {
		setNoMovements();
		return false;
	}

	// Gravity Settings

	if (gravityDirection == Direction.Down) {
		currentAxis = upDownAxis[1];
		GetComponent(Rigidbody2D).velocity.y += -lunaGravity * Time.deltaTime;
		objGravity(normalGravObjects, -gravity, currentAxis);
		setDownMovements();
	}

	if (gravityDirection == Direction.Up) {
		currentAxis = upDownAxis[1];
		GetComponent(Rigidbody2D).velocity.y += lunaGravity * Time.deltaTime;
		objGravity(normalGravObjects, gravity, currentAxis);
		setUpMovements();

	}

	if (gravityDirection == Direction.Left) {
		currentAxis = upDownAxis[0];
		GetComponent(Rigidbody2D).velocity.x += -lunaGravity * Time.deltaTime;
		objGravity(normalGravObjects, -gravity, currentAxis);
		setLeftMovements();
	}

	if (gravityDirection == Direction.Right) {
		currentAxis = upDownAxis[0];
		GetComponent(Rigidbody2D).velocity.x += lunaGravity * Time.deltaTime;
		objGravity(normalGravObjects, gravity, currentAxis);
		setRightMovements();
	}


	// Gravity Rotation

	if (Input.GetKeyDown(KeyCode.RightArrow) && canRotateGravity()) {
		
		adjustGravityRight();

		Rotate(transform, Vector3.forward * 90, 0.0);
		nextRotate = Time.time + rotateRate + 0.2;

		adjustShifters(["ShifterD", "ShifterU"], Vector3.forward * 90);
		adjustShifters(["ShifterL", "ShifterR"], Vector3.forward * -90);

		GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).rotateRight(rotateRate);
		playSound("RotateGravitySound");

	}

	if (Input.GetKeyDown(KeyCode.LeftArrow) && canRotateGravity()) {
		adjustGravityLeft();

		Rotate(transform, Vector3.forward * -90, 0.0);
		nextRotate = Time.time + rotateRate + 0.2;

		adjustShifters(["ShifterD", "ShifterU"], Vector3.forward * -90);
		adjustShifters(["ShifterL", "ShifterR"], Vector3.forward * 90);

		GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).rotateLeft(rotateRate);
		playSound("RotateGravitySound");

	}

//	if (Input.GetKeyDown(KeyCode.UpArrow) && canRotateGravity()) {
//		var camera = GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior);
//		camera.reorient(Vector3(transform.position.x, transform.position.y, -8), camera.camScope, transform.eulerAngles.z);
//	}
}


function adjustShifters(shifters, degrees) {
	for (var shifter in shifters) {
		var shift = GameObject.FindGameObjectWithTag(shifter);

		if (shift != null) {
			Rotate(shift.transform, degrees, 1);
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

function adjustGravityRight() {
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


function Rotate(object, degrees, time : float) {
	MoveObject.use.Rotation(object, degrees, rotateRate);
}


function canRotateGravity() {
	return (Time.time > nextRotate + 0.01 && canRotate);
}


function objGravity(taggedItems : Array, g : float, axis : String) {
	for (var taggedItem in taggedItems) {

		if (taggedItem == "BlackHoleBox") { g *= 10; }

		var objects = GameObject.FindGameObjectsWithTag(taggedItem);

		for (var object : GameObject in objects) {

			if (axis == "y") { object.GetComponent(Rigidbody2D).velocity.y += g * Time.deltaTime; }
			if (axis == "x") { object.GetComponent(Rigidbody2D).velocity.x += g * Time.deltaTime; }
		}

	}
}





// Movement and Orientation

function setDownMovements() {
	var x; var y;

	xJump(x, jumpHeight);
	if (Input.GetKey(KeyCode.A)) { xMove(y, -moveSpeed, facingRight); } // Left
	if (Input.GetKey(KeyCode.D)) { xMove(y, moveSpeed, !facingRight); }	// Right

	// Velocity stopper
	if (!Input.GetKey(KeyCode.D) && !Input.GetKey(KeyCode.A) && GetComponent(Rigidbody2D).velocity.y == -0.1962) {
		GetComponent(Rigidbody2D).velocity.x = 0;
	}

}

function setUpMovements() {
	var x; var y;

	xJump(x, -jumpHeight);
	if (Input.GetKey(KeyCode.A)) { xMove(y, moveSpeed, facingRight);   } // Left
	if (Input.GetKey(KeyCode.D)) { xMove(y, -moveSpeed, !facingRight); } // Right

	if (!Input.GetKey(KeyCode.D) && !Input.GetKey(KeyCode.A) && GetComponent(Rigidbody2D).velocity.y == 0.1962) {
		GetComponent(Rigidbody2D).velocity.x = 0;
	}

}

function setLeftMovements() {
	var x; var y;

	yJump(y, jumpHeight);
	if (Input.GetKey(KeyCode.A)) { yMove(x, moveSpeed, facingRight);   } // Left
	if (Input.GetKey(KeyCode.D)) { yMove(x, -moveSpeed, !facingRight);   } // Right

	if (!Input.GetKey(KeyCode.D) && !Input.GetKey(KeyCode.A) && GetComponent(Rigidbody2D).velocity.x == -0.1962) {
		GetComponent(Rigidbody2D).velocity.y = 0;
	}

}

function setRightMovements() {
	var x; var y;

	yJump(y, -jumpHeight);
	if (Input.GetKey(KeyCode.A)) { yMove(x, -moveSpeed, facingRight);   } // Left
	if (Input.GetKey(KeyCode.D)) { yMove(x, moveSpeed, !facingRight);   } // Right

	if (!Input.GetKey(KeyCode.D) && !Input.GetKey(KeyCode.A) && GetComponent(Rigidbody2D).velocity.x == 0.1962) {
		GetComponent(Rigidbody2D).velocity.y = 0;
	}
}

function setNoMovements() {
	GetComponent(Rigidbody2D).velocity = new Vector2(0,0);
}



function xMove(y, moveSpeed, orientation) {
	y = GetComponent(Rigidbody2D).velocity.y;
	GetComponent(Rigidbody2D).velocity = new Vector2(moveSpeed, y);
	flipIf(orientation);
}

function yMove(x, moveSpeed, orientation) {
	x = GetComponent(Rigidbody2D).velocity.x;
	GetComponent(Rigidbody2D).velocity = new Vector2(x, moveSpeed);
	flipIf(orientation);
}

function yJump(y, jump) {
	if (Input.GetKeyDown(KeyCode.Space) && CanJump()) {
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2(jump, y);
		registerJump();
	}
}

function xJump(x, jump) {
	if (Input.GetKeyDown(KeyCode.Space) && CanJump()) {
		x = GetComponent(Rigidbody2D).velocity.x;
		GetComponent(Rigidbody2D).velocity = new Vector2(x, jump);
		registerJump();
	}
}

function registerJump() {
	numJumps++;
	playSound("JumpSound");
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

function CanJump() {
	return numJumps < maxJumps;
}






// Collision

function OnCollisionEnter2D (coll : Collision2D) {

	var tag = coll.gameObject.tag;

	//Jump
	if (ArrayUtility.Contains(["Ground", "NiceBox", "BlackHoleBox", "RotaterR", "RotaterL","ShifterL", "ShifterR", "ShifterD", "ShifterU"], tag)) { 
			numJumps = 0; 
	}


	//Death
	if (ArrayUtility.Contains(["Death", "DeathRock", "DeathBall"], tag)) { 
		Die(); 
	}

	if (coll.gameObject.CompareTag("VictoryPortal")) {
		removeLuna();
		Win();
	}

	if (tag == "RotaterR" && canRotateGravity()) {
		adjustGravityRight();

		Rotate(transform, Vector3.forward * 90, 1);
		adjustShifters(["ShifterD", "ShifterU"], Vector3.forward * 90);
		adjustShifters(["ShifterL", "ShifterR"], Vector3.forward * -90);


		GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).rotateRight(rotateRate);
		playSound("RotateGravitySound");
	}

	if (tag == "RotaterL" && canRotateGravity()) {
		adjustGravityLeft();

		Rotate(transform, Vector3.forward * -90, 1);
		adjustShifters(["ShifterD", "ShifterU"], Vector3.forward * -90);
		adjustShifters(["ShifterL", "ShifterR"], Vector3.forward * 90);


		GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CameraBehavior).rotateLeft(rotateRate);
		playSound("RotateGravitySound");
	}

	if (tag == "ShifterU") {
		gravitySettings = "reverse";
		setWorldGravityShift();
		playSound("ShiftSound");
	}

	if (tag == "ShifterD") {
		gravitySettings = "normal";
		setWorldGravityShift();
		playSound("ShiftSound");
	}

	if (tag == "ShifterL") {
		gravitySettings = "left shift";
		setWorldGravityShift();
		playSound("ShiftSound");
	}

	if (tag == "ShifterR") {
		gravitySettings = "right shift";
		setWorldGravityShift();
		playSound("ShiftSound");
	}
}








// EndGame & Meta

function Die() {
	if (hasWon == true) { return; } 

	isDead = true;
	removeLuna();
	playSound("DieSound");
	yield WaitForSeconds(3.0);
	Application.LoadLevel(Application.loadedLevel);
}

function removeLuna() {
	Destroy(GetComponent(SpriteRenderer));
	Destroy(GetComponent(PolygonCollider2D));
}

function Win() {
	hasWon = true;
	playSound("WinSound");
	yield WaitForSeconds(3.0);
}

function playSound(tag) {
	GameObject.FindGameObjectWithTag(tag).GetComponent(AudioSource).Play();
}

function Remove(tag) {
	Destroy(GameObject.FindGameObjectWithTag(tag).GetComponent(SpriteRenderer));
	Destroy(GameObject.FindGameObjectWithTag(tag).GetComponent(BoxCollider2D));
}