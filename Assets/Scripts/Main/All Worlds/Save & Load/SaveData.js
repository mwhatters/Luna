#pragma strict
import System.Runtime.Serialization.Formatters.Binary;
import System.Runtime.Serialization;
import System.IO;

static var use : SaveData;
public static var currentData : PlayerData;

function Awake () {
	if (use) {
		return;
	}
	use = this;
}

public function CreateNewGame(user : String, level : String, rotation : int) {
	var filepath : String = "/" + user + ".dat";

	if (File.Exists(Application.persistentDataPath + filepath)) {
		Debug.Log('error -- game already exists, cannot overwrite');
	} else {
		var bf : BinaryFormatter = new BinaryFormatter();
		var file = File.Create(Application.persistentDataPath + filepath);
		var data : PlayerData = new PlayerData(user, level, rotation);

		bf.Serialize(file, data);
		file.Close();
		currentData = data;
	}
}

public function SaveGame(user : String, level : String, rotation : int) {
	var filepath : String = "/" + user + ".dat";
	var bf : BinaryFormatter = new BinaryFormatter();
	var file = File.Create(Application.persistentDataPath + filepath);
	var data : PlayerData = new PlayerData(user, level, rotation);

	bf.Serialize(file, data);
	file.Close();
	currentData = data;
}

public function LoadGameFromLoadMenu(savedGame) {
	var filepath : String = "/" + savedGame + ".dat";
	if (File.Exists(Application.persistentDataPath + filepath)) {
		var bf : BinaryFormatter = new BinaryFormatter();
		var file = File.Open(Application.persistentDataPath + filepath, FileMode.Open);
		var data : PlayerData = bf.Deserialize(file);
		currentData = data;
	}
}

public function SaveFileAlreadyExists(name) {
	var filepath : String = "/" + name + ".dat";
	return File.Exists(Application.persistentDataPath + filepath);
}

public class PlayerData {
	public var username : String;
	public var level : String;
	public var rotation : int;

	public function PlayerData(username : String, level : String, rotation: int) {
		this.username = username;
		this.level = level;
		this.rotation = rotation;
  }
}
