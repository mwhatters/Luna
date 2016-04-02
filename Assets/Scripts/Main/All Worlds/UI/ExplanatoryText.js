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
    yield WaitForSeconds(0.07);
  }
}

function removeUIText() {
  this.GetComponent(Text).text = "";
}


function slowlyRemoveUIText() {
  for (var i : int = 0; i < stringLength; i++) {
    this.GetComponent(Text).text = this.GetComponent(Text).text.Substring(0, stringLength - i - 1);
    GameObject.FindGameObjectWithTag("TypeSound").GetComponent(AudioSource).Play();
    yield WaitForSeconds(0.07);
  }
}
