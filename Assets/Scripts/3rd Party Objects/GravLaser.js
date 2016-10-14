#pragma strict
var lineRenderer : LineRenderer;
enum gravLaserDirection { Down, Right, Up, Left, ULeft, URight, DLeft, DRight, None };
public var laserDirection = gravLaserDirection.Down;
private var vectorDirection : Vector3;

public var textureSwitch : boolean = true;

public var laserTexture1 : Material;
public var laserTexture2 : Material;

public var laserWidth : float = 0.3;

private var laserEnabled : boolean = true;

function Start() {
  lineRenderer = gameObject.AddComponent(LineRenderer);
  lineRenderer.SetColors(Color.red, Color.blue);
  lineRenderer.SetWidth(laserWidth, laserWidth);
  lineRenderer.SetVertexCount(2);
  lineRenderer.sortingLayerName= "3PO's";
  lineRenderer.material = laserTexture1;
}

function FixedUpdate () {

  switch (laserDirection)
  {
    case gravLaserDirection.Down:
      vectorDirection = -transform.up;
      break;
    case gravLaserDirection.Up:
      vectorDirection = transform.up;
      break;
    case gravLaserDirection.Left:
      vectorDirection = -transform.right;
      break;
    case gravLaserDirection.Right:
      vectorDirection = transform.right;
      break;
    case gravLaserDirection.None:
      laserEnabled = false;
      break;
  }

  var hit : RaycastHit2D = Physics2D.Raycast(transform.position, vectorDirection);
  if (hit.collider != null && laserEnabled) {
    lineRenderer.SetPosition(0, transform.position);
    lineRenderer.SetPosition(1, hit.point);

    if (textureSwitch) {
      lineRenderer.material = laserTexture2;
      textureSwitch = false;
    } else {
      lineRenderer.material = laserTexture1;
      textureSwitch = true;
    }

    if (hit.collider.name == "Luna") {
      GameObject.Find("Luna").GetComponent(PlayerGameStates).Die();
    }
  } else {
    lineRenderer.SetPosition(0, transform.position);
    lineRenderer.SetPosition(1, transform.position);
  }
}
