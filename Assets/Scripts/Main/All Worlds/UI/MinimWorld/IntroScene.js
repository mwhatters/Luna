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
  SceneHelper.use.FadeInImage("Luna", 0.01);
  yield WaitForSeconds(3.5);

  yield SceneHelper.use.ShowAndHideText(Text1, 2.0);
  yield WaitForSeconds(0.5);
  yield SceneHelper.use.ShowAndHideText(Text2, 2.0);
  yield WaitForSeconds(0.5);
  yield SceneHelper.use.ShowText(Text3);
  yield WaitForSeconds(1);
  yield SceneHelper.use.ShowText(Text4);
  yield WaitForSeconds(2);
  SceneHelper.use.HideText(Text3);
  SceneHelper.use.HideText(Text4);
  yield SceneHelper.use.GeneralFadeOut(GameObject.Find("Blackness"), "Image", Color.clear, 0.5, 0.2);

  yield SceneHelper.use.ShowAndHideText(Text5, 1.0);

  luna.GetComponent(MainGravity).isFrozen = false;
  timer.startTimerFromZero();
  timer.running = true;
  pauseMenu.GetComponent(Pause).canPause = true;
}
