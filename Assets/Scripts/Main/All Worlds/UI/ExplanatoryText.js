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
  var singleSoundDisable; //used to disable sound for pauses and line breaks
  var singleWaitDisable; //used to disable wait yield when needed

  for (var i : int = 0; i < stringLength; i++) {
    singleSoundDisable = false; //default these to false on each iteration
    singleWaitDisable = false;

    if (turnedOff) {
      this.GetComponent(Text).text = "";
      break;
    }

    //insert line break
    if (displayText[i] == ';') {
      this.GetComponent(Text).text += "\n";
      singleSoundDisable = true;
      singleWaitDisable = true;

    //insert pause before next letter (or, usually, before next line)
    } else if (displayText[i] == '%') {
      yield WaitForSeconds(1);
      singleSoundDisable = true;

    //display letter normally
    } else {
      this.GetComponent(Text).text += displayText[i];
    }

    if (useSounds && !singleSoundDisable) {
      cameraObjSounds.use.ConstructOneOffSound("Type", this.transform.position);
    }

    if (!singleWaitDisable) {
      yield WaitForSeconds(timeToPrint);
    }
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
