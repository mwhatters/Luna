#pragma strict
import System.Linq;

public var keysNeeded : GameObject[];
private var keysToBeDestroyed : GameObject[] = [];

function OnTriggerEnter2D(coll : Collider2D) {
    if (coll.gameObject.CompareTag("TheGuy")) {
        if (keysNeeded.Length == 0) {
            DestroyDoor();
            return true;
        }

        var keys = coll.gameObject.GetComponent(PlayerGameStates).keysFound;
        var keyCount = 0;

        for (var k in keys) {
            if (keysNeeded.Contains(k)) {
                keyCount += 1;
                if (!keysToBeDestroyed.Contains(k)) {
                    keysToBeDestroyed += [k];
                }
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

    for (var collider in GetComponents(BoxCollider2D)) {
        Destroy(collider);
    };
}

function DestroyRelevantKeysFound(keysToBeDestroyed) {
    for (var key in keysToBeDestroyed) {
        // Destroy keys needed to be destroyed, reset that variable to nothing
    }
}
