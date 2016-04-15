#pragma strict

static var use : Sounds;

function Awake () {
	if (use) {
		// Debug.LogWarning("Only one instance of the Sound script in a scene is allowed");
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
