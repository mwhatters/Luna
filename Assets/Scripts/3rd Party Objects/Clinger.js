#pragma strict

public var Luna : GameObject;
public var previousX;
public var previousY;
public var previousRotation;

public var active = false;
public var rate : float = 100;

private var clingerbody : Rigidbody2D;
private var musicPlaying : boolean = false;

function Start() {
  if (!Luna) { Luna = GameObject.Find("Luna"); }
  clingerbody = this.GetComponent(Rigidbody2D);
}

function FixedUpdate () {
  if (active) {
    Move();
    if (!musicPlaying) {
      GetComponent(AudioSource).Play();
      musicPlaying = true;
    }
  } else {
    if (musicPlaying) {
      GetComponent(AudioSource).Stop();
      musicPlaying = false;
    }
  }
}

function Move () {
    clingerbody.velocity.x += (Luna.transform.position.x - this.transform.position.x) / rate;
    clingerbody.velocity.y += (Luna.transform.position.y - this.transform.position.y) / rate;
}
