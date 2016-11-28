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
  Text1 = GameObject.Find("Text1");
  Text2 = GameObject.Find("Text2");
  Text3 = GameObject.Find("Text3");
  Text4 = GameObject.Find("Text4");
  Text5 = GameObject.Find("Text5");
  Text6 = GameObject.Find("Text6");
  Text7 = GameObject.Find("Text7");
  Text8 = GameObject.Find("Text8");

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
    // yield WaitForSeconds(2);
    yield WaitForSeconds(2);
    SceneHelper.use.ShowAndHideText(Text3, 4);
    yield WaitForSeconds(3);
    SceneHelper.use.ShowAndHideText(Text4, 2);
    yield WaitForSeconds(4);
    SceneHelper.use.ShowAndHideText(Text5, 2);
    yield WaitForSeconds(4);
    SceneHelper.use.ShowAndHideText(Text6, 2);
    yield WaitForSeconds(4);
    // SceneHelper.use.FadeOutImageWithRate("Pure Boy", 0.04);
  }


function startBossBattle() {
  SceneHelper.use.FadeToRed("YokoBack", 0.05);
  yield StartRound1();
  yield StartRound2();

  if (!luna.GetComponent(PlayerGameStates).isDead) {
    // yield LunaGoesToSpaceScene();
  }
}

function StartRound1() {
  Instantiate(Round1, Vector3 (441.7, 733.2, 0.1), Quaternion.identity);
  yield WaitForSeconds(1);
  yield GameObject.Find("Round1(Clone)").GetComponent(YokoRound1).Begin();
}

function StartRound2() {
  Instantiate(Round1, Vector3 (441.7, 733.2, 0.1), Quaternion.identity);
  yield WaitForSeconds(1);
  yield GameObject.Find("Round1(Clone)").GetComponent(YokoRound1).Begin();
}
