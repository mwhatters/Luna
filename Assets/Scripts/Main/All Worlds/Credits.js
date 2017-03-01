#pragma strict

function Start () {
  yield WaitForSeconds(5);
  StartCoroutine("CreditsIn");
  yield WaitForSeconds(35);
  StopCoroutine("CreditsIn");
  StartCoroutine("CreditsOut");
  yield WaitForSeconds(20);

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
  Sounds.use.FadeOut("BackgroundMusic", 0.0015, 0);
}
