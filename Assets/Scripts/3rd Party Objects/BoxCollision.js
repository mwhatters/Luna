#pragma strict

public var canTriggerSound : boolean = false;

function OnCollisionEnter2D (coll : Collision2D) {
  Debug.Log(coll.relativeVelocity.magnitude);
  if (coll.gameObject.CompareTag("Ground") && coll.relativeVelocity.magnitude > 5 && canTriggerSound) {
    Sounds.use.ConstructOneOffSound("BoxHit", this.transform.position);
  }
}
