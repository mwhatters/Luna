#pragma strict

function Start () {
  var lushboyfade : Coroutine = null;
  var god = GameObject.Find("LushBoy").GetComponent(SpriteRenderer);
  var luna = GameObject.Find("Luna").GetComponent(MainGravity);

  var Text1 = GameObject.Find("Text1");
  var Text2 = GameObject.Find("Text2");
  var Text3 = GameObject.Find("Text3");
  var Text4 = GameObject.Find("Text4");
  var Text5 = GameObject.Find("Text5");

  yield WaitForSeconds(4.0);
  SceneHelper.use.ShowAndHideText(Text1, 2);

  yield WaitForSeconds(3.0);
  SceneHelper.use.ShowAndHideText(Text2, 1);

  lushboyfade = StartCoroutine(SceneHelper.use.FadeInImage("LushBoy", 0.003));


  yield WaitForSeconds(7.0);
  SceneHelper.use.ShowAndHideText(Text3, 1);

  yield WaitForSeconds(6.0);
  SceneHelper.use.ShowAndHideText(Text4, 1);

  yield WaitForSeconds(4.0);
  StopCoroutine(lushboyfade);
  SceneHelper.use.ShowAndHideText(Text5, 1);

  yield WaitForSeconds(2.0);
  StartCoroutine(SceneHelper.use.FadeOutImage("LushBoy"));
  var FadeImgs = GameObject.FindGameObjectsWithTag("Ground");
  for (var img in FadeImgs) {
    StartCoroutine(SceneHelper.use.FadeInImage(img.name, 0.004));
  }


  luna.canMove = true;
  luna.canRotate = true;
  GameObject.Find("PauseUI").GetComponent(Pause).canPause = true;
  yield WaitForSeconds(1.0);
  GameObject.Find("Lava").GetComponent(Lava).active = true;
  GameObject.Find("LushBoyWrapper").GetComponent(Lava).active = true;
}
