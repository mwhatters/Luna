#pragma strict

public var trigDoor : GameObject;
private var triggered : boolean = false;

function OnCollisionEnter2D(coll : Collision2D) {
  if (coll.gameObject.CompareTag("TheGuy") && !triggered) {
    Destroy(trigDoor);
    GetComponent(Animator).Stop();
    Sounds.use.PlaySoundByTag("GrabKeySound");
    triggered = true;
  }
}
