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
  ShowAndHideText(Text1, 2);

  yield WaitForSeconds(6);
  StartCoroutine(FadeInImage("God", 0.1));

  yield WaitForSeconds(1);
  yield ShowAndHideText(Text2, 1);
  yield ShowAndHideText(Text3, 0.8);
  yield ShowAndHideText(Text4, 1);
  yield ShowAndHideText(Text5, 1);
  yield ShowAndHideText(Text6, 1);
  yield ShowAndHideText(Text7, 1);

  luna.canMove = true;
  // StartCoroutine(FadeOutImage("God"));
}

function FadeInImages(tag) {
  var FadeImgs = GameObject.FindGameObjectsWithTag(tag);
  for (var img in FadeImgs) {
    var FadeImg = img.GetComponent(SpriteRenderer);
    while (FadeImg.color.a < 200) {
      FadeImg.color.a += 0.001;
      yield;
    }
    FadeImg.color.a = 200;
  }
}


function FadeInImage(name, rate) {
  var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
  while (FadeImg.color.a < 200) {
    FadeImg.color.a += 0.001;
    yield;
  }
  FadeImg.color.a = 255;
}

function FadeOutImage(name) {
  var FadeImg = GameObject.Find(name).GetComponent(SpriteRenderer);
  while (FadeImg.color.a > 20) {
    FadeImg.color.a -= 0.001;
    yield;
  }
  FadeImg.color.a = 0;
}


function ShowAndHideText(text : GameObject, time) {
  text.GetComponent(ExplanatoryText).turnedOff = false;
  yield text.GetComponent(ExplanatoryText).revealUIText();

  yield WaitForSeconds(time);

  yield text.GetComponent(ExplanatoryText).slowlyRemoveUIText();
  text.GetComponent(ExplanatoryText).turnedOff = true;

}


function ShowText(text : GameObject) {
  text.GetComponent(ExplanatoryText).turnedOff = false;
  yield text.GetComponent(ExplanatoryText).revealUIText();
}


function HideText(text : GameObject) {
  yield text.GetComponent(ExplanatoryText).slowlyRemoveUIText();
  text.GetComponent(ExplanatoryText).turnedOff = true;
}
