#pragma strict

public static var IntroInstance;

function Awake() {
  if (IntroInstance) {
    var White = GameObject.Find("white");
    Destroy(White);
		DestroyImmediate(gameObject);
    var luna = GameObject.Find("Luna");
    luna.GetComponent(MainGravity).isFrozen = false;
    luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
    luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeRotation;
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

  var Text1 = GameObject.Find("Text1");
  var Text2 = GameObject.Find("Text2");
  var Title = GameObject.Find("Title");

  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;

  yield WaitForSeconds(2);

  SceneHelper.use.ShowAndHideText(Title, 7);

  yield WaitForSeconds(3);
  yield SceneHelper.use.FadeOutImageWithRate("white", 0.008);
  yield WaitForSeconds(3);

  luna.GetComponent(MainGravity).isFrozen = false;
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeRotation;
  timer.startTimerFromZero();
  timer.running = true;
  pauseMenu.GetComponent(Pause).canPause = true;

}
