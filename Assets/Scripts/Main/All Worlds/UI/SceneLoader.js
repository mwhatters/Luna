#pragma strict
import UnityEngine.SceneManagement;

public var normalSceneTransition : boolean = true;
public var sceneToLoad : int;
public var killMusic : boolean = false;

public var persistentObjectsToKill : GameObject[];
public var endLevelZoom : float = 125;

function OnCollisionEnter2D(coll : Collision2D) {
  var tag : String = coll.gameObject.tag;
  if (tag == "TheGuy") {
    if (normalSceneTransition) {
      resetCheckPointLoader();
      yield playNormalSceneExit();
      SceneManager.LoadScene(sceneToLoad);
    }
  }
}

function playNormalSceneExit() {
  // save timer results

  GameObject.Find("User Interface").GetComponent(Timer).running = false;
  GameObject.Find("TimerText").GetComponent(Timer).isLevelTransition = true;
  GameObject.Find("ETInstantiator").GetComponent(UISceneTransition).PortalExitTransition();
  Sounds.use.PlaySoundByTag("WinSound");
  ZoomCameraToPortal();

  yield WaitForSeconds(1.5);
  if (killMusic) { Destroy(GameObject.Find("BackgroundMusic")); }
}

function resetCheckPointLoader() {
  GameObject.Find("Camera").GetComponent(CheckpointTracker).checkPointPos = Vector3(0,0,0);
}

function ZoomCameraToPortal() {
  var cameraScope = GameObject.Find("Camera").GetComponent(Camera);
  var rate = 1.0/3.0;
  var t = 0.0;

  while (t < 1.0) {
    t += Time.deltaTime * rate;
    cameraScope.fieldOfView = Mathf.Lerp(cameraScope.fieldOfView, endLevelZoom, t);
    yield;
  }
}
