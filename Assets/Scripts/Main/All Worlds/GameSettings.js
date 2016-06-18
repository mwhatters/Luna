#pragma strict

public static var SettingsInstance;
// These are settings that persist through all levels, all the time

function Start () {
  Cursor.visible = false;
}

function Update() {
  if (Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1) || Input.GetMouseButtonDown(2)) {
    Debug.Log('hello');
    return false;
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
