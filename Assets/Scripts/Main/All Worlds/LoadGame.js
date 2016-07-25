﻿#pragma strict

public var prefab : GameObject;
public var canvas : GameObject;

function Start () {
  yield WaitForSeconds(0.5);
  SceneHelper.use.FadeImageToClear("Blackness", 0.3);
}

function Update() {
  if (EventSystems.EventSystem.current.currentSelectedGameObject == null) {
    EventSystems.EventSystem.current.SetSelectedGameObject(EventSystems.EventSystem.current.firstSelectedGameObject);
  }
}

public function ReturnToMainMenu() {
  SceneHelper.use.FadeImageToBlack("Blackness", 0.5);
  Invoke("GoToMainMenu", 1.5);
}

function GoToMainMenu() {
  SceneManager.LoadScene(0);
}

function displayGameFinder() {
  generateSavedGames();
}

public function findAndLoadGame(nameField : String) {
  SaveData.use.LoadGameFromLoadMenu(nameField);
  SceneHelper.use.FadeImageToBlack("Blackness", 0.3);
  StartCoroutine(LoadGame(SaveData.currentData.level));
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
  var y = 580;
  var index = 1;

  for (file in fileInfo) {
    var thisPrefab = Instantiate(prefab, new Vector3(x,y,0), Quaternion.identity).gameObject;
    thisPrefab.name = Path.GetFileNameWithoutExtension(file.Name);
    thisPrefab.transform.SetParent(canvas.transform, false);
    var nameField = thisPrefab.GetComponent(Text);
    nameField.text = Path.GetFileNameWithoutExtension(file.Name);

    y -= 25;

    //a hack
    if (nameField.text == "") {
      continue;
    }

    var captured : String = Path.GetFileNameWithoutExtension(file.Name);
    SceneHelper.use.FadeTextToWhite(nameField.text, 0.3);
    AddListener(thisPrefab.GetComponent(Button), captured);

    if (index == 1) {
      thisPrefab.GetComponent(Button).Select();
      Destroy(GameObject.Find("Load Game"));
      index += 1;

    }


    yield WaitForSeconds(0.03);
  }
}

function AddListener(b : Button, a : String) {
  b.onClick.AddListener(
    function() {
      findAndLoadGame(a);
    }
  );
}
