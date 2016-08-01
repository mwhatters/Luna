#pragma strict

function StartScene() {
  var god = GameObject.Find("God").GetComponent(SpriteRenderer);
  var luna = GameObject.Find("Luna").GetComponent(MainGravity);
  var Text1 = GameObject.Find("Text1");
  var Text2 = GameObject.Find("Text2");
  var Text3 = GameObject.Find("Text3");
  var Text4 = GameObject.Find("Text4");
  var Text5 = GameObject.Find("Text5");
  var Text6 = GameObject.Find("Text6");
  var Text7 = GameObject.Find("Text7");


  WaitForSeconds(2);
  SceneHelper.use.ShowAndHideText(Text1, 2);

  yield WaitForSeconds(6);
  StartCoroutine(SceneHelper.use.FadeInImage("God", 0.001));

  yield WaitForSeconds(1);
  yield SceneHelper.use.ShowAndHideText(Text2, 1);
  yield SceneHelper.use.ShowAndHideText(Text3, 0.8);
  yield SceneHelper.use.ShowAndHideText(Text4, 1);
  yield SceneHelper.use.ShowAndHideText(Text5, 1);
  yield SceneHelper.use.ShowAndHideText(Text6, 1);
  yield SceneHelper.use.ShowAndHideText(Text7, 1);

  luna.canMove = true;
  // GameObject.Find("PauseUI").GetComponent(Pause).canPause = true;
  GameObject.Find("GodsGround").GetComponent(BoxCollider2D).enabled = false;

  yield WaitForSeconds(20);
  SceneHelper.use.FadeTextToWhite("GameTitle", 0.003);
  yield WaitForSeconds(10);
  SceneHelper.use.FadeTextToWhite("ProducedBy", 0.003);
}
