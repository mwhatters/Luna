﻿#pragma strict

function Start () {
  yield WaitForSeconds(1);
  SceneFX.use.FadeImageToClear("LunaBlack", 0.13);
  yield WaitForSeconds(2.5);
  SceneFX.use.FadeImageToClear("MenuBlack", 0.13);
}

public function startNewGame() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  SaveData.use.SaveGame(nameField.text, "1 Intro Level");

  Sounds.use.PlaySoundByName("StartGame");
  SceneFX.use.FadeImageToBlack("Blackness", 0.3);
  Invoke("StartGame", 4);
}

public function quitGame() {
  Invoke("Quit", 0.5);
}

public function LoadGameMenu() {
  SceneFX.use.FadeImageToBlack("Blackness", 0.3);
  Invoke("GoToLoadGame", 3.5);
}

public function StartNameInput() {
  var nameField = GameObject.Find("NameEntry").GetComponent(InputField);
  SceneFX.use.FadeTextToWhite("NameText", 0.3);

  nameField.ActivateInputField();
  nameField.Select();
  SceneFX.use.FadeTextToWhite("NameEntry", 0.3);

  SceneFX.use.FadeTextToGrey("New Game", 0.3);
  SceneFX.use.FadeTextToGrey("Exit Game", 0.3);
  SceneFX.use.FadeTextToGrey("Load Game", 0.3);
}

function Quit() {
  Application.Quit();
}

function StartGame() {
  SceneManager.LoadScene("1 Intro Level");
}

function GoToLoadGame() {
  SceneManager.LoadScene("LoadGame");
}
