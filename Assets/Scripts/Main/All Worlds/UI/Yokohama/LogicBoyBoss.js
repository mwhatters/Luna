#pragma downcast
private static var scenePlayed : boolean = false;
private static var halfwayPointReached : boolean = false;
public var skipScene : boolean = false;

var luna : GameObject;
var lunaAlive : PlayerGameStates;

var Text1 : GameObject;
var Text2 : GameObject;
var Text3 : GameObject;
var Text4 : GameObject;
var Text5 : GameObject;
var Text6 : GameObject;
var Text7 : GameObject;
var Text8 : GameObject;
var Text9 : GameObject;
var Text10 : GameObject;
var Text11 : GameObject;
var Text12 : GameObject;
var Text122 : GameObject;
var Text13 : GameObject;
var pauseMenu : GameObject;
var timer : Timer;
var cam : GameObject;

var Round1 : Transform;
var Round2 : Transform;
var Round3 : Transform;
var Round4 : Transform;
var Round5 : Transform;
var Round6 : Transform;

function Start () {
  luna = GameObject.Find("Luna");
  lunaAlive = luna.GetComponent(PlayerGameStates);
  cam = GameObject.Find("Camera");
  pauseMenu = GameObject.Find("PauseUI");
  timer = GameObject.Find("User Interface").GetComponent(Timer);
  Text1 = GameObject.Find("Text1");
  Text2 = GameObject.Find("Text2");
  Text3 = GameObject.Find("Text3");
  Text4 = GameObject.Find("Text4");
  Text5 = GameObject.Find("Text5");
  Text6 = GameObject.Find("Text6");
  Text7 = GameObject.Find("Text7");
  Text8 = GameObject.Find("Text8");
  Text9 = GameObject.Find("Text9");
  Text10 = GameObject.Find("Text10");
  Text11 = GameObject.Find("Text11");
  Text12 = GameObject.Find("Text12");
  Text122 = GameObject.Find("Text12.5");
  Text13 = GameObject.Find("Text13");
  lunaState = luna.GetComponent(PlayerGameStates);

  if (!scenePlayed && !skipScene) {
    scenePlayed = true;
    yield LogicBoyStartScene();
  } else {
    scenePlayed = true;
    GameObject.Find("LogicBoy").GetComponent(SpriteRenderer).color.a = 255;
    yield WaitForSeconds(2);
  }

  // END SCENE START PLAY
  LunaController.use.Unfreeze();
  timer.startTimerFromZero();
  timer.running = true;
  pauseMenu.GetComponent(Pause).canPause = true;
  startBossBattle();
}



function LogicBoyStartScene() {
  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;
  LunaController.use.Freeze();

  yield WaitForSeconds(1);
  SceneHelper.use.ShowAndHideText(Text1, 3);
  yield WaitForSeconds(4);
  SceneHelper.use.ShowAndHideText(Text2, 3);
  yield WaitForSeconds(4);
  Sounds.use.PlaySoundByName("LushFade");
  SceneHelper.use.PartiallyFadeInImage("LogicBoy", 0.001, 1);
  yield WaitForSeconds(2);
  SceneHelper.use.ShowAndHideText(Text3, 4);
  yield WaitForSeconds(3);
  SceneHelper.use.ShowAndHideText(Text4, 2);
  yield WaitForSeconds(4);
  SceneHelper.use.ShowAndHideText(Text5, 2);
  yield WaitForSeconds(4);
  SceneHelper.use.ShowAndHideText(Text6, 2);
  yield WaitForSeconds(4);
}


function startBossBattle() {

  // if (!halfwayPointReached) {
  //   if (!luna.GetComponent(PlayerGameStates).isDead) {
  //     SceneHelper.use.FadeTo("YokoBack", 0.05, Color.magenta);
  //     yield StartRound1();
  //   }
  //
  //   if (!luna.GetComponent(PlayerGameStates).isDead) {
  //     yield StartRound2();
  //   }
  //
  //   if (!luna.GetComponent(PlayerGameStates).isDead) {
  //     SceneHelper.use.FadeTo("YokoBack", 0.05, Color.yellow);
  //     yield StartRound3();
  //   }
  // }

  // if (!luna.GetComponent(PlayerGameStates).isDead) {
  //   halfwayPointReached = true;
  //   yield StartRound4();
  // }

  if (!luna.GetComponent(PlayerGameStates).isDead) {
    SceneHelper.use.FadeTo("YokoBack", 0.05, Color.red);
    yield WaitForSeconds(2);
    yield StartRound5();
  }

  if (!luna.GetComponent(PlayerGameStates).isDead) {
    yield EndScene();
  }
}

