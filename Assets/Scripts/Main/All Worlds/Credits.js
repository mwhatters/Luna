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

  Destroy(GameObject.Find("BackgroundMusic"));
  Destroy(GameObject.Find("IntroMusic"));
  SceneManager.LoadScene("MainMenu");
}

function CreditsIn() {
  SceneHelper.use.FadeImageToClear("Blackness", 0.01);
}

function CreditsOut() {
  SceneHelper.use.FadeTo("blackout", 0.03, Color.black);
  Sounds.use.FadeOut("BackgroundMusic", 0.0015);
}
