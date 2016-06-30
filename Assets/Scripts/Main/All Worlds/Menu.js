#pragma strict

function Start () {
  yield WaitForSeconds(1);
  SceneFX.use.FadeImageToClear("LunaBlack", 0.13);
  yield WaitForSeconds(2.5);
  SceneFX.use.FadeImageToClear("MenuBlack", 0.13);
}

function Update() {
  if (EventSystems.EventSystem.current.currentSelectedGameObject == null) {
    EventSystems.EventSystem.current.SetSelectedGameObject(EventSystems.EventSystem.current.firstSelectedGameObject);
  }
}

public function startNewGame() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  var saveName = nameField.text.ToLower();

  if (saveName == "" || SaveData.use.SaveFileAlreadyExists(saveName)) {
    EventSystems.EventSystem.current.SetSelectedGameObject(EventSystems.EventSystem.current.firstSelectedGameObject);
    return;
  }

  SaveData.use.CreateNewGame(saveName, "1 Intro Level", 90);

  if (SaveData.currentData) {
    Sounds.use.PlaySoundByName("StartGame");
    SceneFX.use.FadeImageToBlack("Blackness", 0.6);
    Invoke("StartGame", 4);
  }
}

public function quitGame() {
  Invoke("Quit", 0.5);
}

public function LoadGameMenu() {
  SceneFX.use.FadeImageToBlack("Blackness", 0.6);
  Invoke("GoToLoadGame", 2.0);
}

public function LoadSandbox() {
  SceneFX.use.FadeImageToBlack("Blackness", 0.6);
  Invoke("GoToSandBox", 2.0);
}

public function StartNameInput() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  SceneFX.use.FadeTextToWhite("NameText", 0.6);
  nameField.ActivateInputField();
  nameField.Select();
  SceneFX.use.FadeTextToWhite("Text", 0.6);
}

function Quit() {
  Application.Quit();
}

function StartGame() {
  SceneManager.LoadScene("1 Intro Level");
}

function GoToLoadGame() {
  SceneManager.LoadScene("LoadGame");
}

function GoToSandBox() {
  SceneManager.LoadScene("SandBox");
}
