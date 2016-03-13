#pragma strict

public var camScope = 16;
public var staticPoint : Vector3;
 
function Start () {
}

function Update() {
}

function rotateRight(rate) {
	if (staticCamera()) {
		MoveObject.use.Rotation(transform, Vector3.forward * 90.0, rate);
	}
}

function rotateLeft(rate) {
	if (staticCamera()) {
		MoveObject.use.Rotation(transform, Vector3.forward * -90.0, rate);
	}
}

function staticCamera() {
	if (transform.parent === null) { return true; } else { return false; }
}

function panCameraTo(point : Vector3, speed : float, size : float) {
	MoveObject.use.Translation(transform, transform.position, point, speed, MoveType.Time, size);
	camScope = size;
	staticPoint = point;
}


function reorient(lunaPoint : Vector3, camScope, lunaRotation) {
	if (!staticCamera()) {
		panCameraTo(lunaPoint, 0, camScope);
		transform.eulerAngles.z = lunaRotation;
	} else {
		panCameraTo(staticPoint, 0, camScope);
		transform.eulerAngles.z = lunaRotation;
	}
}


