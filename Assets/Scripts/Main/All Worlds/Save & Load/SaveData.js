﻿#pragma strict
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

public function CreateNewGame(user : String, level : String) {
	var filepath : String = "/" + user + "Game.dat";

	if (File.Exists(Application.persistentDataPath + filepath)) {
		Debug.Log('error -- game already exists, cannot overwrite');
	} else {
		var bf : BinaryFormatter = new BinaryFormatter();
		var file = File.Create(Application.persistentDataPath + filepath);
		var data : PlayerData = new PlayerData(user, level);

		bf.Serialize(file, data);
		file.Close();
		currentData = data;
	}
}

public function SaveGame(user : String, level : String) {
	var filepath : String = "/" + user + "Game.dat";
	var bf : BinaryFormatter = new BinaryFormatter();
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
		//todo handle errors
		Debug.Log('error -- user save file not found');
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
