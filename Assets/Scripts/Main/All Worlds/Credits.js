﻿#pragma strict


var createdBy : GameObject;

function Start () {
  grabTotalTimeAndTokenData();

  //if MetaGameStates available, set gameLoaded to false for slow menu transition post-credits
  if (GameObject.Find("MetaGameStates")) {
    GameObject.Find("MetaGameStates").GetComponent(MetaGameStates).setGameNotLoaded();
  }

  if (SaveData.currentData) {
    SaveData.use.SaveGame(
      SaveData.currentData.username,
      SceneManager.GetActiveScene().name,
      SaveData.currentData.rotation
    );
  }

  yield WaitForSeconds(5);
  yield StartCoroutine("CreditsIn");
  yield StartCoroutine("CreditsOut");
  yield WaitForSeconds(13);

  SceneHelper.use.ShowAndHideText(GameObject.Find("TotalTime"), 5);
  yield SceneHelper.use.ShowAndHideText(GameObject.Find("TotalTokens"), 5);

  determineSteamAchievements();

  yield WaitForSeconds(4);
  Sounds.use.PlaySoundByName("LastLaugh");
  yield WaitForSeconds(5);

  if (SaveData.currentData) {
    SaveData.use.ClearCurrentSaveData();
  }

  Destroy(GameObject.Find("BackgroundMusic"));
  Destroy(GameObject.Find("IntroMusic"));
  SceneManager.LoadScene("MainMenu");
}

function CreditsIn() {
  yield SceneHelper.use.ShowAndHideText(GameObject.Find("Created By"), 3);

  yield WaitForSeconds(1);

  SceneHelper.use.ShowAndHideText(GameObject.Find("Music"), 3);
  yield SceneHelper.use.ShowAndHideText(GameObject.Find("Vinnie Byrne"), 3.5);

  yield WaitForSeconds(1);

  SceneHelper.use.ShowAndHideText(GameObject.Find("FX"), 3);
  yield SceneHelper.use.ShowAndHideText(GameObject.Find("Danielle Goldsmith"), 3.5);

  yield WaitForSeconds(1);

  SceneHelper.use.ShowAndHideText(GameObject.Find("QA"), 3);
  yield SceneHelper.use.ShowAndHideText(GameObject.Find("JHatt2"), 3.5);

  yield WaitForSeconds(1);

  SceneHelper.use.ShowAndHideText(GameObject.Find("Programming"), 3);
  SceneHelper.use.ShowAndHideText(GameObject.Find("Ian Harshman"), 3.5);
  yield SceneHelper.use.ShowAndHideText(GameObject.Find("Brandon Istenes"), 3.5);

  yield WaitForSeconds(1);

  SceneHelper.use.ShowAndHideText(GameObject.Find("Animations"), 3);
  yield SceneHelper.use.ShowAndHideText(GameObject.Find("Vinnie Byrne"), 5.5);

  yield WaitForSeconds(1);
  SceneHelper.use.ShowAndHideText(GameObject.Find("PlayTesters"), 15);
  yield WaitForSeconds(1);
  SceneHelper.use.ShowAndHideText(GameObject.Find("KWay"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("JHatt"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("TSchoe"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("EKai"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("CDreim"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("JMartin"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("JRichards"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("MAgni"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("JForrest"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("MeganD"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("DDavis"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("RStein"), 9);
  yield WaitForSeconds(0.5);
  SceneHelper.use.ShowAndHideText(GameObject.Find("LMath"), 9);
  yield WaitForSeconds(0.5);
  yield SceneHelper.use.ShowAndHideText(GameObject.Find("ManyMore"), 10.5);

  yield WaitForSeconds(1);

  SceneHelper.use.ShowAndHideText(GameObject.Find("FinalCredit"), 3);
  yield SceneHelper.use.ShowAndHideText(GameObject.Find("Marshall Hattersley"), 3.5);

  yield WaitForSeconds(1);

  yield SceneHelper.use.ShowAndHideText(GameObject.Find("ThankYou"), 3);
  yield WaitForSeconds(1);
}

function CreditsOut() {
  SceneHelper.use.FadeTo("blackout", 0.02, Color.black);

  if (GameObject.Find("BackgroundMusic")) {
    Sounds.use.FadeOut("BackgroundMusic", 0.0015, 0.0);
  }
}

function grabTotalTimeAndTokenData() {
  if (SaveData.currentData) {
    var total : float = SaveData.use.currentTimeStats.totalTime();
    var tokens : int = SaveData.use.currentSecretStats.totalSecrets();
    GameObject.Find("TotalTime").GetComponent(ExplanatoryText).displayText = "Clear Time: " + total + " seconds";
    GameObject.Find("TotalTokens").GetComponent(ExplanatoryText).displayText = "Secret Portals Found: " + tokens + " / 5";
  } else {
    GameObject.Find("TotalTime").GetComponent(ExplanatoryText).displayText = "No Time Score Data";
    GameObject.Find("TotalTokens").GetComponent(ExplanatoryText).displayText = "No Secret Portal Discovery Data";
  }
}

function determineSteamAchievements() {
  if (SaveData.currentData) {
    var steam = GameObject.Find("SteamCustomizer");
    var total : float = SaveData.use.currentTimeStats.totalTime();
    var tokens : int = SaveData.use.currentSecretStats.totalSecrets();

    if (steam) {
      if (total < 10800.0) { steam.SendMessage("UnlockAchive", "COMPLETE_UNDER_10800"); }
      if (total < 7200.0) { steam.SendMessage("UnlockAchive", "COMPLETE_UNDER_7200"); }
      if (total < 3600.0) { steam.SendMessage("UnlockAchive", "COMPLETE_UNDER_3600"); }
      if (total < 3000.0) { steam.SendMessage("UnlockAchive", "COMPLETE_UNDER_3000"); }
      if (total < 2700.0) { steam.SendMessage("UnlockAchive", "COMPLETE_UNDER_2700"); }

      if (tokens >= 1) { steam.SendMessage("UnlockAchive", "1_SECRET_FOUND"); }
      if (tokens >= 3) { steam.SendMessage("UnlockAchive", "3_SECRET_FOUND"); }
      if (tokens >= 5) { steam.SendMessage("UnlockAchive", "5_SECRET_FOUND"); }
    }
  }
}
