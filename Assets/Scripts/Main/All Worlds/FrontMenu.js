#pragma strict
import MenuControls;

public var test = "test";

function Start () {
  yield WaitForSeconds(1);
  SceneHelper.use.FadeImageToClear("LunaBlack", 0.13);
  yield WaitForSeconds(2.5);
  SceneHelper.use.FadeImageToClear("MenuBlack", 0.13);
  yield WaitForSeconds(2);
  GameObject.Find("EventSystem").GetComponent(InControlInputModule).enabled = true;
}

public function startNewGame() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  var saveName = nameField.text.ToLower();

  if (saveName == "" || SaveData.use.SaveFileAlreadyExists(saveName)) {
    EventSystems.EventSystem.current.SetSelectedGameObject(EventSystems.EventSystem.current.firstSelectedGameObject);
    return;
  }

  SaveData.use.CreateNewGame(saveName, "1-1 The Dream", 90);

  if (SaveData.currentData) {
    Sounds.use.PlaySoundByName("StartGame");
    SceneHelper.use.FadeImageToBlack("Blackness", 0.6);
    Invoke("StartGame", 4);
  }
}

public function quitGame() {
  Invoke("Quit", 0.5);
}

public function LoadGameMenu() {
  SceneHelper.use.FadeImageToBlack("Blackness", 0.6);
  Invoke("GoToLoadGame", 2.0);
}

public function LoadSandbox() {
  SceneHelper.use.FadeImageToBlack("Blackness", 0.6);
  Invoke("GoToSandBox", 2.0);
}

public function StartNameInput() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  SceneHelper.use.FadeTextToWhite("NameText", 0.6);
  nameField.ActivateInputField();
  nameField.Select();
  SceneHelper.use.FadeTextToWhite("Text", 0.6);

  if (InputMapper.input.Device().Name != "None") {
    SceneHelper.use.FadeTextToWhite("ControllerInstructions", 0.6);
    GameObject.Find("ControllerInputHandler").GetComponent(TextInputMapper).active = true;
  }
}

public function leaveNameInput() {
  SceneHelper.use.FadeTextToClear("NameText", 0.6);
  if (InputMapper.input.Device().Name != "None") {
    SceneHelper.use.FadeTextToClear("ControllerInstructions", 0.6);
  }

  try {
    EventSystems.EventSystem.current.SetSelectedGameObject(EventSystems.EventSystem.current.firstSelectedGameObject);
  } catch(e) {}
}

function Quit() {
  Application.Quit();
}

function StartGame() {
  SceneManager.LoadScene("1-1 The Dream");
}

function GoToLoadGame() {
  SceneManager.LoadScene("LoadGame");
}

function GoToSandBox() {
  SceneManager.LoadScene("SandBox");
}
