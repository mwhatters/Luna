#pragma strict

static var use : SceneFX;

function Awake () {
	if (use) {
		// Debug.LogWarning("Only one instance of the Sound script in a scene is allowed");
		return;
	}
	use = this;
}


function FadeToClear(object, rate : float) {
  var FadeImg = GameObject.Find(object).GetComponent(Image);
  while (FadeImg.color.a > 0.02) {
    FadeImg.color = Color.Lerp(FadeImg.color, Color.clear, 1 * rate);
    yield WaitForSeconds(0.1);
  }
  FadeImg.color.a = 0.0;
}

function FadeToBlack(object, rate : float) {
  var FadeImg = GameObject.Find(object).GetComponent(Image);
  while (FadeImg.color.a < 255) {
    FadeImg.color = Color.Lerp(FadeImg.color, Color.black, 0.5 * rate);
    yield WaitForSeconds(0.1);
  }
  FadeImg.color.a = 255;
}
