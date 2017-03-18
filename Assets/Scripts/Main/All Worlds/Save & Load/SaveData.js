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
		createNewTimeStatsFromPlayerData(currentData.name);
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
		loadTimeStatsFromPlayerData(currentData.username);
	}
}

public function SaveFileAlreadyExists(name) {
	var filepath : String = getFilePath(name);
	return File.Exists(Application.persistentDataPath + filepath);
}

public function ClearCurrentSaveData() {
	currentData = null;
	currentTimeStats = null;
}

private function getFilePath(name : String) {
	return "/" + name + ".dat";
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

// TIME STATS

public function AddTimeData(username : String, level : String, time : float) {
	var data = currentTimeStats.timeData;
	if (data.ContainsKey(level)) {
		data.Remove(level);
		data.Add(level, time);
	} else {
		data.Add(level, time);
	}

	saveTimeStats(username, data);
}

private function saveTimeStats(user : String, timeData : Hashtable) {
	var filepath : String = getTimeStatsPath(user);
	var bf : BinaryFormatter = new BinaryFormatter();
	var file = File.Create(Application.persistentDataPath + filepath);
	var data : TimeStats = new TimeStats(user, timeData);

	bf.Serialize(file, data);
	file.Close();
	currentTimeStats = data;
}

private function createNewTimeStatsFromPlayerData(username : String) {
	var filepath : String = getTimeStatsPath(username);

	if (File.Exists(Application.persistentDataPath + filepath)) {
		Debug.Log('error -- stats already exists, cannot overwrite');
	} else {
		var bf : BinaryFormatter = new BinaryFormatter();
		var file = File.Create(Application.persistentDataPath + filepath);
		var data : TimeStats = new TimeStats(username, new Hashtable());

		bf.Serialize(file, data);
		file.Close();
		currentTimeStats = data;
	}
}

private function loadTimeStatsFromPlayerData(username : String) {
	var filepath = getTimeStatsPath(username);
	if (File.Exists(Application.persistentDataPath + filepath)) {
		var bf : BinaryFormatter = new BinaryFormatter();
		var file = File.Open(Application.persistentDataPath + filepath, FileMode.Open);
		var data : TimeStats = bf.Deserialize(file);
		currentTimeStats = data;
	}
}

private function getTimeStatsPath(name : String) {
	return "/" + name + "_stats.dat";
}

public class TimeStats {
	public var username : String;
	public var timeData : Hashtable;

	public function TimeStats(username : String, timeData : Hashtable) {
		this.username = username;
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
