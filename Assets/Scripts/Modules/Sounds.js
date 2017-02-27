#pragma strict

static var use : Sounds;

function Awake () {
	if (use) {
		return;
	}
	use = this;
}
///
function ConstructOneOffSound(name : String, vector : Vector3) {
	// var prefab = AssetDatabase.LoadAssetAtPath("Assets/PreFabs/Sounds/" + name + ".prefab", GameObject);
	var instance = Instantiate(Resources.Load(name, GameObject), vector, Quaternion.identity);
	yield PlaySoundByObject(instance);
	Destroy(instance);
}

function PlaySoundByObject(instance : GameObject) {
	var audio = instance.GetComponent(AudioSource);
  audio.Play();
	yield WaitForSeconds(audio.clip.length + 1);
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

function FadeOut(name : String, rate : float, min : float) {
	var foundSound = GameObject.Find(name).GetComponent(AudioSource);
	while (foundSound.volume > min) {
		foundSound.volume -= rate;
		yield;
	}
}
