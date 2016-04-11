#pragma strict

var windAudio : AudioSource;

function Start() {
  windAudio = GetComponent(AudioSource);
}

function OnEnable() {
	windAudio.Play();
}

function OnDisable() {
	windAudio.Stop();
}
