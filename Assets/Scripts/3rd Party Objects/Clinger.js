#pragma strict

public var Luna : GameObject;
public var previousX : float;
public var previousY : float;
public var previousRotation;

function Start () {
    previousRotation = this.transform.rotation.z;
    previousX = this.transform.position.x;
    previousY = this.transform.position.y;
}

function FixedUpdate () {
    Move();
    FaceLuna();
    PostUpdates();

}

function FaceLuna () {
    var deltaX = this.transform.position.x - previousX;
    var deltaY = this.transform.position.y - previousY;
    var lunaVector = this.transform.position - Luna.transform.position;
    Debug.Log(this.transform.rotation.z);
    Debug.Log(Mathf.Atan2(deltaY, deltaX) * 115);
    this.transform.eulerAngles.z = (Mathf.Atan2(-deltaY, -deltaX) * 115);
}

function Move () {
    this.transform.position.x = this.transform.position.x + ((Luna.transform.position.x - this.transform.position.x) / 100);
    this.transform.position.y = this.transform.position.y + ((Luna.transform.position.y - this.transform.position.y) / 100);
}

function PostUpdates () {
    previousX = this.transform.position.x;
    previousY = this.transform.position.y;
    previousRotation = this.transform.rotation.z;
}