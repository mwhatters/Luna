#pragma downcast

private static var scenePlayed : boolean = false;
public var skipScene : boolean = false;

static var currentRound = "1";

var luna : GameObject;
var Text1 : GameObject;
var Text2 : GameObject;
var Text3 : GameObject;
var Text4 : GameObject;
var Text45 : GameObject;
var Text5 : GameObject;
var Text55 : GameObject;
var Text6 : GameObject;
var Text7 : GameObject;
var Text10 : GameObject;
var TextYoko : GameObject;
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
  Text45 = GameObject.Find("Text4.5");
  Text5 = GameObject.Find("Text5");
  Text55 = GameObject.Find("Text5.5");
  Text6 = GameObject.Find("Text6");
  Text7 = GameObject.Find("Text7");
  Text10 = GameObject.Find("Text10");
  TextYoko = GameObject.Find("TextYoko");

  if (!scenePlayed && !skipScene) {
    scenePlayed = true;
    yield PureBoyStartScene();
  } else {
    scenePlayed = true;
    yield WaitForSeconds(2);
  }

  // END SCENE START PLAY
  LunaController.use.Unfreeze();
  timer.startTimerFromZero();
  timer.running = true;
  pauseMenu.GetComponent(Pause).canPause = true;
  startBossBattle();
}

function PureBoyStartScene() {
  luna.GetComponent(MainGravity).Flip();
  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;
  LunaController.use.Freeze();

  yield WaitForSeconds(1);
  SceneHelper.use.ShowAndHideText(Text1, 3);
  yield WaitForSeconds(4);
  Sounds.use.PlaySoundByName("LushFade");
  yield WaitForSeconds(2);
  SceneHelper.use.PartiallyFadeInImage("Pure Boy", 0.004, 0.9);
  yield WaitForSeconds(4);
  yield SceneHelper.use.ShowAndHideText(Text2, 2);
  yield SceneHelper.use.ShowAndHideText(Text3, 2);
  yield SceneHelper.use.ShowAndHideText(Text4, 2);
  yield SceneHelper.use.ShowAndHideText(Text45, 2);
  yield SceneHelper.use.ShowAndHideText(Text5, 2);
  yield SceneHelper.use.ShowAndHideText(Text55, 2);
  yield SceneHelper.use.ShowAndHideText(Text6, 2);
  SceneHelper.use.FadeOutImageWithRate("Pure Boy", 0.01);
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
    //yield LunaGoesToSpaceScene();
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
  GameObject.Find("SpecialRotater").GetComponent(Rotater).setRotaterRotationToLuna();
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
  GameObject.Find("SpecialRotater2").GetComponent(Rotater).setRotaterRotationToLuna();
  GameObject.Find("SpecialRotater3").GetComponent(Rotater).setRotaterRotationToLuna();
  fadeInRound("Round4(Clone)");
}

function EndBattle() {
  LunaGoesToSpaceScene();
}

function fadeInRound(round) {
  for (var child : Transform in GameObject.Find(round).transform) {
    SceneHelper.use.PartiallyFadeInObject(child.gameObject, 0.04, 1);
  }
}

function fadeOutRound(round) {
  for (var child : Transform in GameObject.Find(round).transform) {
    if (child.name == "Key") { continue; }
    SceneHelper.use.FadeOutGameObjAndDestroy(child.gameObject, 0.04);
  }
}

// END OF BATTLE
function LunaGoesToSpaceScene() {
  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;
  LunaController.use.Freeze();

  yield WaitForSeconds(4);
  yield SceneHelper.use.PartiallyFadeInImage("Pure Boy 2", 0.004, 0.4);
  yield SceneHelper.use.ShowAndHideText(Text7, 3);

  Sounds.use.PlaySoundByName("BirthMotherMonster");
  SceneHelper.use.ChangeCameraColor(cam.GetComponent(Camera), Color.black, 0.04);

  yield WaitForSeconds(1);
  SceneHelper.use.ShowAndHideText(Text10, 4);
  yield WaitForSeconds(4);

  var backgrounds = GameObject.FindGameObjectsWithTag("Background");
  for (var bg in backgrounds) {
    SceneHelper.use.FadeOutGameObj(bg.gameObject, 0.01);
  }

  // unfreeze gravity
  luna.GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.None;
  luna.GetComponent(MainGravity).lunaGravity = -9.81;
  cam.isStatic = false;
  var allGround = GameObject.FindGameObjectsWithTag("Ground");
  for (var ground in allGround) {
    Destroy(ground);
  }

  SceneHelper.use.FadeOutImageWithRate("Pure Boy 2", 0.001);
  // SceneHelper.use.AddCameraBloom();
  yield WaitForSeconds(16);

  var allSpace = GameObject.FindGameObjectsWithTag("Space");
  for (var space in allSpace) {
    space.GetComponent(SpriteRenderer).color = Color.white;
  }

  yield WaitForSeconds(11);
  SceneHelper.use.ShowAndHideText(TextYoko, 6);

  yield WaitForSeconds(10);

  var steam = GameObject.Find("SteamCustomizer");
  if (steam) {
    steam.SendMessage("UnlockAchive", "SUBCUTANEOUS_GNOSIS_COMPLETE");
  }
  
  yield WaitForSeconds(6);
  GameObject.Find("Portal").GetComponent(SceneLoader).beginSceneTransition();
}
