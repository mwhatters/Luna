#pragma strict

public var explanatoryText : GameObject;

function Start () {
  Debug.Log('helllo!');
  yield WaitForSeconds(1.0);
  explanatoryText.GetComponent(ExplanatoryText).revealUIText();
  yield WaitForSeconds(3.0);
  explanatoryText.GetComponent(ExplanatoryText).slowlyRemoveUIText();
}
