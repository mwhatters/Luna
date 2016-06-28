#pragma strict

public var prefab : GameObject;
public var canvas : GameObject;

function Start () {
  yield WaitForSeconds(0.5);
  SceneFX.use.FadeImageToClear("Blackness", 0.3);

  // generateSavedGames();

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
  // var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  //
  // SceneFX.use.FadeTextToWhite("NameText", 0.3);
  //
  // nameField.ActivateInputField();
  // nameField.Select();
  // SceneFX.use.FadeTextToWhite("NameEntry", 0.3);
  //
  // SceneFX.use.FadeTextToGrey("Main Menu", 0.3);
  // SceneFX.use.FadeTextToGrey("Load Game", 0.3);


  generateSavedGames();
}

public function findAndLoadGame(nameField : String) {
  SaveData.use.LoadGameFromLoadMenu(nameField);

  // if (SaveData.currentData.username == nameField) {
    SceneFX.use.FadeImageToBlack("Blackness", 0.3);
    StartCoroutine(LoadGame(SaveData.currentData.level));
  // } else {
  // }
}


public function findSaveFile() {

}


function LoadGame(level : String) {
  Sounds.use.PlaySoundByName("StartGame");
  yield WaitForSeconds(3.5);
  SceneManager.LoadScene(level);
}

function generateSavedGames() {
  var info = new DirectoryInfo(Application.persistentDataPath);
  var fileInfo = info.GetFiles();

  var x = -300;
  var y = 500;

  for (file in fileInfo) {
    var thisPrefab = Instantiate(prefab, new Vector3(x,y,0), Quaternion.identity).gameObject;
    thisPrefab.name = Path.GetFileNameWithoutExtension(file.Name);
    thisPrefab.transform.SetParent(canvas.transform, false);
    var nameField = thisPrefab.GetComponent(Text);
    nameField.text = Path.GetFileNameWithoutExtension(file.Name);
    y -= 35;

    var captured : String = Path.GetFileNameWithoutExtension(file.Name);

    thisPrefab.GetComponent(Button).onClick.AddListener(
      function() {
        findAndLoadGame(captured);
      }
    );
  }
}
