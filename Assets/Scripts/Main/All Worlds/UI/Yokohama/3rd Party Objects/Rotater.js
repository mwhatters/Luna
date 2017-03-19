#pragma strict

function Start() {

  yield WaitForSeconds(0.4);
  setRotaterRotationToLuna();
}

function OnCollisionEnter2D (coll : Collision2D) {
  if (coll.gameObject.CompareTag("TheGuy") && coll.gameObject.GetComponent(MainGravity).canRotateGravity() && coll.gameObject.GetComponent(PlayerGameStates).canUseRotater()) {
    if (this.gameObject.layer == 16) { // if a phantom rotater
      ObjectFX.use.BlinkToColor(GetComponent(SpriteRenderer), Color.grey);
    } else {
      ObjectFX.use.BlinkToColor(GetComponent(SpriteRenderer), Color.black);
    }

  }
}

function setRotaterRotationToLuna() {
  this.transform.eulerAngles.z = GameObject.Find("Luna").transform.eulerAngles.z;
}
