#pragma downcast

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

function PartiallyFadeInImage(name, rate : float, max : float) {
  var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
  while (FadeImg.color.a < max) {
    FadeImg.color.a += rate;
    yield;
  }
}

function PartiallyFadeInObject(fadeObj : GameObject, rate : float, max : float) {
	var FadeImg = fadeObj.GetComponent(SpriteRenderer);
  while (FadeImg.color.a < max) {
    FadeImg.color.a += rate;
    yield;
  }
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

function FadeInGameObj(obj : GameObject, rate : float) {
  var FadeImg = obj.GetComponent(SpriteRenderer);
  while (FadeImg.color.a < 1) {
    FadeImg.color.a += rate;
    yield;
  }
  FadeImg.color.a = 255;
}

function FadeOutGameObj(obj : GameObject, rate : float) {
  var FadeImg = obj.GetComponent(SpriteRenderer);
  while (FadeImg.color.a >= 0.001) {
    FadeImg.color.a -= rate;
    yield;
  }
  FadeImg.color.a = 0;
}

function FadeOutGameObjAndDestroy(obj : GameObject, rate : float) {
  var FadeImg = obj.GetComponent(SpriteRenderer);
  while (FadeImg.color.a >= 0.001) {
    FadeImg.color.a -= rate;
    yield;
  }
  Destroy(obj);
}

// SCENE FX

function FadeImageToClear(object : String, rate : float) {
	GeneralFadeOut(GameObject.Find(object), "Image", Color.clear, 1, rate);
}

function FadeImageToBlack(object : String, rate : float) {
	GeneralFadeIn(GameObject.Find(object), "Image", Color.black, 0.5, rate);
}

function FadeImageToWhite(object : String, rate : float) {
	GeneralFadeIn(GameObject.Find(object), "Image", Color.white, 0.5, rate);
}

function FadeTextToWhite(object : String, rate : float) {
	GeneralFadeIn(GameObject.Find(object), "Text", Color.white, 1, rate);
}

function FadeTextToClear(object : String, rate : float) {
	GeneralFadeOut(GameObject.Find(object), "Text", Color.clear, 1, rate);
}

function FadeTextToGrey(object, rate : float) {
	GeneralFadeIn(GameObject.Find(object), "Text", Color.grey, 1, rate);
}

// Abstractions

function GeneralFadeIn(object : GameObject, type : String, color : Color, multiplier : float, rate : float) {
	var image = grabComponentType(object, type);
	while (image.color.a < 255) {
    image.color = Color.Lerp(image.color, color, multiplier * rate);
    yield WaitForSeconds(0.1);
  }
	image.color.a = 255;
}

function GeneralFadeOut(object : GameObject, type : String, color : Color, multiplier : float, rate : float) {
	var image = grabComponentType(object, type);
	while (image.color.a > 0.02) {
		image.color = Color.Lerp(image.color, color, multiplier * rate);
    yield WaitForSeconds(0.1);
  }
  image.color.a = 0.0;
}

function grabComponentType(object : GameObject, type : String) {
	if (type == "Text") {
		return object.GetComponent(Text);
	}

	if (type == "Image") {
		return object.GetComponent(Image);
	}

	return true;
}

// Color Faders

function FadeTo(name, rate : float, colorFade : Color) {
	var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
	if (!FadeImg) { return; }
	var a = 0;
	while (a < 500) {
		FadeImg.color = Color.Lerp(FadeImg.color, colorFade, rate);
		a += 1;
		yield WaitForSeconds(0.06);
	}
}

function FadeObjTo(obj : GameObject, rate : float, colorFade : Color) {
	var FadeImg = obj.GetComponent(SpriteRenderer);
	if (!FadeImg) { return; }
	var a = 0;
	while (a < 500) {
		FadeImg.color = Color.Lerp(FadeImg.color, colorFade, rate);
		a += 1;
		yield WaitForSeconds(0.06);
	}
}

function FadeToRed(name, rate: float) {
	var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
	if (!FadeImg) { return; }
	var a = 0;
	while (a < 500) {
		FadeImg.color = Color.Lerp(FadeImg.color, Color.red, rate);
		a += 1;
		yield WaitForSeconds(0.06);
	}
}

// Camera

function ChangeCameraColor(camera : Camera, color : Color, rate : float) {
	var t : float = 0.4;
	var a = 0;
	while (a < 500) {
		camera.backgroundColor = Color.Lerp(camera.backgroundColor, color, rate);
		a += 1;
		yield WaitForSeconds(0.02);
	}
}

// TEXT DISPLAY

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
