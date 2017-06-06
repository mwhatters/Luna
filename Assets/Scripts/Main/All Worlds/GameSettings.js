#pragma strict
import EventSystems;

public static var SettingsInstance;

function Start () {
  Cursor.visible = false;
}

function Awake() {
  // Application.targetFrameRate = 60;
  if (SettingsInstance) {
    DestroyImmediate(gameObject);
  } else {
    DontDestroyOnLoad(this);
    SettingsInstance = this;
  }
}
