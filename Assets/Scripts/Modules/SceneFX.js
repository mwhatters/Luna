#pragma strict

static var use : SceneFX;

function Awake () {
	if (use) {
		return;
	}
	use = this;
}


function FadeImageToClear(object, rate : float) {
  var FadeImg = GameObject.Find(object).GetComponent(Image);
  while (FadeImg.color.a > 0.02) {
    FadeImg.color = Color.Lerp(FadeImg.color, Color.clear, 1 * rate);
    yield WaitForSeconds(0.1);
  }
  FadeImg.color.a = 0.0;
}

function FadeImageToBlack(object, rate : float) {
  var FadeImg = GameObject.Find(object).GetComponent(Image);
  while (FadeImg.color.a < 255) {
    FadeImg.color = Color.Lerp(FadeImg.color, Color.black, 0.5 * rate);
    yield WaitForSeconds(0.1);
  }
  FadeImg.color.a = 255;
}

function FadeTextToWhite(object, rate : float) {
  var FadeImg = GameObject.Find(object).GetComponent(Text);
  while (FadeImg.color.a < 255) {
    FadeImg.color = Color.Lerp(FadeImg.color, Color.white, 1 * rate);
    yield WaitForSeconds(0.1);
  }
  FadeImg.color.a = 255;
}

function FadeTextToGrey(object, rate : float) {
  var FadeImg = GameObject.Find(object).GetComponent(Text);
  while (FadeImg.color.a < 255) {
    FadeImg.color = Color.Lerp(FadeImg.color, Color.grey, 1 * rate);
    yield WaitForSeconds(0.1);
  }
  FadeImg.color.a = 255;
}
