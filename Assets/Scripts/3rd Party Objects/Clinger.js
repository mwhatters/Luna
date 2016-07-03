#pragma strict

public var Luna : GameObject;
public var previousX;
public var previousY;
public var previousRotation;

function Start () {
    previousRotation = this.transform.rotation.z;
    previousX = this.transform.position.x;
    previousY = this.transform.position.y;
}

function Update () {
    var lunaVector = this.transform.position - Luna.transform.position;
    var rotation = Quaternion.LookRotation(lunaVector);
    this.transform.rotation = rotation;
}

function FixedUpdate () {
    Move();
    //AutoRotate();
    //FaceLuna();
    PostUpdates();

}

function FaceLuna () {
//    var deltaX = this.transform.position.x - previousX;
//    var deltaY = this.transform.position.y - previousY;
}

function AutoRotate () {
    this.transform.rotation.z = Luna.transform.rotation.z;
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