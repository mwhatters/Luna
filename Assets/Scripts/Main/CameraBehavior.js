#pragma strict

public var camScope = 16;
public var staticPoint : Vector3;

//private var followingLuna = true;

public var isStatic : boolean;
private var lunaObj : GameObject;

function Start () {
	lunaObj = GameObject.Find("Luna");
}

function Update() {

	if (!staticCamera()) {
		transform.position.x = lunaObj.transform.position.x;
		transform.position.y = lunaObj.transform.position.y;
	} 
}

function rotateRight(rate) {
		MoveObject.use.Rotation(transform, Vector3.forward * 90.0, rate);
}

function rotateLeft(rate) {
		MoveObject.use.Rotation(transform, Vector3.forward * -90.0, rate);
}

function staticCamera() {
	return isStatic == true;
}

function panCameraTo(point : Vector3, speed : float, size : float) {
	MoveObject.use.Translation(transform, transform.position, point, speed, MoveType.Time, size);
}


function zoomCamera(speed : float, scope : float) {
	MoveObject.use.Zoom(transform, speed, scope);
}
