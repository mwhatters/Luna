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
      playNormalSceneExit();
1
      SceneManager.LoadScene(sceneToLoad);
    }
  }
}

function playNormalSceneExit() {

}

function resetCheckPointLoader() {
  GameObject.Find("Camera").GetComponent(CheckpointTracker).checkPointPos = Vector3(0,0,0);
}
