#pragma strict

function Start () {
  yield WaitForSeconds(1);
  SceneFX.use.FadeImageToClear("LunaBlack", 0.13);
  yield WaitForSeconds(2.5);
  SceneFX.use.FadeImageToClear("MenuBlack", 0.13);
}

public function startNewGame() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  SaveData.use.CreateNewGame(nameField.text, "1 Intro Level");


  if (SaveData.currentData) {
    Sounds.use.PlaySoundByName("StartGame");
    SceneFX.use.FadeImageToBlack("Blackness", 0.6);
    Invoke("StartGame", 4);
  } else {
    //todo handle errors
    Debug.Log('error user already exists, cannot overwrite');
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
  SceneFX.use.FadeTextToWhite("NameEntry", 0.6);

  SceneFX.use.FadeTextToGrey("New Game", 0.6);
  SceneFX.use.FadeTextToGrey("Exit Game", 0.6);
  SceneFX.use.FadeTextToGrey("Load Game", 0.6);
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
