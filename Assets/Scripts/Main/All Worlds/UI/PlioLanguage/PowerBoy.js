#pragma strict

private static var powerScenePlayed : boolean = false;
var skipScene : boolean = false;

var luna : GameObject;
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
var pauseMenu : GameObject;
var timer : Timer;
var cam : GameObject;

public var answerBlockOne : GameObject;
public var answerBlockTwo : GameObject;
public var answerBlockThree : GameObject;

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
  Text9 = GameObject.Find("Text9");
  Text10 = GameObject.Find("Text10");

  if (!powerScenePlayed && !skipScene) {
    powerScenePlayed = true;
    yield PowerBoyStartScene();
  } else {
    powerScenePlayed = true;
  }

  // END SCENE START PLAY

  LunaController.use.Unfreeze();
  timer.startTimerFromZero();
  timer.running = true;
  pauseMenu.GetComponent(Pause).canPause = true;

  startBossBattle();
}

function PowerBoyStartScene() {

  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;
  LunaController.use.Freeze();

  yield WaitForSeconds(1);
  SceneHelper.use.ShowAndHideText(Text1, 2);
  yield WaitForSeconds(6);
  Sounds.use.PlaySoundByName("LushFade");
  SceneHelper.use.PartiallyFadeInImage("Power Boy", 0.0008, 0.1);
  yield WaitForSeconds(5);
  SceneHelper.use.ShowAndHideText(Text2, 1.8);
  yield WaitForSeconds(9);
  SceneHelper.use.ShowAndHideText(Text3, 3);
  yield WaitForSeconds(7);
}

function startBossBattle() {
  SceneHelper.use.PartiallyFadeInImage("Power Boy", 0.0008, 0.1);
  fadeBlocksToRed();
  yield WaitForSeconds(1);
  yield Round1();
  yield WaitForSeconds(20);
  yield Round2();
  yield WaitForSeconds(20);
  yield Round3();
  yield WaitForSeconds(23);

  StartCoroutine(SceneHelper.use.FadeToRed("Power Boy", 0.008));
  Sounds.use.PlaySoundByName("LushFade");

  yield Round4();
  yield WaitForSeconds(17);
  yield Round5();
  yield WaitForSeconds(13);
  SceneHelper.use.ShowAndHideText(Text4, 2);
  GameObject.Find("Camera").GetComponent(CameraBehavior).shaking = true;
  yield Round6();
  yield WaitForSeconds(22);
  if (!luna.GetComponent(PlayerGameStates).isDead) {
    yield GodFreezesEverythingScene();
  }
}


function Round1() {
  var round = GameObject.Find("Round1");
  round.GetComponent(roundScript).down = true;
  return true;
}

function Round2() {
  var round2a = GameObject.Find("Round2");
  var round2b = GameObject.Find("Round2.5");
  round2a.GetComponent(roundScript).right = true;
  round2b.GetComponent(roundScript).left = true;
  return true;
}

function Round3() {
  var round3a = GameObject.Find("Round3");
  var round3b = GameObject.Find("Round3.5");
  round3a.GetComponent(roundScript).up = true;
  round3b.GetComponent(roundScript).left = true;
  return true;
}

function Round4() {
  var round4a = GameObject.Find("Round4");
  var round4b = GameObject.Find("Round4.5");
  round4a.GetComponent(roundScript).down = true;
  round4a.GetComponent(roundScript).left = true;
  round4b.GetComponent(roundScript).down = true;
  round4b.GetComponent(roundScript).right = true;
  StartCoroutine(BlinkAnswerBlock(answerBlockOne));
  return true;
}

function Round5() {
  var round5a = GameObject.Find("Round5");
  var round5b = GameObject.Find("Round5.5");
  round5a.GetComponent(roundScript).up = true;
  round5a.GetComponent(roundScript).right = true;
  round5b.GetComponent(roundScript).up = true;
  round5b.GetComponent(roundScript).left = true;
  StartCoroutine(BlinkAnswerBlock(answerBlockTwo));
  return true;
}

function Round6() {
  var round6a = GameObject.Find("Round6");
  round6a.GetComponent(roundScript).down = true;
  StartCoroutine(BlinkAnswerBlock(answerBlockThree));
  return true;
}


function fadeBlocksToRed() {
  var FadeImgs = GameObject.FindGameObjectsWithTag("Ground");
  for (var img in FadeImgs) {
    if (img.name == "IntroMusic") { continue; }
    StartCoroutine(SceneHelper.use.FadeToRed(img.name, 0.004));
  }
}

function BlinkAnswerBlock(answerBlock : GameObject) {
  Sounds.use.ConstructOneOffSound("Blip", this.transform.position);
  yield ObjectFX.use.BlinkToColor(answerBlock.GetComponent(SpriteRenderer), Color.yellow);
  Sounds.use.ConstructOneOffSound("Blip", this.transform.position);
  yield ObjectFX.use.BlinkToColor(answerBlock.GetComponent(SpriteRenderer), Color.yellow);
  Sounds.use.ConstructOneOffSound("Blip", this.transform.position);
  yield ObjectFX.use.BlinkToColor(answerBlock.GetComponent(SpriteRenderer), Color.yellow);
  yield;
}


// END OF BATTLE

function GodFreezesEverythingScene() {
  Sounds.use.PlaySoundByName("Refuge");
  SceneHelper.use.FadeInImage("black", 0.008);
  GameObject.Find("Camera").GetComponent(CameraBehavior).shaking = false;

  Destroy(GameObject.Find("BackgroundMusic"));
  Destroy(GameObject.Find("IntroMusic"));
  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;
  LunaController.use.Freeze();
  GameObject.Find("Thorium Core").GetComponent(Rigidbody2D).constraints = RigidbodyConstraints2D.FreezeAll;

  yield WaitForSeconds(4);
  SceneHelper.use.ShowAndHideText(Text5, 5);
  yield WaitForSeconds(6);
  SceneHelper.use.FadeImageToWhite("God", 0.04);
  yield WaitForSeconds(2);
  yield SceneHelper.use.ShowAndHideText(Text6, 3);
  yield SceneHelper.use.ShowAndHideText(Text7, 3);
  //yield SceneHelper.use.ShowAndHideText(Text8, 3);
  yield SceneHelper.use.ShowAndHideText(Text9, 3);
  yield SceneHelper.use.ShowText(Text10);
  yield WaitForSeconds(4.5);
  if (luna.GetComponent(MainGravity).facingRight == false) { luna.GetComponent(MainGravity).Flip(); }
  GameObject.Find("Portal").GetComponent(SceneLoader).beginSceneTransition();
}
