#pragma downcast

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

  if (GameObject.Find("BackgroundMusic") && GameObject.Find("IntroMusic")) {
    Bmusic = GameObject.Find("BackgroundMusic").GetComponent(AudioSource);
    Imusic = GameObject.Find("IntroMusic").GetComponent(AudioSource);
  }

}

function Update () {
  if (!canPause) { return false; }

  if (InputMapper.input.Pause() && !isPaused) {
    setPaused();
    isPaused = true;
    return isPaused;
  }

  if (InputMapper.input.Pause() && isPaused) {
    setUnPaused();
    isPaused = false;
    return isPaused;
  }

  return true;
}

function OnMouseDown () {
  return false;
}

function setPaused() {
  GameObject.Find("EventSystem").GetComponent(MenuControlsAdapter).enabled = true;
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
  GameObject.Find("EventSystem").GetComponent(MenuControlsAdapter).enabled = false;
  EventSystems.EventSystem.current.SetSelectedGameObject(null);
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
    // Kill Intro Scripts for Specified scenes
    if (SaveData.currentData.level == "1-1 The Dream") { Destroy(GameObject.Find("IntroGame")); }
    if (SaveData.currentData.level == "3-1 Burdens") { Destroy(GameObject.Find("EnterPAL")); }
    if (SaveData.currentData.level == "6-8 The Door") { Destroy(GameObject.Find("EnterGod")); }
  }

  Time.timeScale = 1;
  Sounds.use.Kill("BackgroundMusic");
  Sounds.use.Kill("IntroMusic");

  SaveData.use.ClearCurrentSaveData();
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
}

public function Quit() {
  Application.Quit();
}

function LoadMenu() {
  SceneManager.LoadScene("MainMenu");
}

function PrivateSaveFromPause() {
  SaveData.use.SaveGame(
    SaveData.currentData.username,
    SceneManager.GetActiveScene().name,
    SaveData.currentData.rotation
  );
}
