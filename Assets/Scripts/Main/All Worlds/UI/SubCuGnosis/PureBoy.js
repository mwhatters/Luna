#pragma strict

private static var scenePlayed : boolean = false;
var skipScene : boolean = false;

static var currentRound = "1";

var luna : GameObject;
var Text1 : GameObject;
var Text2 : GameObject;
var Text3 : GameObject;
var Text4 : GameObject;
var Text5 : GameObject;
var Text6 : GameObject;
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
  Text1 = GameObject.Find("Text1");
  Text2 = GameObject.Find("Text2");
  Text3 = GameObject.Find("Text3");
  Text4 = GameObject.Find("Text4");
  Text5 = GameObject.Find("Text5");
  Text6 = GameObject.Find("Text6");

  if (!scenePlayed && !skipScene) {
    scenePlayed = true;
    yield PureBoyStartScene();
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

function PureBoyStartScene() {
  luna.GetComponent(MainGravity).Flip();
  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;
  luna.GetComponent(MainGravity).canMove = false;
  luna.GetComponent(MainGravity).canRotate = false;

  yield WaitForSeconds(1);
  SceneHelper.use.ShowAndHideText(Text1, 2);
  yield WaitForSeconds(3);
  Sounds.use.PlaySoundByName("LushFade");
  yield WaitForSeconds(2);
  SceneHelper.use.PartiallyFadeInImage("Pure Boy", 0.04, 0.9);
  yield WaitForSeconds(4);
  SceneHelper.use.ShowAndHideText(Text2, 1.8);
  yield WaitForSeconds(3.5);
  SceneHelper.use.ShowAndHideText(Text3, 2);
  yield WaitForSeconds(5);
  SceneHelper.use.ShowAndHideText(Text4, 2);
  yield WaitForSeconds(8.5);
  SceneHelper.use.ShowAndHideText(Text5, 2);
  yield WaitForSeconds(12);
  SceneHelper.use.ShowAndHideText(Text6, 2);
  yield WaitForSeconds(2);
  SceneHelper.use.FadeOutImageWithRate("Pure Boy", 0.04);
}

function startBossBattle() {
  GameObject.Find("PureBoyRoom").GetComponent(CamShifting).zoomCameraExit();

  if (currentRound == "1") {
    StartRound1();
  } else if (currentRound == "2") {
    StartRound2();
  } else if (currentRound == "3") {
    StartRound3();
  } else if (currentRound == "4") {
    StartRound4();
  }

  if (!luna.GetComponent(PlayerGameStates).isDead) {
    // yield LunaGoesToSpaceScene();
  }
}

function StartRound1() {
  Instantiate(Round1, Vector3 (-227.2719, 552.8459, 0), Quaternion.identity);
  fadeInRound("Round1(Clone)");
}

function StartRound2() {
  currentRound = "2";
  GameObject.Find("R2CP").GetComponent(Checkpoint).setupCheckPoint();
  Instantiate(Round2, Vector3 (-227.1312, 552.8459, 0), Quaternion.identity);
  fadeInRound("Round2(Clone)");
}

function StartRound3() {
  currentRound = "3";
  GameObject.Find("R3CP").GetComponent(Checkpoint).setupCheckPoint();
  Instantiate(Round3, Vector3 (-227.1312, 552.8459, 0), Quaternion.identity);
  fadeInRound("Round3(Clone)");
}

function StartRound4() {
  currentRound = "4";
  GameObject.Find("R4CP").GetComponent(Checkpoint).setupCheckPoint();
  Instantiate(Round4, Vector3 (-222.0897, 555.9163, 0), Quaternion.identity);
  fadeInRound("Round4(Clone)");
}

function EndBattle() {

}

function fadeInRound(round) {
  for (var child : Transform in GameObject.Find(round).transform) {
    SceneHelper.use.PartiallyFadeInObject(child.gameObject, 0.04, 1);
  }
}

function fadeOutRound(round) {
  for (var child : Transform in GameObject.Find(round).transform) {
    SceneHelper.use.FadeOutGameObj(child.gameObject, 0.04);
  }
  yield WaitForSeconds(1);
  Destroy(GameObject.Find(round));
}

// END OF BATTLE
function LunaGoesToSpaceScene() {
  GameObject.Find("Camera").GetComponent(CameraBehavior).shaking = false;

  Destroy(GameObject.Find("BackgroundMusic"));
  Destroy(GameObject.Find("IntroMusic"));
  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;
  luna.GetComponent(MainGravity).canMove = false;
  luna.GetComponent(MainGravity).canRotate = false;
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeAll;

  GameObject.Find("Portal").GetComponent(SceneLoader).beginSceneTransition();
}
