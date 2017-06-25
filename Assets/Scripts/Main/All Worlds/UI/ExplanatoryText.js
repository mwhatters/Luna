#pragma strict

public var displayText : String;
public var useSounds : boolean = true;
public var turnedOff : boolean = false;
private var stringLength : int;
public var timeToPrint : float = 0.07;

public var shouldSpeedUpRemoveRext : boolean = true;

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

    if (displayText[i] == ';') {
      this.GetComponent(Text).text += "\n";
    } else {
      this.GetComponent(Text).text += displayText[i];
    }

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
  if (shouldSpeedUpRemoveRext && timeToPrint > 0.03) {
    timeToPrint = timeToPrint - 0.004;
  }

  for (var i : int = 0; i < stringLength; i++) {
    this.GetComponent(Text).text = this.GetComponent(Text).text.Substring(0, stringLength - 1 - i);

    yield WaitForSeconds(timeToPrint);
  }
}
