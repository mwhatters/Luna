#pragma strict

var luna : GameObject;
var timer : Timer;
var cam : GameObject;
var pauseMenu : GameObject;


function Start () {
    luna = GameObject.Find("Luna");
    cam = GameObject.Find("Camera");
    pauseMenu = GameObject.Find("PauseUI");
    timer = GameObject.Find("User Interface").GetComponent(Timer);

    startIntroLobby1();
}


function startIntroLobby1() {
  timer.running = false;
  pauseMenu.GetComponent(Pause).canPause = false;
  LunaController.use.Freeze();

  yield WaitForSeconds(4);
  SceneHelper.use.PartiallyFadeInImage("MOB Center", 0.0007, .2);
  yield WaitForSeconds(3);

  //0.8 music
  Sounds.use.FadeIn("BackgroundMusic", 0.0015, 0.8);
  yield WaitForSeconds(3);

  SceneHelper.use.FadeOutImage("black1");
  yield WaitForSeconds(1);
  SceneHelper.use.FadeOutImage("black2");
  yield WaitForSeconds(1);
  SceneHelper.use.FadeOutImage("black3");
  yield WaitForSeconds(1);
  SceneHelper.use.FadeOutImage("black4");

  yield WaitForSeconds(7);
  LunaController.use.Unfreeze();
  timer.startTimerFromZero();
  timer.running = true;
  pauseMenu.GetComponent(Pause).canPause = true;
}
