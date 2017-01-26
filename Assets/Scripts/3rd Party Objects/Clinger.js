#pragma strict

public var Core : GameObject;
public var previousX;
public var previousY;
public var previousRotation;

public var active = false;
public var rate : float = 100;
public var rotationSpeed : float = 0.01;
public var rotationOnly : boolean = false;

private var clingerbody : Rigidbody2D;
private var musicPlaying : boolean = false;

private var luna : Transform;

function Start() {
  if (!Core) { Core = GameObject.Find("Luna"); }
  clingerbody = this.GetComponent(Rigidbody2D);
  luna = GameObject.Find("Luna").transform;
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

function Move() {
    if (rotationOnly) {
      var heading = luna.transform.position - this.transform.position;
      var distance = heading.magnitude;
      var angle = Mathf.Atan2(heading.y, heading.x) * Mathf.Rad2Deg;
      transform.rotation = Quaternion.Lerp(this.transform.rotation, Quaternion.AngleAxis(angle, Vector3.forward), Time.time * rotationSpeed);
    } else {
      clingerbody.velocity.x += (Core.transform.position.x - this.transform.position.x) / rate;
      clingerbody.velocity.y += (Core.transform.position.y - this.transform.position.y) / rate;
    }
}
