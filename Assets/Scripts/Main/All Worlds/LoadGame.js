#pragma strict

function Start () {
  yield WaitForSeconds(0.5);
  SceneFX.use.FadeImageToClear("Blackness", 0.3);
}

public function ReturnToMainMenu() {
  Sounds.use.PlaySoundByName("StartGame");
  SceneFX.use.FadeImageToBlack("Blackness", 0.5);
  Invoke("GoToMainMenu", 3.5);
}

function GoToMainMenu() {
  SceneManager.LoadScene(0);
}

function displayGameFinder() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);

  SceneFX.use.FadeTextToWhite("NameText", 0.3);

  nameField.ActivateInputField();
  nameField.Select();
  SceneFX.use.FadeTextToWhite("NameEntry", 0.3);

  SceneFX.use.FadeTextToGrey("Main Menu", 0.3);
  SceneFX.use.FadeTextToGrey("Load Game", 0.3);
}

public function findAndLoadGame() {
  Debug.Log('helllo!');
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  SaveData.use.LoadGame(nameField.text);

  if (SaveData.currentData.username == nameField.text) {
    SceneFX.use.FadeImageToBlack("Blackness", 0.3);
    StartCoroutine(LoadGame(SaveData.currentData.level));
  } else {
  }
}


function LoadGame(level : String) {
  Sounds.use.PlaySoundByName("StartGame");
  yield WaitForSeconds(3.5);
  SceneManager.LoadScene(level);
}
