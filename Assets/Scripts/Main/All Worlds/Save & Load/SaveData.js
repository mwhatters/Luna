#pragma strict

static var use : SaveData;

function Awake () {
	if (use) {
		return;
	}
	use = this;
}

function SaveGame(user, level) {
  Debug.Log(user);
	Debug.Log(level);
}