function StartRound1() {
  Instantiate(Round1, Vector3(441.7, 733.2, 0.1), Quaternion.identity);
  var r1 = GameObject.Find("Round1(Clone)").GetComponent(YokoRound1);
  r1.Begin();
  yield WaitForSeconds(14);
}

function StartRound2() {
  Instantiate(Round2, Vector3(441.7, 733.2, 0.1), Quaternion.identity);
  var r2 = GameObject.Find("Round2(Clone)").GetComponent(YokoRound2);
  r2.Begin();
  yield WaitForSeconds(14);
}

function StartRound3() {
  Instantiate(Round3, Vector3(441.7, 733.2, 0.1), Quaternion.identity);
  var r3 = GameObject.Find("Round3(Clone)").GetComponent(YokoRound3);
  r3.Begin();
  yield WaitForSeconds(15);
}

function StartRound4() {
  Instantiate(Round4, Vector3(441.7, 733.2, 0.1), Quaternion.identity);
  var r4 = GameObject.Find("Round4(Clone)").GetComponent(YokoRound4);
  r4.Begin();
  yield WaitForSeconds(18);
}

function StartRound5() {
  Instantiate(Round5, Vector3(441.7, 733.2, 0.1), Quaternion.identity);
  var r5 = GameObject.Find("Round5(Clone)").GetComponent(YokoRound5);
  r5.Begin();
  yield WaitForSeconds(43);
}

function EndScene() {
  LunaController.use.Freeze();
  Sounds.use.Kill("BackgroundMusic");
  Sounds.use.Kill("IntroMusic");
  Sounds.use.PlaySoundByName("Refuge");
  yield WaitForSeconds(2);

  var badGround = GameObject.Find("BadGround");
  var bgChildren : Component[] = badGround.GetComponentsInChildren(Transform);
  for (var child : Transform in bgChildren) {
    if (child == badGround.transform) { continue; }
    child.gameObject.tag = "Ground";
    SceneHelper.use.FadeTo(child.name, 0.04, Color.green);
  }

  GameObject.Find("LogicBoy").transform.parent = null;
  GameObject.Find("cb1").transform.parent = null;
  GameObject.Find("cb2").transform.parent = null;

  SceneHelper.use.ShowAndHideText(Text7, 2);
  SceneHelper.use.FadeToRed("LogicBoy", 0.04);
  yield WaitForSeconds(4);
  SceneHelper.use.ShowAndHideText(Text8, 2);
  yield WaitForSeconds(6);
  SceneHelper.use.ShowAndHideText(Text9, 2);
  yield WaitForSeconds(4);
  SceneHelper.use.ShowAndHideText(Text10, 2);
  yield WaitForSeconds(2);

  SceneHelper.use.PartiallyFadeInImage("Portal", 0.001, 1);
  yield WaitForSeconds(2);
  GameObject.Find("Camera").GetComponent(CameraBehavior).shaking = true;
  Sounds.use.PlaySoundByName("rumble");

  yield WaitForSeconds(3);
  SceneHelper.use.ShowAndHideText(Text11, 4);
  yield WaitForSeconds(3);
  SceneHelper.use.ShowAndHideText(Text12, 4);
  yield WaitForSeconds(1.3);
  SceneHelper.use.ShowAndHideText(Text122, 4);
  yield WaitForSeconds(6);
  SceneHelper.use.ShowAndHideText(Text13, 5);


  yield WaitForSeconds(5);
  LunaController.use.Unfreeze();
  Destroy(GameObject.Find("SpecialBlock"));
}
