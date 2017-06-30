#pragma strict
import MenuControls;

public var test = "test";

function Start () {
  //determines whether Luna sprite displayed on game logo
  var gameBeaten : boolean = GameObject.Find("MetaGameStates").GetComponent(MetaGameStates).isGameBeaten();
  if (gameBeaten) {
    GameObject.Find("lunasprite").GetComponent(Image).color.a = 255;
  }

  //don't do all fades if game has already been loaded
  var gameLoaded : boolean = GameObject.Find("MetaGameStates").GetComponent(MetaGameStates).isGameLoaded();

  if (!gameLoaded) { //initial load case, slower display
    GameObject.Find("MetaGameStates").GetComponent(MetaGameStates).gameHasBeenLoaded();
    yield WaitForSeconds(0.5);
    SceneHelper.use.FadeImageToClear("LunaBlack", 0.13);
    yield WaitForSeconds(1.5);
    SceneHelper.use.FadeImageToClear("MenuBlack", 0.13);
    yield WaitForSeconds(0.75);

  } else { //all other cases, faster display
    yield WaitForSeconds(0.2);
    SceneHelper.use.FadeImageToClear("LunaBlack", 0.2);
    SceneHelper.use.FadeImageToClear("MenuBlack", 0.2);
    yield WaitForSeconds(0.4);
  }

  GameObject.Find("EventSystem").GetComponent(InControlInputModule).enabled = true;
}

public function startNewGame() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  var saveName = nameField.text.ToLower();

  if (saveName == "" || SaveData.use.SaveFileAlreadyExists(saveName)) {
    GameObject.Find("NameError").GetComponent(Text).color.a = 255;
    return;
  }

  SaveData.use.CreateNewGame(saveName, "1-1 The Dream", 90);

  if (SaveData.currentData) {
    GameObject.Find("NameError").GetComponent(Text).color.a = 0;
    Sounds.use.PlaySoundByName("StartGame");
    SceneHelper.use.FadeImageToBlack("Blackness", 0.5);
    Invoke("StartGame", 4);
  }
}

public function quitGame() {
  Invoke("Quit", 0.5);
}

public function LoadGameMenu() {
  SceneHelper.use.FadeImageToBlack("Blackness", 0.5);
  Invoke("GoToLoadGame", 0.5);
}

public function LoadSettingsMenu() {
  SceneHelper.use.FadeImageToBlack("Blackness", 0.5);
  Invoke("GoToSettings", 0.5);
}

public function LoadSandbox() {
  SceneHelper.use.FadeImageToBlack("Blackness", 0.5);
  Invoke("GoToSandBox", 0.5);
}

public function StartNameInput() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  SceneHelper.use.FadeTextToWhite("NameText", 0.5);
  nameField.ActivateInputField();
  nameField.Select();
  SceneHelper.use.FadeTextToWhite("Text", 0.5);

  if (InputMapper.input.Device().Name != "None") {
    SceneHelper.use.FadeTextToWhite("ControllerInstructions", 0.5);
    GameObject.Find("ControllerInputHandler").GetComponent(TextInputMapper).active = true;
  }
}

public function leaveNameInput() {
  SceneHelper.use.FadeTextToClear("NameText", 0.5);
  if (InputMapper.input.Device().Name != "None") {
    SceneHelper.use.FadeTextToClear("ControllerInstructions", 0.5);
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

function GoToSettings() {
  SceneManager.LoadScene("Settings");
}

function GoToSandBox() {
  SceneManager.LoadScene("SandBox");
}
