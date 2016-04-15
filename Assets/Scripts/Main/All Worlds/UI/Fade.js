#pragma strict

// do not use

function Start() {
  this.GetComponent(CanvasRenderer).SetAlpha(1.0);
}

function Update() {

  if (Input.GetKeyDown(KeyCode.UpArrow)) {
    // FadeOut();
  }

}

function FadeOut() {
  // StartCoroutine(DoFade());
}

// function DoFade() {
//   var canvasGroup = GetComponent(Image);
//   while (canvasGroup.alpha > 0) {
//     canvasGroup.alpha -= Time.deltaTime/2;
//     yield;
//   }
//   canvasGroup.interactable = false;
// }
