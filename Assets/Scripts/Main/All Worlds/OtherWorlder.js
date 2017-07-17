#pragma strict
// Luna enters secret zone, secret zone and otherWorldActivated flags are set true.
// At the end of the zone, attach this script to the end portal. It reads that the zone has been hit again and knows your
// in the secret world, and then proceeds to end the game.

// requires:
// a checkpoint at the secret zone, an end portal with default turned off
// a changepoint is optional
// two white screens, one for fading in at beginning, one for fading in at end
//

public static var otherWorldActivated : boolean = false;
private static var secretFound : boolean = false;

enum destinationDirection { Down, Right, Up, Left };
public var destinationPoint : Vector3;
public var changePoint : GameObject = null;
public var whiteScreenEnter : GameObject;
public var whiteScreenExit : GameObject;

public var dir = destinationDirection.Down;
private var luna : GameObject;
private var lunaGravity : MainGravity;

public var sMusicVolume : float = 0.84;
public var bMusicVolume : float = 0.84;

public var exitSecret : boolean = false;
public var shouldBringBackgroundMusicBack : boolean = true;

public var steamAchievement : String;

function Start () {
	if (!secretFound && changePoint) {
		changePoint.SetActive(false);
	}

	DontDestroyOnLoad(GameObject.Find("SMusic"));
	luna = GameObject.Find("Luna");
	lunaGravity = luna.GetComponent(MainGravity);
}

function OnCollisionEnter2D (coll : Collision2D) {
	if (coll.gameObject == luna && !otherWorldActivated) {
		otherWorldActivated = true;
		yield StartCoroutine("TransportLunaToSecretZone");
	} else if (coll.gameObject == luna && otherWorldActivated && exitSecret) {
		otherWorldActivated = false;
		secretFound = false;
		yield StartCoroutine("LunaBeatsSecretZone");
	}
}

// enter object from outside secret zone
function TransportLunaToSecretZone() {
	LunaController.use.SecretFreeze();
	Sounds.use.FadeOut("BackgroundMusic", 1, 0.0);
	luna.GetComponent(SpriteRenderer).sortingLayerName = "PuzzleItems";
	SceneHelper.use.FadeImageToWhite(whiteScreenEnter.name, 0.7);
	Sounds.use.ConstructOneOffSound("Secret", luna.transform.position);

	yield WaitForSeconds(1.5);

	Sounds.use.PlaySoundByName("SMusic");
	Sounds.use.FadeIn("SMusic", 0.04, sMusicVolume);
	setPosition();
	setDirection();

	whiteScreenEnter.GetComponent(Image).color = Color.white;

	yield WaitForSeconds(2);


	if (!secretFound) {
		secretFound = true;
		if (changePoint) {
			changePoint.SetActive(true);
		}
	}

	LunaController.use.SecretUnfreeze();
	luna.GetComponent(SpriteRenderer).sortingLayerName = "Luna";
	whiteScreenEnter.SetActive(false);
}


// enter object within the secret zone
function LunaBeatsSecretZone() {

	LunaController.use.SecretFreeze();
	Sounds.use.FadeOut("SMusic", 1, 0.0);
	Sounds.use.ConstructOneOffSound("Secret", luna.transform.position);
	SceneHelper.use.FadeImageToWhite(whiteScreenExit.name, 0.7);

	yield WaitForSeconds(3);

	Destroy(GameObject.Find("SMusic"));

	if (shouldBringBackgroundMusicBack) {
		Sounds.use.FadeIn("BackgroundMusic", 0.02, bMusicVolume);
	}

	recordSecretZoneCompleted();

	var steam = GameObject.Find("SteamCustomizer");
	if (steam) {
		steam.SendMessage("UnlockAchive", steamAchievement);
	}

	yield WaitForSeconds(1.5);
	GetComponent(SceneLoader).beginSceneTransition();
}

function recordSecretZoneCompleted() {
	if (SaveData.use.currentData) {
		SaveData.use.AddSecretData(SaveData.use.currentData.username, SceneManager.GetActiveScene().name);
	}
}

function setDirection() {
	switch (dir)
	{
			case destinationDirection.Down:
				lunaGravity.adjustGravityTo("Down");
				break;
			case destinationDirection.Right:
				lunaGravity.adjustGravityTo("Right");
				break;
			case destinationDirection.Up:
				lunaGravity.adjustGravityTo("Up");
				break;
			case destinationDirection.Left:
				lunaGravity.adjustGravityTo("Left");
				break;
	}
}

function setPosition() {
	luna.transform.position = destinationPoint;
}
