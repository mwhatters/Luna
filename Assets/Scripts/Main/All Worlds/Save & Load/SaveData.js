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

public function SaveGame(user : String, level : String) {
	var bf : BinaryFormatter = new BinaryFormatter();
	var filepath : String = "/" + user + "Game.dat";
	var file = File.Create(Application.persistentDataPath + filepath);
	var data : PlayerData = new PlayerData(user, level);

	bf.Serialize(file, data);
	file.Close();

	currentData = data;
}

public function LoadGame(user) {
	var filepath : String = "/" + user + "Game.dat";
	Debug.Log(filepath);
	if (File.Exists(Application.persistentDataPath + filepath)) {
		Debug.Log('file exists');
		var bf : BinaryFormatter = new BinaryFormatter();
		var file = File.Open(Application.persistentDataPath + filepath, FileMode.Open);
		var data : PlayerData = bf.Deserialize(file);

		currentData = data;
	} else {
	}
}

public class PlayerData {
	public var username : String;
	public var level : String;

	public function PlayerData(username : String, level : String) {
		this.username = username;
		this.level = level;
  }
}
