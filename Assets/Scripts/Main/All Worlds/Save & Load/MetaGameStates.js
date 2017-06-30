#pragma strict

import System.Runtime.Serialization.Formatters.Binary;
import System.Runtime.Serialization;
import System.IO;

private var gameLoaded : boolean;

function Awake() {
	DontDestroyOnLoad(transform.gameObject);	
}

function Start () {
	gameLoaded = false;
}

function gameHasBeenBeaten() {
	var info = new DirectoryInfo(Application.persistentDataPath);
  	var fileInfo = info.GetFiles();

	for (var file in fileInfo) {
		if (file.Name.Contains("_stats.dat")) { continue; }
		var bf : BinaryFormatter = new BinaryFormatter();

		var foundFile = File.Open(Application.persistentDataPath + "/" + file.Name, FileMode.Open);
		var data : PlayerData = bf.Deserialize(foundFile);

		if (data.level == "Credits") {
			return true;
		}
	}

	return false;
}

// public api
function isGameBeaten() {
	return gameHasBeenBeaten();
}

function gameHasBeenLoaded() {
	gameLoaded = true;
}

function isGameLoaded() {
	return gameLoaded;
}