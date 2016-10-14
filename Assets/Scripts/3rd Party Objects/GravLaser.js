#pragma strict
var lineRenderer : LineRenderer;
enum gravLaserDirection { Down, Right, Up, Left, ULeft, URight, DLeft, DRight };
public var laserDirection = gravLaserDirection.Down;
private var vectorDirection : Vector3;

public var laserTexture : Material;
public var laserWidth : float = 0.3;

function Start() {
  lineRenderer = gameObject.AddComponent(LineRenderer);
  lineRenderer.SetColors(Color.red, Color.blue);
  lineRenderer.SetWidth(laserWidth, laserWidth);
  lineRenderer.SetVertexCount(2);
  lineRenderer.sortingLayerName= "3PO's";
  lineRenderer.material = laserTexture;

  Debug.Log(Vector3(1.0,1.0,0));
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
  }

  var hit : RaycastHit2D = Physics2D.Raycast(transform.position, vectorDirection);
  if (hit.collider != null) {
    lineRenderer.SetPosition(0, transform.position);
    lineRenderer.SetPosition(1, hit.point);

    if (hit.collider.name == "Luna") {
      GameObject.Find("Luna").GetComponent(PlayerGameStates).Die();
    }
  }
}
