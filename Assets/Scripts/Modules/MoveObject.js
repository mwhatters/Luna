#pragma strict

enum MoveType {Time, Speed}
static var use : MoveObject;

function Awake () {
	if (use) {
		Debug.LogWarning("Only one instance of the MoveObject script in a scene is allowed");
		return;
	}
	use = this;
}

function Rotation (thisTransform : Transform, degrees : Vector3, time : float) {

	var startRotation = thisTransform.rotation;
	var endRotation = thisTransform.rotation * Quaternion.Euler(degrees);
	var rate = 1.0/time;
	var t = 0.0;
	while (t < 1.0) {
		t += Time.deltaTime * rate;
		thisTransform.rotation = Quaternion.Slerp(startRotation, endRotation, t);
		yield;
	}
}
