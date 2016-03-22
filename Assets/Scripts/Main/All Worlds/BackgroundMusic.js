#pragma strict

public var musicObject : GameObject;
public static var Instance;

// Make this game object and all its transform children
// survive when loading a new scene.
function Awake () {
	if (Instance) {
		DestroyImmediate(gameObject);
	} else {
		DontDestroyOnLoad (transform.gameObject);
		Instance = this;
	}
}
