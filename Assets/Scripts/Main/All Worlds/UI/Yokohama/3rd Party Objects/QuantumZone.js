#pragma downcast

function OnTriggerEnter2D(coll : Collider2D) {
    if (coll.name == "Luna") {
    // change layer to Quantum Luna
    coll.gameObject.layer = 17;
    coll.gameObject.GetComponent(MainGravity).groundMask = ~(1 << 12) &  ~(1 << 2) & ~(1 << 22) & ~(1 << 17) & ~(1 << 9);
    changeColor(coll, Color.yellow);
  }
}

function OnTriggerExit2D(coll : Collider2D) {
    if (coll.name == "Luna") {
    // change back to regular Luna
    coll.gameObject.layer = 13;
    coll.gameObject.GetComponent(MainGravity).groundMask = ~(1 << 12) &  ~(1 << 2) & ~(1 << 22) & ~(1 << 17);
    changeColor(coll, Color.white);
  }
}

function changeColor(collider : Collider2D, color) {
  var sprite = collider.gameObject.GetComponent(SpriteRenderer);
  var originalColor = sprite.color;
  sprite.color = Color.Lerp(originalColor, color, 1);
}
