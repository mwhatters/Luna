#pragma strict

public var canPause : boolean = true;
public var isPaused : boolean = false;
private var pausePanel : GameObject;
private var pausedText : GameObject;
private var escapeText : GameObject;
private var SaveButton : GameObject;
private var QuitButton : GameObject;
private var MenuButton : GameObject;
private var IRButton : GameObject;
private var successText : GameObject;
private var luna : GameObject;

private var Bmusic : AudioSource;
private var Imusic : AudioSource;

private var windVolume : float;
private var Lwind : AudioSource;

function Start () {
  pausePanel = GameObject.Find("PauseUI");
  pausedText = GameObject.Find("PauseText");
  escapeText = GameObject.Find("Escape");
  successText = GameObject.Find("SuccessText");
  SaveButton = GameObject.Find("Save Game");
  QuitButton = GameObject.Find("Quit Game");
  IRButton = GameObject.Find("Inverse Rotation");
  MenuButton = GameObject.Find("Return To Menu");
  luna = GameObject.Find("Luna");
  Lwind = GameObject.Find("Wind").GetComponent(AudioSource);

  Bmusic = GameObject.Find("BackgroundMusic").GetComponent(AudioSource);
  Imusic = GameObject.Find("IntroMusic").GetComponent(AudioSource);

}

function Update () {

  if (!canPause) { return false; }

  if (Input.GetButtonDown("Cancel") && !isPaused) {
    setPaused();
    isPaused = true;
    return isPaused;
  }

  if (Input.GetButtonDown("Cancel") && isPaused) {
    setUnPaused();
    isPaused = false;
    return isPaused;
  }

  if (isPaused && EventSystems.EventSystem.current.currentSelectedGameObject == null) {
    EventSystems.EventSystem.current.SetSelectedGameObject(GameObject.Find("Return To Menu"));
  }
}

function OnMouseDown () {
  return false;
}

function setPaused() {
  Debug.Log(MenuButton);
  activatePauseUI(true);
  if (SaveData.currentData) {
    SaveButton.GetComponent(Button).Select();
  } else {
    MenuButton.GetComponent(Button).Select();
  }
  Time.timeScale = 0;

  if (Bmusic && Imusic) {
    Bmusic.volume -= .40;
    Imusic.volume -= .40;
  }

  windVolume = Lwind.volume;
  Lwind.volume = 0;

}

function setUnPaused() {
  activatePauseUI(false);
  Time.timeScale = 1;

  if (Bmusic && Imusic) {
    Bmusic.volume += .40;
    Imusic.volume += .40;
  }

  Lwind.volume = windVolume;
}

function activatePauseUI(bool) {
  if (SaveData.currentData) {
    SaveButton.GetComponent(Text).enabled = bool;
    SaveButton.GetComponent(Button).enabled = bool;
  }

  pausePanel.GetComponent(Image).enabled = bool;
  pausedText.GetComponent(Text).enabled = bool;
  escapeText.GetComponent(Text).enabled = bool;
  QuitButton.GetComponent(Text).enabled = bool;
  QuitButton.GetComponent(Button).enabled = bool;
  MenuButton.GetComponent(Text).enabled = bool;
  MenuButton.GetComponent(Button).enabled = bool;
  luna.GetComponent(MainGravity).isFrozen = bool;

  if (SaveData.currentData) {
    IRButton.GetComponent(Text).enabled = bool;
    IRButton.GetComponent(Button).enabled = bool;
    if (SaveData.currentData.rotation == 90) {
      IRButton.GetComponent(Text).text = "Inverse Rotation: Off";
    } else {
      IRButton.GetComponent(Text).text = "Inverse Rotation: On";
    }
  } else {
  }

  if (successText.GetComponent(Text).enabled == true) {
    successText.GetComponent(Text).enabled = bool;
  }
}

public function saveGameFromPaused() {
  PrivateSaveFromPause();
  successText.GetComponent(Text).text = "Game Data Saved for: " + SaveData.currentData.username;
  successText.GetComponent(Text).enabled = true;
}

public function ReturnToMenu() {
  if (SaveData.currentData) {
    PrivateSaveFromPause();
  }

  Time.timeScale = 1;
  Sounds.use.Kill("BackgroundMusic");
  Sounds.use.Kill("IntroMusic");
  Invoke("LoadMenu", 0);
}

public function ChangeRotation() {
  IRButton.GetComponent(Text);
  if (SaveData.currentData.rotation == 90) {
    IRButton.GetComponent(Text).text = "Inverse Rotation: On";
    SaveData.currentData.rotation = -90;
    PrivateSaveFromPause();
  } else {
    IRButton.GetComponent(Text).text = "Inverse Rotation: Off";
    SaveData.currentData.rotation = 90;
    PrivateSaveFromPause();
  }
  Debug.Log(SaveData.currentData.rotation);
}

public function Quit() {
  Application.Quit();
  // AppHelper.Quit();
}

function LoadMenu() {
  SceneManager.LoadScene("MainMenu");
}

function PrivateSaveFromPause() {
  SaveData.use.SaveGame(
    SaveData.currentData.username,
    Application.loadedLevelName,
    SaveData.currentData.rotation
  );
}
