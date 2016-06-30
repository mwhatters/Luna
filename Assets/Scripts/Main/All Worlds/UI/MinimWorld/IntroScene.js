#pragma strict
//first scene of game


public static var IntroInstance;

function Awake() {
  if (IntroInstance) {
    var Blackness = GameObject.Find("Blackness");
    Destroy(Blackness);
		DestroyImmediate(gameObject);
	} else {
		DontDestroyOnLoad (transform.gameObject);
		IntroInstance = this;
	}
}

function Start () {

  var pauseMenu = GameObject.Find("PauseUI");
  var timer = GameObject.Find("User Interface").GetComponent(Timer);
  var luna = GameObject.Find("Luna");
  var cam = GameObject.Find("Camera");

  luna.GetComponent(SpriteRenderer).color.a = 0;
  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;

  var Text1 = GameObject.Find("IntroText1");
  var Text2 = GameObject.Find("IntroText2");
  var Text3 = GameObject.Find("IntroText3");
  var Text4 = GameObject.Find("IntroText4");
  var Text5 = GameObject.Find("IntroText5");
  var Text6 = GameObject.Find("IntroText6");
  var Text7 = GameObject.Find("IntroText7");
  var Text8 = GameObject.Find("IntroText8");

  luna.GetComponent(MainGravity).isFrozen = true;

  yield WaitForSeconds(1.5);
  FadeInLuna();
  yield WaitForSeconds(3.5);

  yield ShowAndHideText(Text1, 2.0);
  yield WaitForSeconds(0.5);
  yield ShowAndHideText(Text2, 2.0);
  yield WaitForSeconds(0.5);
  yield ShowText(Text3);
  yield WaitForSeconds(1);
  yield ShowText(Text4);
  yield WaitForSeconds(2);
  HideText(Text3);
  HideText(Text4);
  yield FadeImageToClear();

  yield ShowAndHideText(Text5, 1.0);

  luna.GetComponent(MainGravity).isFrozen = false;
  timer.startTimerFromZero();
  timer.running = true;
  pauseMenu.GetComponent(Pause).canPause = true;
}


function FadeImageToClear() {
  var FadeImg = GameObject.Find("Blackness").GetComponent(Image);
  while (FadeImg.color.a > 0.02) {
    FadeImg.color = Color.Lerp(FadeImg.color, Color.clear, 0.5 * 0.13);
    yield WaitForSeconds(0.1);
  }
  FadeImg.color.a = 0.0;
}

function FadeInLuna() {
  var FadeImg = GameObject.Find("Luna").GetComponent(SpriteRenderer);
  while (FadeImg.color.a < 240) {
    FadeImg.color.a += 0.01;
    yield;
  }
  FadeImg.color.a = 255;
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
