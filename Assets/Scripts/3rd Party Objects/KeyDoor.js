#pragma strict

public var keyNeeded : String;

function OnCollisionEnter2D(coll : Collision2D) {
	if (coll.gameObject.tag == "TheGuy") {

		if (keyNeeded == "None") {
			DestroyDoor();
			return true;
		}

		// todo : make work for multiple keys

		for (var key in coll.gameObject.GetComponent(PlayerGameStates).keysFound) {
			if (key.name == keyNeeded) {
				DestroyDoor();
			}
		}
	}
	return true;
}

function DestroyDoor() {
	Sounds.use.PlaySoundByTag("DoorOpenSound");
	Destroy(this);
}
