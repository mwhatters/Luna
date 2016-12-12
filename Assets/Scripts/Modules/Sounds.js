#pragma strict

static var use : Sounds;

function Awake () {
	if (use) {
		return;
	}
	use = this;
}

function PlaySoundByTag(tag : String) {
  var audio = GameObject.FindGameObjectWithTag(tag).GetComponent(AudioSource);
  audio.Play();
}

function PlaySoundByName(name : String) {
  var audio = GameObject.Find(name).GetComponent(AudioSource);
	audio.Play();
}

function EnableSoundByName(name : String, volume : float) {
	var foundSound = GameObject.Find(name).GetComponent(AudioSource);
	foundSound.volume = volume;
	foundSound.enabled = true;
	PlaySoundByName(name);
}

function DisableSoundByName(name : String) {
	var foundSound = GameObject.Find(name).GetComponent(AudioSource);
	while (foundSound.volume > 0) {
		foundSound.volume -= 0.07;
		yield;
	}
	foundSound.enabled = false;
}

function Kill(sound : String) {
	Destroy(GameObject.Find(sound));
}

function FadeIn(name : String, rate : float, max : float) {
	var foundSound = GameObject.Find(name).GetComponent(AudioSource);
	while (foundSound.volume < max) {
		foundSound.volume += rate;
		yield;
	}
}
