﻿#pragma strict

public var explanatoryText : GameObject;
public static var IntroTextInstance : boolean = false;

function Start () {
  if (!IntroTextInstance) {
    yield WaitForSeconds(1.0);

    yield explanatoryText.GetComponent(ExplanatoryText).revealUIText();
    yield WaitForSeconds(3.0);
    yield explanatoryText.GetComponent(ExplanatoryText).slowlyRemoveUIText();
    IntroTextInstance = true;
  }
}
