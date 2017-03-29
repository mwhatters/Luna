#pragma downcast

import System.Runtime.Serialization.Formatters.Binary;
import System.Runtime.Serialization;
import System.IO;

public var prefab : GameObject;
public var canvas : GameObject;

private var filesLoaded = false;

function Start () {
  yield WaitForSeconds(0.5);
  SceneHelper.use.FadeImageToClear("Blackness", 0.3);
}

function Update() {
  if (EventSystems.EventSystem.current.currentSelectedGameObject == null) {
    EventSystems.EventSystem.current.SetSelectedGameObject(EventSystems.EventSystem.current.firstSelectedGameObject);
  }

  if (filesLoaded) {
    
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
  var y = 500;
  var index = 1;

  for (var file in fileInfo) {
    var bf : BinaryFormatter = new BinaryFormatter();
    try {
      var foundFile = File.Open(Application.persistentDataPath + "/" + file.Name, FileMode.Open);

      var data : PlayerData = bf.Deserialize(foundFile);

      // Build child object
      var thisPrefab = Instantiate(prefab, new Vector3(x,y,0), Quaternion.identity).gameObject;
      thisPrefab.name = Path.GetFileNameWithoutExtension(data.username);
      thisPrefab.transform.SetParent(canvas.transform, false);

      var nameField = thisPrefab.GetComponent(Text);
      nameField.text = (data.username + " -- " + data.level);

      y -= 25;

      //a hack
      if (nameField.text == "") {
        continue;
      }

      // add click listener to instantiated object
      var captured : String = Path.GetFileNameWithoutExtension(file.Name);
      SceneHelper.use.FadeTextToWhite(data.username, 0.3);
      AddListener(thisPrefab.GetComponent(Button), captured);

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
  filesLoaded = true;
}

function AddListener(b : Button, a : String) {
  b.onClick.AddListener(
    function() {
      findAndLoadGame(a);
    }
  );
}
