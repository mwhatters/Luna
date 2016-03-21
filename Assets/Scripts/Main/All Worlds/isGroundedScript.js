#pragma strict
 var distToGround: float;
 
 function Start(){
   // get the distance to ground
//   var collider = GetComponent(Collider2D);
//   distToGround = collider.bounds.extents.y;
//   Debug.Log(collider.bounds.center);
 }
 
 function IsGrounded() {
//  	return Physics.Raycast(transform.position, -Vector2.up);
////   Debug.Log(test);
//   return test;
 }


// function FixedUpdate () {
// 	var hit : RaycastHit2D = Physics2D.Raycast(Vector2(transform.position.x, transform.position.y - 2), -Vector2.up);
// 	Debug.Log(hit.collider.name);
// 	Debug.Log(hit.distance);
//// 	if (hit.distance != null) {
//// 		Debug.Log(collider);
//// 	}
// }