#pragma strict

public static var SettingsInstance;
// These are settings that persist through all levels, all the time

function Start () {
  Cursor.visible = false;
}

function Awake() {
  if (SettingsInstance) {
    DestroyImmediate(gameObject);
  } else {
    DontDestroyOnLoad(this);
    SettingsInstance = this;
  }
}
