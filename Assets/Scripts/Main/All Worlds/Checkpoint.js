#pragma strict

private var triggered : boolean = false;
public var invalidatedObjects : GameObject[];

function Start () {
	var camera = GameObject.FindGameObjectWithTag("MainCamera");

	if (camera.GetComponent(CheckpointTracker).checkPointPos == transform.position) {
		DestroyInvalidatedObjects();
	}

}

function OnTriggerEnter2D(coll : Collider2D) {

	if (triggered) { return false; }

	if (coll.name == "Luna") {
    GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CheckpointTracker).checkPointPos = transform.position;
		triggered = true;
  }
}

function DestroyInvalidatedObjects() {
	for (var object in invalidatedObjects) {
		Destroy(object);
	}
}
