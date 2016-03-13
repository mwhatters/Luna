#pragma strict

private var prevPos : Vector3;
private var degree = 0;

private var downView = false;
 
function Start () {
}

function Update() {
}

function rotateRight(rate) {
	if (staticCamera()) {
		MoveObject.use.Rotation(transform, Vector3.forward * 90, rate);
	}
}

function rotateLeft(rate) {
	if (staticCamera()) {
		MoveObject.use.Rotation(transform, Vector3.forward * -90, rate);
	}
}

function staticCamera() {
	if (transform.parent === null) { return true; } else { return false; }
}

function panCameraTo(point : Vector3, speed : float, size : float) {
	MoveObject.use.Translation(transform, transform.position, point, speed, MoveType.Time, size);
}

function reattachCamera() {
	
}