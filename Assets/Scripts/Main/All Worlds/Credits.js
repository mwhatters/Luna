#pragma strict

function Start () {
  yield WaitForSeconds(1);
  SceneHelper.use.FadeImageToClear("Blackness", 0.08);
  yield WaitForSeconds(20);
  SceneHelper.use.FadeImageToBlack("Blackness", 0.08);
  yield WaitForSeconds(3);

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
