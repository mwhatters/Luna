#pragma strict

function OnTriggerEnter2D(coll : Collider2D) {
    GameObject.Find("PauseUI").GetComponent(Pause).canPause = false;
    GameObject.Find("GodHatesYouScene").GetComponent(GodHatesYou).StartScene();
    yield WaitForSeconds(5.0);
    StartCoroutine("FadeInMusicSlowly");
}

function FadeInMusicSlowly() {
  var music = GameObject.Find("BackgroundMusic").GetComponent(AudioSource);
  music.Play();
  music.volume = 0;
  while (music.volume < 0.90) {
    music.volume += 0.001;
    yield WaitForSeconds(0.01);
  }
}
