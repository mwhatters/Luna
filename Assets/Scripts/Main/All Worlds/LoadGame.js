#pragma strict

function Start () {
  yield WaitForSeconds(0.5);
  SceneFX.use.FadeToClear("Blackness", 0.3);
}

public function ReturnToMainMenu() {
  Sounds.use.PlaySoundByName("StartGame");
  SceneFX.use.FadeToBlack("Blackness", 0.5);
  Invoke("GoToMainMenu", 3.5);
}

function GoToMainMenu() {
  SceneManager.LoadScene(0);
}
