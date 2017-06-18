#pragma strict

static var use : ObjectFX;

function Awake () {
    if (use) {
        return;
    }
    use = this;
}

function BlinkToColor(sprite : SpriteRenderer, color : Color) {
  sprite.color = Color.white;
  var a = 0;
  while (a < 100) {
    sprite.color = Color.Lerp(sprite.color, color, 0.04);
    a += 1;
    yield WaitForSeconds(0.001);
  }
}
