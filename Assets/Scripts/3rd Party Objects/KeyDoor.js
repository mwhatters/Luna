#pragma strict
import System.Linq;

public var keysNeeded : GameObject[];
private var noKeys : GameObject[];

function OnCollisionEnter2D(coll : Collision2D) {
	if (coll.gameObject.tag == "TheGuy") {
		if (keysNeeded.Length == 0) {
			DestroyDoor();
			return true;
		}


		var keys = coll.gameObject.GetComponent(PlayerGameStates).keysFound;
		var keyCount = 0;

		for (var k in keys) {
			if (keysNeeded.Contains(k)) {
				keyCount += 1;
			}

			if (keyCount == keysNeeded.Length) {
				DestroyDoor();
			}
		}
	}
}

function DestroyDoor() {
	Sounds.use.PlaySoundByTag("DoorOpenSound");
	Destroy(GetComponent(SpriteRenderer));
	Destroy(GetComponent(BoxCollider2D));
}
