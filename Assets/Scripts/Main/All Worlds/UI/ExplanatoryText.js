#pragma strict

public var displayText : String;
public var useSounds : boolean = true;
public var turnedOff : boolean = false;
private var stringLength : int;
public var timeToPrint : float = 0.07;

var cameraObjSounds : Sounds;


function Start() {
  stringLength = displayText.Length;
  cameraObjSounds = GameObject.Find("Camera").GetComponent(Sounds);
}


function revealUIText() {
  stringLength = displayText.Length;
  for (var i : int = 0; i < stringLength; i++) {

    if (turnedOff) {
      this.GetComponent(Text).text = "";
      break;
    }

    this.GetComponent(Text).text += displayText[i];

    if (useSounds) {
      cameraObjSounds.use.ConstructOneOffSound("Type", this.transform.position);
    }

    yield WaitForSeconds(timeToPrint);
  }
}

function removeUIText() {
  this.GetComponent(Text).text = "";
}


function slowlyRemoveUIText() {
  for (var i : int = 0; i < stringLength; i++) {
    this.GetComponent(Text).text = this.GetComponent(Text).text.Substring(1, (stringLength - 1) - i);

    yield WaitForSeconds(timeToPrint);
  }
}
