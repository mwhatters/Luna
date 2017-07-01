#pragma strict


var createdBy : GameObject;

function Start () {
  grabTotalTime();
  GameObject.Find("MetaGameStates").GetComponent(MetaGameStates).setGameNotLoaded()

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

  yield SceneHelper.use.ShowAndHideText(GameObject.Find("TotalTime"), 5);

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
  Sounds.use.FadeOut("BackgroundMusic", 0.0015, 0.0);
}

function grabTotalTime() {
  if (SaveData.currentData) {
    var total : float = SaveData.use.currentTimeStats.totalTime();
    GameObject.Find("TotalTime").GetComponent(ExplanatoryText).displayText = "Clear Time: " + total + " seconds";
  } else {
    GameObject.Find("TotalTime").GetComponent(ExplanatoryText).displayText = "No Time Score Data";
  }
}
