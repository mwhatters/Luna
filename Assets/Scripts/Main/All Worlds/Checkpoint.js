#pragma strict

function OnTriggerEnter2D(coll : Collider2D) {

	if (coll.name == "Luna") {
    GameObject.FindGameObjectWithTag("MainCamera").GetComponent(CheckpointTracker).checkPointPos = transform.position;
  }

}
