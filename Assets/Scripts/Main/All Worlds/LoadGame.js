#pragma strict

function Start () {
  yield WaitForSeconds(0.5);
  SceneFX.use.FadeImageToClear("Blackness", 0.3);
}

public function ReturnToMainMenu() {
  Sounds.use.PlaySoundByName("StartGame");
  SceneFX.use.FadeImageToBlack("Blackness", 0.5);
  Invoke("GoToMainMenu", 3.5);
}

function GoToMainMenu() {
  SceneManager.LoadScene(0);
}
