#pragma strict

public var timeToStart : float;
public var startOnQueue : boolean = false;
public static var MusicInstance;

// Make this game object and all its transform children
// survive when loading a new scene.
function Awake () {
	if (MusicInstance) {
		DestroyImmediate(gameObject);
	} else {
		if (startOnQueue) {
			this.GetComponent(AudioSource).PlayScheduled(AudioSettings.dspTime + timeToStart);
		}

		DontDestroyOnLoad (transform.gameObject);
		MusicInstance = this;
	}


}
