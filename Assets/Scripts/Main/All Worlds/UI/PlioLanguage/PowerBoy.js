#pragma strict

public static var IntroInstance;

function Awake() {
  if (IntroInstance) {
		DestroyImmediate(gameObject);
    var luna = GameObject.Find("Luna");
    luna.GetComponent(MainGravity).canMove = true;
	} else {
		DontDestroyOnLoad (transform.gameObject);
		IntroInstance = this;
	}
}

function Start () {
  var luna = GameObject.Find("Luna");
  var cam = GameObject.Find("Camera");
  var pauseMenu = GameObject.Find("PauseUI");
  var timer = GameObject.Find("User Interface").GetComponent(Timer);

  var Text1 = GameObject.Find("Text1");
  var Text2 = GameObject.Find("Text2");
  var Text3 = GameObject.Find("Text3");

  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;
  luna.GetComponent(MainGravity).canMove = false;
  luna.GetComponent(MainGravity).canRotate = false;


  yield WaitForSeconds(1);

  SceneHelper.use.ShowAndHideText(Text1, 2);
  yield WaitForSeconds(6);

  SceneHelper.use.PartiallyFadeInImage("Power Boy", 0.0008, 0.1);

  yield WaitForSeconds(5);
  SceneHelper.use.ShowAndHideText(Text2, 1.8);

  yield WaitForSeconds(7);
  Sounds.use.PlaySoundByName("LushFade");
  SceneHelper.use.FadeOutImageWithRate("Power Boy", 0.0002);
  SceneHelper.use.ShowAndHideText(Text3, 3);

  yield WaitForSeconds(9);



  // END SCENE START PLAY

  luna.GetComponent(MainGravity).canMove = true;
  luna.GetComponent(MainGravity).canRotate = true;
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeRotation;
  timer.startTimerFromZero();
  timer.running = true;
  pauseMenu.GetComponent(Pause).canPause = true;

}
