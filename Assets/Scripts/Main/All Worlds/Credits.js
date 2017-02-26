#pragma strict

function Start () {
  yield WaitForSeconds(1);
  StartCoroutine("CreditsIn");
  yield WaitForSeconds(20);
  StopCoroutine("CreditsIn");
  StartCoroutine("CreditsOut");
  yield WaitForSeconds(10);

  if (SaveData.currentData) {
    SaveData.use.SaveGame(
      SaveData.currentData.username,
      SceneManager.GetActiveScene().name,
      SaveData.currentData.rotation
    );

    SaveData.use.ClearCurrentSaveData();
  }

  SceneManager.LoadScene("MainMenu");
}

function CreditsIn() {
  SceneHelper.use.FadeImageToClear("Blackness", 0.01);
}

function CreditsOut() {
  SceneHelper.use.FadeTo("blackout", 0.03, Color.black);
}
