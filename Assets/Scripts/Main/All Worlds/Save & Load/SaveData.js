#pragma downcast
import System.Runtime.Serialization.Formatters.Binary;
import System.Runtime.Serialization;
import System.IO;

static var use : SaveData;
public static var currentData : PlayerData;
public static var currentTimeStats : TimeStats;

function Awake () {
	if (use) {
		return;
	}
	use = this;
}

public function CreateNewGame(user : String, level : String, rotation : int) {
	var filepath : String = getFilePath(user);

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
	var filepath : String = getFilePath(user);
	var bf : BinaryFormatter = new BinaryFormatter();
	var file = File.Create(Application.persistentDataPath + filepath);
	var data : PlayerData = new PlayerData(user, level, rotation);

	bf.Serialize(file, data);
	file.Close();
	currentData = data;
}

public function LoadGameFromLoadMenu(savedGame : String) {
	var filepath : String = getFilePath(savedGame);
	if (File.Exists(Application.persistentDataPath + filepath)) {
		var bf : BinaryFormatter = new BinaryFormatter();
		var file = File.Open(Application.persistentDataPath + filepath, FileMode.Open);
		var data : PlayerData = bf.Deserialize(file);
		currentData = data;
	}
}

public function SaveFileAlreadyExists(name) {
	var filepath : String = getFilePath(name);
	return File.Exists(Application.persistentDataPath + filepath);
}

public function ClearCurrentSaveData() {
	currentData = null;
}

private function getFilePath(name : String) {
	return "/" + name + ".dat";
}

private function getTimeStatsPath(name : String) {
	return "/" + name + "_stats.dat";
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

public class TimeStats {
	public var username : String;
	public var numberOfJumps : int;
	public var numberOfDeaths : int;
	public var timeData : Hashtable;

	public function TimeStats(username : String, numberOfJumps : int, numberOfDeaths : int) {
		this.username = username;
		this.numberOfJumps = numberOfJumps;
		this.numberOfDeaths = numberOfDeaths;
		this.timeData = timeData;
	}

	public function totalTime() {
		var totalTime : float = 0.0;
		for (var time : DictionaryEntry in this.timeData) {
			var value : float = time.Value;
			totalTime = totalTime + value;
		}
		return totalTime;
	}
}
