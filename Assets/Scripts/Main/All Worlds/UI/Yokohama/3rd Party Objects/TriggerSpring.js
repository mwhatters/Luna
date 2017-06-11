#pragma strict

public var trigDoor : GameObject;
private var triggered : boolean = false;

public var triggerSound : String = "GrabKey";
public var stopAnimation : boolean = true;

function OnCollisionEnter2D(coll : Collision2D) {
  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    handleDoor();
  }
}

function OnTriggerEnter2D(coll : Collider2D) {
  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    handleDoor();
  }
}

function handleDoor() {
  Destroy(trigDoor);
  if (stopAnimation) { GetComponent(Animator).StopPlayback(); }
  Sounds.use.PlaySoundByName(triggerSound);
  triggered = true;
}
