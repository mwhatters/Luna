#pragma strict

private static var scenePlayed : boolean = false;
var lushboyfade : Coroutine = null;
var skipScene : boolean = false;
var Text1 : GameObject;
var Text2 : GameObject;
var Text3 : GameObject;
var Text4 : GameObject;
var Text5 : GameObject;

function Start () {
  var luna = GameObject.Find("Luna").GetComponent(MainGravity);
  Text1 = GameObject.Find("Text1");
  Text2 = GameObject.Find("Text2");
  Text3 = GameObject.Find("Text3");
  Text4 = GameObject.Find("Text4");
  Text5 = GameObject.Find("Text5");

  if (!scenePlayed && !skipScene) {
    scenePlayed = true;
    yield playLushBoyScene();
  } else {
    scenePlayed = true;
    startSceneFromPlay();
  }

  LunaController.use.Unfreeze();
  GameObject.Find("PauseUI").GetComponent(Pause).canPause = true;
  yield WaitForSeconds(1.0);
  GameObject.Find("Lava").GetComponent(Lava).active = true;
  GameObject.Find("LushBoyWrapper").GetComponent(Lava).active = true;
}

function playLushBoyScene() {
  yield WaitForSeconds(4.0);
  yield SceneHelper.use.ShowAndHideText(Text1, 2);

  SceneHelper.use.ShowAndHideText(Text2, 1);
  lushboyfade = StartCoroutine(SceneHelper.use.FadeInImage("LushBoy", 0.003));
  Sounds.use.PlaySoundByName("LushFade");

  yield WaitForSeconds(8.3);
  yield SceneHelper.use.ShowAndHideText(Text3, 1);
  SceneHelper.use.ShowAndHideText(Text4, 1);

  yield WaitForSeconds(4.0);
  StopCoroutine(lushboyfade);
  SceneHelper.use.ShowAndHideText(Text5, 1);

  yield WaitForSeconds(2.0);

  if (scenePlayed) {
    var FadeImgs = GameObject.FindGameObjectsWithTag("Ground");
    for (var img in FadeImgs) {
      if (img.name == "IntroMusic") { continue; }
      StartCoroutine(SceneHelper.use.FadeInImage(img.name, 0.004));
    }
  }
}

function startSceneFromPlay() {
  GameObject.Find("LushBoy").GetComponent(SpriteRenderer).color.a = 255;
  var FadeImgs = GameObject.FindGameObjectsWithTag("Ground");
  for (var img in FadeImgs) {
    StartCoroutine(SceneHelper.use.FadeInImage(img.name, 0.004));
  }
}
