#pragma strict
import EventSystems;

public static var SettingsInstance;
// These are settings that persist through all levels, all the time

public static var AButton = "";
public static var MovementAxis = "";
public static var GravRotateRightButton = "";
public static var GravRotateLeftButton = "";

function Start () {
  Cursor.visible = false;

  if (Application.platform == RuntimePlatform.OSXEditor || Application.platform == RuntimePlatform.OSXPlayer) {
    AButton = "A Button Macintosh";
    MovementAxis = "Left Joystick Macintosh";
    GravRotateRightButton = "Right Trigger Macintosh";
    GravRotateLeftButton = "Left Trigger Macintosh";
    SetUIInputsFor("Macintosh");
  } else if (Application.platform == RuntimePlatform.WindowsPlayer || Application.platform == RuntimePlatform.WindowsEditor) {
    AButton = "A Button Windows";
    MovementAxis = "Left Joystick Windows";
    GravRotateRightButton = "Right Trigger Windows";
    GravRotateLeftButton = "Left Trigger Windows";
    SetUIInputsFor("Windows");
  }
}

function Awake() {
  if (SettingsInstance) {
    DestroyImmediate(gameObject);
  } else {
    DontDestroyOnLoad(this);
    SettingsInstance = this;
  }
}

function OnLevelWasLoaded () {

}


function SetUIInputsFor(os) {
  if (os == "Macintosh") {
    // EventSystems.StandaloneInputModule.cancelButton = "Cancel Macintosh";
    // EventSystems.StandaloneInputModule.submitButton = "Submit Macintosh";
    // EventSystems.StandaloneInputModule.horizontalAxis = "Horizontal Macintosh";
    // EventSystems.StandaloneInputModule.verticalAxis = "Vertical Macintosh";
  }

  if (os == "Windows") {
    // EventSystems.StandaloneInputModule.cancelButton = "Cancel Windows";
    // EventSystems.StandaloneInputModule.submitButton = "Submit Windows";
    // EventSystems.StandaloneInputModule.horizontalAxis = "Horizontal Windows";
    // EventSystems.StandaloneInputModule.verticalAxis = "Vertical Windows";
  }
}
