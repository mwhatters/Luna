#pragma strict

private var collided = false;

function OnCollisionEnter2D (coll : Collision2D) {
  if (coll.gameObject.CompareTag("TheGuy") && collided == false) {

    collided = true;
    LunaController.use.FreezeLunaAndAnimation();
    var grav = coll.gameObject.GetComponent(MainGravity);
    if (grav.facingRight == false) { grav.Flip(); }


    // Sounds.use.PlaySoundByName("Refuge");
    SceneHelper.use.FadeTo("Luna", 0.020, Color.black);
    SceneHelper.use.FadeInImage("white", 0.004);
    Sounds.use.FadeOut("BackgroundMusic", 0.04, 0);



    // yield WaitForSeconds(7);
    // SceneHelper.use.ShowText(Text1);
    yield WaitForSeconds(2);
    // SceneHelper.use.ShowText(Text2);
    yield WaitForSeconds(5);
    Destroy(GameObject.Find("BackgroundMusic"));
    Destroy(GameObject.Find("IntroMusic"));
    var scene = GetComponent(SceneLoader);
    // SceneHelper.use.HideText(Text1);
    // SceneHelper.use.HideText(Text2);
    scene.resetCheckPointLoader();
    yield WaitForSeconds(4);
    SceneManager.LoadScene("8 The End");

  }
}
