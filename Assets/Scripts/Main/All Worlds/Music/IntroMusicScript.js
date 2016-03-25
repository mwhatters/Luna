#pragma strict

public static var MusicInstance;

// Make this game object and all its transform children
// survive when loading a new scene.
function Awake () {
	if (MusicInstance) {
		DestroyImmediate(gameObject);
	} else {
		DontDestroyOnLoad (transform.gameObject);
		MusicInstance = this;
	}


}
