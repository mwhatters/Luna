#pragma strict

public var displayText : String;
public var useSounds : boolean = true;
public var turnedOff : boolean = false;
private var stringLength : int;
public var timeToPrint : float = 0.07;


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

    if (useSounds) {
      GameObject.FindGameObjectWithTag("TypeSound").GetComponent(AudioSource).Play();
    }

    yield WaitForSeconds(timeToPrint);
  }
}

function removeUIText() {
  this.GetComponent(Text).text = "";
}


function slowlyRemoveUIText() {
  for (var i : int = 0; i < stringLength; i++) {
    // this.GetComponent(Text).text = this.GetComponent(Text).text.Remove(i, 1);
    // this.GetComponent(Text).text = this.GetComponent(Text).text.Insert(i, " ");

    this.GetComponent(Text).text = this.GetComponent(Text).text.Substring(0, stringLength - i - 1);

    yield WaitForSeconds(timeToPrint);
  }
}
