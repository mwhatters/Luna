#pragma strict

function OnCollisionEnter2D (coll : Collision2D) {
  if (coll.gameObject.CompareTag("TheGuy") && coll.gameObject.GetComponent(MainGravity).canRotateGravity()) {
    if (this.gameObject.layer == 16) { // if a phantom rotater
      ObjectFX.use.BlinkToColor(GetComponent(SpriteRenderer), Color.grey);
    } else {
      ObjectFX.use.BlinkToColor(GetComponent(SpriteRenderer), Color.black);
    }
  }
}
