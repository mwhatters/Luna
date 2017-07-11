#pragma strict
import MenuControls;

public var test = "test";

private var canStartNewGame : boolean = false;
private var darkness : Image;

function Start () {
  //determines whether Luna sprite displayed on game logo
  var gameBeaten : boolean = GameObject.Find("MetaGameStates").GetComponent(MetaGameStates).isGameBeaten();
  if (gameBeaten) {
    GameObject.Find("lunasprite").GetComponent(Image).color.a = 255;
  }

  darkness = GameObject.Find("Blackness").GetComponent(Image);
  darkness.canvasRenderer.SetAlpha(0.01);

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

  if (saveName == "") {
    var errorEmpty = GameObject.Find("NameError").GetComponent(Text);
    errorEmpty.text = "Name is required";
    errorEmpty.color.a = 255;
    return;
  } else if (SaveData.use.SaveFileAlreadyExists(saveName)) {
    var errorTaken = GameObject.Find("NameError").GetComponent(Text);
    errorTaken.text = "Name Already Taken";
    errorTaken.color.a = 255;
  }

  SaveData.use.CreateNewGame(saveName, "1-1 The Dream", 90);

  if (SaveData.currentData) {
    GameObject.Find("NameError").GetComponent(Text).color.a = 0;
    Sounds.use.PlaySoundByName("StartGame");

    darkness.canvasRenderer.SetAlpha(0.01);
    darkness.CrossFadeAlpha(1.0, 2.0, false);
    Invoke("StartGame", 4);
  }
}

public function quitGame() {
  Invoke("Quit", 0.5);
}

public function LoadGameMenu() {
  darkness.CrossFadeAlpha(1.0, 0.5, false);
  Invoke("GoToLoadGame", 0.5);
}

public function LoadSettingsMenu() {
  darkness.CrossFadeAlpha(1.0, 0.5, false);
  Invoke("GoToSettings", 0.5);
}

public function LoadSandbox() {
  darkness.CrossFadeAlpha(1.0, 0.5, false);
  Invoke("GoToSandBox", 0.5);
}

public function StartNameInput() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  GameObject.Find("NameText").GetComponent(Text).color.a = 255;
  nameField.ActivateInputField();
  nameField.Select();
  SceneHelper.use.FadeTextToWhite("Text", 0.5);

  if (InputMapper.input.Device().Name == "None") {
    GameObject.Find("ControllerInputHandler").GetComponent(TextInputMapper).semiActive = true;
  } else {
    GameObject.Find("ControllerInstructions").GetComponent(Text).color.a = 255;
    GameObject.Find("ControllerInputHandler").GetComponent(TextInputMapper).active = true;
    GameObject.Find("ControllerInputHandler").GetComponent(TextInputMapper).semiActive = true;
  }

  Invoke("toggleStartNewGame", 0.3);
}

public function leaveNameInput() {
  if (InputMapper.input.Device().Name != "None") {
  }

  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  nameField.text = "";

  GameObject.Find("NameError").GetComponent(Text).color.a = 0;
  GameObject.Find("ControllerInstructions").GetComponent(Text).color.a = 0;
  GameObject.Find("NameText").GetComponent(Text).color.a = 0;

  GameObject.Find("ControllerInputHandler").GetComponent(TextInputMapper).semiActive = false;
  GameObject.Find("ControllerInputHandler").GetComponent(TextInputMapper).active = false;

  toggleStartNewGame();

  try {
    EventSystems.EventSystem.current.SetSelectedGameObject(GameObject.Find("New Game"));
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

function newGameStartable() {
  return canStartNewGame;
}

function toggleStartNewGame() {
  canStartNewGame = !canStartNewGame;
  return canStartNewGame;
}
