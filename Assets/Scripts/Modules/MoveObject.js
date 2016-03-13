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
 
function Translation (thisTransform : Transform, endPos : Vector3, value : float, moveType : MoveType, size : float) {
	yield Translation (thisTransform, thisTransform.position, thisTransform.position + endPos, value, moveType, size);
}
 
function Translation (thisTransform : Transform, startPos : Vector3, endPos : Vector3, value : float, moveType : MoveType, size : float) {
	var camera = thisTransform.GetComponent(Camera);
	var rate = (moveType == MoveType.Time)? 1.0/value : 1.0/Vector3.Distance(startPos, endPos) * value;
	var t = 0.0;
	while (t < 1.0) {
		t += Time.deltaTime * rate;
		thisTransform.position = Vector3.Lerp(startPos, endPos, t);
		camera.orthographicSize = Mathf.Lerp(camera.orthographicSize, size, t);
		yield; 
	}
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