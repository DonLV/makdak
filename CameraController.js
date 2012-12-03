var target 						: Transform;							
var targetHeight 				: float 		= 1.0;					
var collisionLayers   			: LayerMask	 	= -1;					
var distance 					: float 		= 8.0;					
var xSpeed 						: float 		= 250.0;				
var ySpeed 						: float 		= 120.0;				
var yMinLimit 					: float 		= -12;					
var yMaxLimit 					: float 		= 80;					
var rotationSpeed 				: float 		= 3.0;					
var zoomMinLimit 				: float 		= 2;					
var zoomMaxLimit 				: float 		= 6;					
var zoomDampening 				: float 		= 5.0; 					
var offsetFromWall 				: float 		= 0.1;					

private var x 					: float 		= 0.0;					
private var y 					: float 		= 0.0;					
private var currentDistance   	: float; 								
private var desiredDistance   	: float;								
private var correctedDistance 	: float; 								


function Start 		() {																					// initialize 
    var angles : Vector2 = transform.eulerAngles;															// set vector 2 values from this transform (camera)
    x = angles.y;																							
    y = angles.x;																							
	
    currentDistance   = distance; 																			// set default distance
    desiredDistance   = distance; 																			
    correctedDistance = distance; 																			
}
function LateUpdate () {																					
	var vTargetOffset : Vector3;																			// store vertical target offset amount (x,y,z)

	x += Input.GetAxis("CameraX") * xSpeed * 0.02;															// horizontal
	y -= Input.GetAxis("CameraY") * ySpeed * 0.02;															// vertical
	
	y = ClampAngle(y, yMinLimit, yMaxLimit);																// clamp the vertical movement between a min and max

	var rotation = Quaternion.Slerp(transform.rotation, Quaternion.Euler(y, x, 0), Time.deltaTime * 3);		
	
	vTargetOffset = new Vector3 (0, -targetHeight, 0);														
	position = target.position - (rotation * Vector3.forward * desiredDistance + vTargetOffset); 			// set camera position and angle based on rotation, wanted distance and target offset amount

	var collisionHit : RaycastHit; 																			// set a ray cast
	var trueTargetPosition :Vector3 = new Vector3 (target.position.x, target.position.y + targetHeight, target.position.z);		// check for collision using the true target's desired registration point as set by user using height  

	var isCorrected : boolean = false; 																		
	if (Physics.Linecast (trueTargetPosition, position, collisionHit, collisionLayers.value)) 				
	{ 
		correctedDistance = Vector3.Distance (trueTargetPosition, collisionHit.point) - offsetFromWall;		
		isCorrected = true;																				
	}	

	if ( !isCorrected || correctedDistance > currentDistance )												// check if distance has not been corrected or greater than current distance
	{
		currentDistance = Mathf.Lerp (currentDistance, correctedDistance, Time.deltaTime * zoomDampening);	// for smoothing, lerp distance only if either distance wasn't corrected, or correctedDistance is more than currentDistance 
	}
	else 																									// else there was a collision (linecast) and we need to move the camera to the corrected amount
	{
		isCorrected = false;																				// set back
		currentDistance = correctedDistance;																
	}
	currentDistance = Mathf.Clamp (currentDistance, zoomMinLimit, zoomMaxLimit); 							// keep within legal limits
	position = target.position - (rotation * Vector3.forward * currentDistance + vTargetOffset); 			// recalculate position based on the new currentDistance 

	transform.rotation = rotation;																			// set camera rotation to current rotation amount
	transform.position = position;																			
}
static function ClampAngle (angle : float, min : float, max : float) {										// limit angle amount for vertical rotation
    if (angle < -360)																						
    {
        angle += 360;																					
    }
    if (angle > 360)																						
    {
        angle -= 360;																						
    }
    return Mathf.Clamp (angle, min, max);																	// return the min max amount for angle
}