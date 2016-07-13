#pragma strict

function Start () {
  yield WaitForSeconds(0.5);
  SceneHelper.use.FadeImageToClear("Blackness", 0.3);
}
