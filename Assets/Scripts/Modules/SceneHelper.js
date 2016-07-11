#pragma strict

static var use : SceneHelper;

function Awake () {
	if (use) {
		return;
	}
	use = this;
}

function FadeInImages(tag) {
  var FadeImgs = GameObject.FindGameObjectsWithTag(tag);
  for (var img in FadeImgs) {
    Debug.Log(img);
    var FadeImg = img.GetComponent(SpriteRenderer);
    while (FadeImg.color.a < 200) {
      FadeImg.color.a += 0.001;
      yield;
    }
    FadeImg.color.a = 200;
  }
}

function FadeInImage(name, rate : float) {
  var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
  while (FadeImg.color.a < 1) {
    FadeImg.color.a += rate;
    yield;
  }
  FadeImg.color.a = 255;
}

function FadeInGameObj(obj : GameObject, rate : float) {
  var FadeImg = obj.GetComponent(SpriteRenderer);
  while (FadeImg.color.a < 1) {
    FadeImg.color.a += rate;
    yield;
  }
  FadeImg.color.a = 255;
}

function FadeOutImage(name) {
  var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
  while (FadeImg.color.a > 0.1) {
    FadeImg.color.a -= 0.001;
    yield;
  }
}

function FadeOutImageWithRate(name : String, rate : float) {
  var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
  while (FadeImg.color.a > 0.001) {
    FadeImg.color.a -= rate;
    yield;
  }
	FadeImg.color.a = 0;
}

function FadeOutGameObj(obj : GameObject, rate : float) {
  var FadeImg = obj.GetComponent(SpriteRenderer);
  while (FadeImg.color.a >= 0) {
    FadeImg.color.a -= rate;
    yield;
  }
  FadeImg.color.a = 0;
}


function ShowAndHideText(text : GameObject, time) {
  text.GetComponent(ExplanatoryText).turnedOff = false;
  yield text.GetComponent(ExplanatoryText).revealUIText();

  yield WaitForSeconds(time);

  yield text.GetComponent(ExplanatoryText).slowlyRemoveUIText();
  text.GetComponent(ExplanatoryText).turnedOff = true;
}


function ShowText(text : GameObject) {
  text.GetComponent(ExplanatoryText).turnedOff = false;
  yield text.GetComponent(ExplanatoryText).revealUIText();
}


function HideText(text : GameObject) {
  yield text.GetComponent(ExplanatoryText).slowlyRemoveUIText();
  text.GetComponent(ExplanatoryText).turnedOff = true;
}
