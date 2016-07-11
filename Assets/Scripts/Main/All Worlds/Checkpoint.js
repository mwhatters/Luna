#pragma strict

private var triggered : boolean = false;
public var invalidatedObjects : GameObject[];
public var gravityRespawnDirection : String = "Down";
public var cameraSize : int = 0;

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
    GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CheckpointTracker).gravityDirection = gravityRespawnDirection;
		if (cameraSize > 0) { GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CheckpointTracker).cameraSize = cameraSize; }
		triggered = true;
  }

	return true;
}

function DestroyInvalidatedObjects() {
	for (var object in invalidatedObjects) {
		Destroy(object);
	}
}
