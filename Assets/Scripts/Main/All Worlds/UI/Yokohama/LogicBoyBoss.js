#pragma downcast

private static var scenePlayed : boolean = false;
public var skipScene : boolean = false;

static var currentRound = "1";

var luna : GameObject;
var Text1 : GameObject;
var Text2 : GameObject;
var Text3 : GameObject;
var Text4 : GameObject;
var Text5 : GameObject;
var Text6 : GameObject;
var Text7 : GameObject;
var Text8 : GameObject;
var pauseMenu : GameObject;
var timer : Timer;
var cam : GameObject;

var Round1 : Transform;
var Round2 : Transform;
var Round3 : Transform;
var Round4 : Transform;

function Start () {
  luna = GameObject.Find("Luna");
  cam = GameObject.Find("Camera");
  pauseMenu = GameObject.Find("PauseUI");
  timer = GameObject.Find("User Interface").GetComponent(Timer);
  // Text1 = GameObject.Find("Text1");
  // Text2 = GameObject.Find("Text2");
  // Text3 = GameObject.Find("Text3");
  // Text4 = GameObject.Find("Text4");
  // Text5 = GameObject.Find("Text5");
  // Text6 = GameObject.Find("Text6");
  // Text7 = GameObject.Find("Text7");
  // Text8 = GameObject.Find("Text8");

  if (!scenePlayed && !skipScene) {
    scenePlayed = true;
    yield LogicBoyStartScene();
  } else {
    scenePlayed = true;
    yield WaitForSeconds(2);
  }

  // END SCENE START PLAY
  luna.GetComponent(MainGravity).canMove = true;
  luna.GetComponent(MainGravity).canRotate = true;
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeRotation;
  timer.startTimerFromZero();
  timer.running = true;
  pauseMenu.GetComponent(Pause).canPause = true;
  startBossBattle();
}

  function LogicBoyStartScene() {
    luna.GetComponent(MainGravity).Flip();
    timer.running = false;
    pauseMenu.GetComponent(Pause).canPause = false;
    luna.GetComponent(MainGravity).canMove = false;
    luna.GetComponent(MainGravity).canRotate = false;

    // yield WaitForSeconds(1);
    // SceneHelper.use.ShowAndHideText(Text1, 2);
    yield WaitForSeconds(0);
    // Sounds.use.PlaySoundByName("LushFade");
    // yield WaitForSeconds(2);
    // SceneHelper.use.PartiallyFadeInImage("Pure Boy", 0.04, 0.9);
    // yield WaitForSeconds(4);
    // SceneHelper.use.ShowAndHideText(Text2, 1.8);
    // yield WaitForSeconds(3.5);
    // SceneHelper.use.ShowAndHideText(Text3, 2);
    // yield WaitForSeconds(5);
    // SceneHelper.use.ShowAndHideText(Text4, 2);
    // yield WaitForSeconds(8.5);
    // SceneHelper.use.ShowAndHideText(Text5, 2);
    // yield WaitForSeconds(12);
    // SceneHelper.use.ShowAndHideText(Text6, 2);
    // yield WaitForSeconds(2);
    // SceneHelper.use.FadeOutImageWithRate("Pure Boy", 0.04);
  }


function startBossBattle() {
  // GameObject.Find("PureBoyRoom").GetComponent(CamShifting).zoomCameraExit();

  if (currentRound == "1") {
    // StartRound1();
  } else if (currentRound == "2") {
    // StartRound2();
  } else if (currentRound == "3") {
    // StartRound3();
  } else if (currentRound == "4") {
    // StartRound4();
  }

  if (!luna.GetComponent(PlayerGameStates).isDead) {
    // yield LunaGoesToSpaceScene();
  }
}
