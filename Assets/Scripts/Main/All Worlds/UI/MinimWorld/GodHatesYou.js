﻿#pragma strict

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
  yield SceneHelper.use.ShowAndHideText(Text2, 2);
  yield SceneHelper.use.ShowAndHideText(Text3, 2);
  yield SceneHelper.use.ShowAndHideText(Text4, 2);
  yield SceneHelper.use.ShowAndHideText(Text6, 2);
  yield SceneHelper.use.ShowAndHideText(Text7, 2);

  luna.canMove = true;
  luna.maxJumps = 0;
  GameObject.Find("GodsGround").GetComponent(BoxCollider2D).enabled = false;

  var steam = GameObject.Find("SteamCustomizer");
  if (steam) {
    steam.SendMessage("UnlockAchive", "MINIM_WORLD_COMPLETE");
  }

  yield WaitForSeconds(20);
  SceneHelper.use.FadeTextToWhite("GameTitle", 0.003);
  yield WaitForSeconds(10);
  SceneHelper.use.FadeTextToWhite("ProducedBy", 0.003);
}
