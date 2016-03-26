#pragma strict

public var camScope = 16;
public var staticPoint : Vector3;

//private var followingLuna = true;

public var isStatic : boolean;
private var lunaObj : GameObject;

function Start () {
	lunaObj = GameObject.Find("Luna");
}

function FixedUpdate() {

	if (!staticCamera()) {
		transform.position.x = lunaObj.transform.position.x;
		transform.position.y = lunaObj.transform.position.y;
	}
}

function rotate(degrees : float, rate : float) {
	MoveObject.use.Rotation(transform, Vector3.forward * degrees, rate);
}

function staticCamera() {
	return isStatic == true;
}
