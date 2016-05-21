#pragma strict

function Start () {
  yield WaitForSeconds(0.5);
  SceneFX.use.FadeImageToClear("Blackness", 0.3);
}
