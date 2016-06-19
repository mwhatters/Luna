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
