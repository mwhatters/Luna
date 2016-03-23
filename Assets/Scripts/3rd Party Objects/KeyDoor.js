#pragma strict

public var keyNeeded : String;

function OnCollisionEnter2D(coll : Collision2D) {
	if (coll.gameObject.tag == "TheGuy") {

		if (keyNeeded == "None") {
			DestroyDoor();
			return true;
		}

		for (var key in coll.gameObject.GetComponent(PlayerGameStates).keysFound) {
			if (key.name == keyNeeded) {
				DestroyDoor();
			}
		}
	}
}

function DestroyDoor() {
	GameObject.FindGameObjectWithTag("DoorOpenSound").GetComponent(AudioSource).Play();
	Destroy(this.gameObject);
}
