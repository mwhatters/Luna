#pragma strict
import UnityEngine.SceneManagement;

public var normalSceneTransition : boolean = true;
public var sceneToLoad : int;
public var killMusic : boolean = false;

public var persistentObjectsToKill : GameObject[];


function Start () {

}

function OnCollisionEnter2D(coll : Collision2D) {
  Debug.Log('hey! collided!');
  var tag : String = coll.gameObject.tag;
  if (tag == "TheGuy") {
    if (normalSceneTransition) {
      resetCheckPointLoader();
      yield playNormalSceneExit();

      // SceneManager.LoadScene(sceneToLoad);
    }
  }
}

function playNormalSceneExit() {
  GameObject.Find("User Interface").GetComponent(Timer).running = false;
  GameObject.Find("ETInstantiator").GetComponent(ExitTransition).PortalExitTransition();
  playSound("WinSound");
  yield ZoomCameraToEndLevelState();
  yield WaitForSeconds(3.0);
}

function resetCheckPointLoader() {
  GameObject.Find("Camera").GetComponent(CheckpointTracker).checkPointPos = Vector3(0,0,0);
}


function playSound(tag : String) {
  var audio = GameObject.FindGameObjectWithTag(tag).GetComponent(AudioSource);
  audio.Play();
}


function ZoomCameraToEndLevelState() {
	var cameraScope = GameObject.Find("Camera").GetComponent(Camera);
	var rate = 1.0/2.0;
	var t = 0.0;

	while (t < 1.0) {
		t += Time.deltaTime * rate;
		cameraScope.fieldOfView = Mathf.Lerp(cameraScope.fieldOfView, 125, t);
		yield;
	}
}
