#pragma strict


function Start () {
  yield WaitForSeconds(1);
  FadeToClear("LunaBlack");
  yield WaitForSeconds(2.5);
  FadeToClear("MenuBlack");
}


function Awake() {
  DontDestroyOnLoad(this);
}


public function startNewGame() {
  var audio = GameObject.Find("StartGame").GetComponent(AudioSource);
  audio.Play();

  FadeToBlack("Blackness");
  Invoke("StartGame", 4);
}

public function quitGame() {
  Debug.Log('game quit!');
  Application.Quit();
}


function fadeOut() {

}

function StartGame() {
  SceneManager.LoadScene(1);
}

function FadeToClear(object) {
  var FadeImg = GameObject.Find(object).GetComponent(Image);
  while (FadeImg.color.a > 0.02) {
    FadeImg.color = Color.Lerp(FadeImg.color, Color.clear, 1 * 0.13);
    yield WaitForSeconds(0.1);
  }
  FadeImg.color.a = 0.0;
}

function FadeToBlack(object) {
  var FadeImg = GameObject.Find(object).GetComponent(Image);
  while (FadeImg.color.a < 255) {
    FadeImg.color = Color.Lerp(FadeImg.color, Color.black, 0.5 * 0.3);
    yield WaitForSeconds(0.1);
  }
  FadeImg.color.a = 255;
}
