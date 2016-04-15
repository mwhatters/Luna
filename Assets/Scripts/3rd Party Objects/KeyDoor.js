#pragma strict
import System.Linq;

public var keysNeeded : GameObject[];
private var noKeys : GameObject[];

function OnCollisionEnter2D(coll : Collision2D) {
	if (coll.gameObject.tag == "TheGuy") {
		if (keysNeeded.Length == 0) {
			DestroyDoor();
		}

		var keys = coll.gameObject.GetComponent(PlayerGameStates).keysFound;

		if (keys.Length == keysNeeded.Length) {
			DestroyDoor();
			coll.gameObject.GetComponent(PlayerGameStates).keysFound = noKeys;
		}
	}
}

function DestroyDoor() {
	Sounds.use.PlaySoundByTag("DoorOpenSound");
	Destroy(GetComponent(SpriteRenderer));
	Destroy(GetComponent(BoxCollider2D));
	return true;
}
