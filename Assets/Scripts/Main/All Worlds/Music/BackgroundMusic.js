#pragma strict

public var timeToStart : float;
public static var MusicInstance;

// Make this game object and all its transform children
// survive when loading a new scene.
function Awake () {
	Debug.Log(MusicInstance);
	if (MusicInstance) {
		DestroyImmediate(gameObject);
	} else {
		this.GetComponent(AudioSource).PlayScheduled(AudioSettings.dspTime + timeToStart);
		DontDestroyOnLoad (transform.gameObject);
		MusicInstance = this;
	}


}
