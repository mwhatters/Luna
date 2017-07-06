#pragma downcast
import System.Runtime.Serialization.Formatters.Binary;
import System.Runtime.Serialization;
import System.IO;

static var use : SaveData;
public static var currentData : PlayerData;
public static var currentTimeStats : TimeStats;
public static var currentSecretStats : SecretStats;

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
    return false;
  } else {
    var bf : BinaryFormatter = new BinaryFormatter();
    var file = File.Create(Application.persistentDataPath + filepath);
    var data : PlayerData = new PlayerData(user, level, rotation);

    bf.Serialize(file, data);
    file.Close();
    currentData = data;
    createNewTimeStatsFromPlayerData(currentData.username);
    createNewSecretStatsFromPlayerData(currentData.username);
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
        loadSecretStatsFromPlayerData(currentData.username);
    }
}

public function SaveFileAlreadyExists(name) {
    var filepath : String = getFilePath(name);
    return File.Exists(Application.persistentDataPath + filepath);
}

public function ClearCurrentSaveData() {
    var cam = GameObject.Find("Camera");
    if (cam) {
      var checkpointer = cam.GetComponent(CheckpointTracker);
      if (checkpointer) {
        checkpointer.checkPointPos = Vector3(0,0,0);
      }
    }

    currentData = null;
    currentTimeStats = null;
    currentSecretStats = null;
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
    var statsData : TimeStats = new TimeStats(user, timeData);

    bf.Serialize(file, statsData);
    file.Close();
    currentTimeStats = statsData;
}

private function createNewTimeStatsFromPlayerData(username : String) {
    var statsFilepath : String = getTimeStatsPath(username);

    if (File.Exists(Application.persistentDataPath + statsFilepath)) {
        Debug.Log('error -- stats already exists, cannot overwrite');
    } else {
        var bf : BinaryFormatter = new BinaryFormatter();
        var file = File.Create(Application.persistentDataPath + statsFilepath);
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
    } else {
        createNewTimeStatsFromPlayerData(username);
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





// MONSTRANCES

public function AddSecretData(username : String, level : String) {
    var data = currentSecretStats.secretData;
    if (data.ContainsKey(level)) {
        data.Remove(level);
        data.Add(level, 1);
    } else {
        data.Add(level, 1);
    }

    saveSecretStats(username, data);
}

private function saveSecretStats(user : String, secretData : Hashtable) {
    var filepath : String = getSecretStatsPath(user);
    var bf : BinaryFormatter = new BinaryFormatter();
    var file = File.Create(Application.persistentDataPath + filepath);
    var statsData : SecretStats = new SecretStats(user, secretData);

    bf.Serialize(file, statsData);
    file.Close();
    currentSecretStats = statsData;
}

private function getSecretStatsPath(name : String) {
    return "/" + name + "_secrets.dat";
}

private function createNewSecretStatsFromPlayerData(username : String) {
    var secretStatsFilepath : String = getSecretStatsPath(username);

    if (File.Exists(Application.persistentDataPath + secretStatsFilepath)) {
        Debug.Log('error -- stats already exists, cannot overwrite');
    } else {
        var bf : BinaryFormatter = new BinaryFormatter();
        var file = File.Create(Application.persistentDataPath + secretStatsFilepath);
        var data : SecretStats = new SecretStats(username, new Hashtable());

        bf.Serialize(file, data);
        file.Close();
        currentSecretStats = data;
    }
}

private function loadSecretStatsFromPlayerData(username : String) {
    var filepath = getSecretStatsPath(username);
    if (File.Exists(Application.persistentDataPath + filepath)) {
        var bf : BinaryFormatter = new BinaryFormatter();
        var file = File.Open(Application.persistentDataPath + filepath, FileMode.Open);
        var data : SecretStats = bf.Deserialize(file);
        currentSecretStats = data;
    } else {
        createNewSecretStatsFromPlayerData(username);
    }
}


public class SecretStats {
    public var username : String;
    public var secretData : Hashtable;

    public function SecretStats(username : String, secretData : Hashtable) {
        this.username = username;
        this.secretData = secretData;
    }

    public function totalSecrets() {
        var totalSecrets : int = 0;
        for (var token : DictionaryEntry in this.secretData) {
            var value : int = token.Value;
            totalSecrets = totalSecrets + value;
        }
        return totalSecrets;
    }
}
