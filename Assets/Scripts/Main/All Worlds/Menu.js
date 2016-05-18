#pragma strict


function Start () {
  yield WaitForSeconds(1);
  SceneFX.use.FadeToClear("LunaBlack", 0.13);
  yield WaitForSeconds(2.5);
  SceneFX.use.FadeToClear("MenuBlack", 0.13);
}


public function startNewGame() {
  Sounds.use.PlaySoundByName("StartGame");
  SceneFX.use.FadeToBlack("Blackness", 0.3);
  Invoke("StartGame", 4);
}

public function quitGame() {
  Invoke("Quit", 0.5);
}

public function LoadGameMenu() {
  SceneFX.use.FadeToBlack("Blackness", 0.3);
  Invoke("GoToLoadGame", 3.5);
}

function Quit() {
  Application.Quit();
}

function StartGame() {
  SceneManager.LoadScene(1);
}

function GoToLoadGame() {
  SceneManager.LoadScene("LoadGame");
}
