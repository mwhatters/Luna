#pragma strict
import System.Linq;

public var keysNeeded : GameObject[];

function OnCollisionEnter2D(coll : Collision2D) {
	if (coll.gameObject.tag == "TheGuy") {
		if (keysNeeded.Length == 0) {
			DestroyDoor();
			return true;
		}

		var keys = coll.gameObject.GetComponent(PlayerGameStates).keysFound;
		var keyCount = 0;
		var keysToBeDestroyed : GameObject[];

		for (var k in keys) {
			if (keysNeeded.Contains(k)) {
				keyCount += 1;
				keysToBeDestroyed += [k];
			}

			if (keyCount == keysNeeded.Length) {
				DestroyDoor();
				DestroyRelevantKeysFound(keysToBeDestroyed);
			}
		}
	}

	return true;
}

function DestroyDoor() {
	Sounds.use.PlaySoundByTag("DoorOpenSound");
	Destroy(GetComponent(SpriteRenderer));
	Destroy(GetComponent(BoxCollider2D));
}

function DestroyRelevantKeysFound(keysToBeDestroyed) {
	for (var key in keysToBeDestroyed) {
		Debug.Log(key);
	}
}
