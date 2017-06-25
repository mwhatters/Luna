﻿#pragma downcast

import System.Runtime.Serialization.Formatters.Binary;
import System.Runtime.Serialization;
import System.IO;

public var prefab : GameObject;
public var canvas : GameObject;

private var saveFilesContainer : RectTransform;
private var savesLoaded : boolean = false;

function Start () {
  saveFilesContainer = GameObject.Find("SaveFileContainers").GetComponent(RectTransform);
  yield WaitForSeconds(0.5);
  SceneHelper.use.FadeImageToClear("Blackness", 0.3);
  yield WaitForSeconds(1);
  generateSavedGames();
}

function Update() {
  if (EventSystems.EventSystem.current.currentSelectedGameObject == null) {
    EventSystems.EventSystem.current.SetSelectedGameObject(EventSystems.EventSystem.current.firstSelectedGameObject);
  }

  if (savesLoaded) {
    if (InputMapper.input.MenuMoveUp()) {
      saveFilesContainer.anchoredPosition.y += 4;
    }

    if (InputMapper.input.MenuMoveDown()) {
      saveFilesContainer.anchoredPosition.y -= 4;
    }
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
  SceneHelper.use.FadeTextToWhite("Scrolling", 0.3);
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
  var y = 500;
  var index = 1;

  for (var file in fileInfo) {
    var bf : BinaryFormatter = new BinaryFormatter();
    try {
      if (file.Name.Contains("_stats.dat")) { continue; }
      var foundFile = File.Open(Application.persistentDataPath + "/" + file.Name, FileMode.Open);
      var data : PlayerData = bf.Deserialize(foundFile);

      // Build child object
      var thisPrefab = Instantiate(prefab, new Vector3(x,y,0), Quaternion.identity).gameObject;
      thisPrefab.name = Path.GetFileNameWithoutExtension(data.username);
      thisPrefab.transform.SetParent(canvas.transform, false);

      var nameField = thisPrefab.GetComponent(Text);

      if (data.level == "Credits") {
        var foundTimeFile = File.Open(Application.persistentDataPath + "/" + data.username + "_stats.dat", FileMode.Open);
        var timeData : TimeStats = bf.Deserialize(foundTimeFile);
        var timeScore = timeData.totalTime();
        nameField.text = (data.username + " -- Clear  Time: " + timeScore + "  seconds");
      } else {
        nameField.text = (data.username + " -- " + data.level);
      }

      y -= 35;

      //a hack
      if (nameField.text == "") {
        continue;
      }

      if (data.level == "Credits") {
        SceneHelper.use.FadeTextToCyan(data.username, 0.3);
      } else {
        SceneHelper.use.FadeTextToWhite(data.username, 0.3);
        // add click listener to instantiated object
        var captured : String = Path.GetFileNameWithoutExtension(file.Name);
        AddListener(thisPrefab.GetComponent(Button), captured);
      }

      if (index == 1) {
        thisPrefab.GetComponent(Button).Select();
        Destroy(GameObject.Find("Load Game"));
        index += 1;
      }

    } catch(e) {
        Debug.Log(e);
    } finally {
      foundFile.Close();
    }

    yield WaitForSeconds(0.03);
  }

  savesLoaded = true;
}

function AddListener(b : Button, a : String) {
  b.onClick.AddListener(
    function() {
      findAndLoadGame(a);
    }
  );
}
