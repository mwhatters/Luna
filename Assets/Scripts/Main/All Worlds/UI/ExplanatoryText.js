#pragma strict

public var displayText : String;
public var turnedOff : boolean = false;
private var stringLength : int;

function Start() {
  stringLength = displayText.Length;
}


function revealUIText() {
  for (var i : int = 0; i < stringLength; i++) {

    if (turnedOff) {
      this.GetComponent(Text).text = "";
      break;
    }

    this.GetComponent(Text).text += displayText[i];
    GameObject.FindGameObjectWithTag("TypeSound").GetComponent(AudioSource).Play();
    yield WaitForSeconds(0.1);
  }
}

function removeUIText() {
  this.GetComponent(Text).text = "";
}
