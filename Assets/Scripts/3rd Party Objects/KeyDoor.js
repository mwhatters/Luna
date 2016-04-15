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

		// we only care about the length of the gameobjects as there is no chance of the player getting two
		// of the same key. will it work for puzzles with multiple doors in non-linear spots tho? No. Must
		// consider this.
		var keys = coll.gameObject.GetComponent(PlayerGameStates).keysFound;
		if (keys.Length == keysNeeded.Length) {
			DestroyDoor();
			coll.gameObject.GetComponent(PlayerGameStates).keysFound = noKeys;
			return true;
		}
	}
}

function DestroyDoor() {
	Sounds.use.PlaySoundByTag("DoorOpenSound");
	Destroy(GetComponent(SpriteRenderer));
	Destroy(GetComponent(BoxCollider2D));
}
