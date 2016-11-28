#pragma strict

function fadeInRound() {
  for (var child : Transform in transform) {
    SceneHelper.use.PartiallyFadeInObject(child.gameObject, 0.04, 1);
  }
}

function fadeOutRound() {
  for (var child : Transform in transform) {
    SceneHelper.use.FadeOutGameObj(child.gameObject, 0.04);
  }
  yield WaitForSeconds(1);
  Destroy(this.gameObject);
}
