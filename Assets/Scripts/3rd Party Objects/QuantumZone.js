#pragma strict

function OnTriggerEnter2D(coll : Collider2D) {
	if (coll.name == "Luna") {
    // change layer to Quantum Luna
    coll.gameObject.layer = 17;
    changeColor(coll, Color.yellow);
  }
}

function OnTriggerExit2D(coll : Collider2D) {
	if (coll.name == "Luna") {
    // change back to regular Luna
    coll.gameObject.layer = 13;
    changeColor(coll, Color.white);
  }
}

function changeColor(collider : Collider2D, color) {
  var sprite = collider.gameObject.GetComponent(SpriteRenderer);
  var originalColor = sprite.color;
  sprite.color = Color.Lerp(originalColor, color, 1);
}
