var target 							: Transform;									

var attackTurnTime 					: float 			= 0.7;						
var rotateSpeed 					: float 			= 120.0;					
var attackDistance 					: float 			= 17.0;						
var extraRunTime 					: float 			= 2.0;						

var attackSpeed 					: float 			= 5.0;						
var attackRotateSpeed 				: float 			= 20.0;						

var idleTime 						: float 			= 1.6;						
var damageAmount 					: int 				= 25;
var hitPosition 					: Vector3 			= new Vector3 (0.4, 0, 0.7);
var hitRadius 						: float 			= 1.1;						

var killParticle 					: Transform;									
var coin							: Transform;									

@HideInInspector																	
var hitDirection 					: Vector3;										
@HideInInspector																	
var playerHit 						: boolean 			= false;					

private var attackAngle 			: float 			= 10.0;						
private var isAttacking 			: boolean 			= false;					
private var lastHitTime 			: float 			= 0.0;						
private var offset					: Vector3;										 
private var characterController 	: CharacterController;							

characterController = GetComponent ( CharacterController );							

function Start 					() {												
	if ( !target )																	
		target = GameObject.FindWithTag ( "Player" ).transform;						
	
	animation.wrapMode 					 = WrapMode.Loop;							
	animation.Play ( "idle" );														
	animation [ "targetEnemy" ].wrapMode = WrapMode.Once;							
	animation [ "walk" ].wrapMode 		 = WrapMode.Once;							
	animation [ "die" ].wrapMode  		 = WrapMode.Once;							
	animation [ "die" ].layer 			 = 1;										
	
	yield WaitForSeconds ( Random.value );											
		
	while ( true )																	
	{	
		yield Idle ();																	
		yield Attack ();															
	}
}
function Idle 					() {												

	yield WaitForSeconds ( idleTime );												

	while ( true )																	
	{
		characterController.SimpleMove ( Vector3.zero );							
		yield WaitForSeconds ( 0.2 );
		
		offset = transform.position - target.position;								
			
		if ( offset.magnitude < attackDistance )									
			return;																	
	}
} 
function Attack 				() {												
	isAttacking = true;																

	animation.Play ( "run" );														
	
	var angle : float = 180.0;														
	var time  : float = 0.0;														

	var direction : Vector3;														
	
	while ( angle > 5 || time < attackTurnTime )									
	{	
		time += Time.deltaTime;														
		angle = Mathf.Abs ( RotateTowardsPosition ( target.position, rotateSpeed ) ); 
		move  = Mathf.Clamp01 ( ( 90 - angle ) / 90 );								
		animation["run"].weight = animation [ "run" ].speed = move;					
		direction = transform.TransformDirection ( Vector3.forward * attackSpeed * move );	
		characterController.SimpleMove ( direction );									
		yield;																		
	}	
	var timer : float = 0.0;														
	var lostSight : boolean = false;												

	while ( timer < extraRunTime )													
	{
		angle = RotateTowardsPosition ( target.position, attackRotateSpeed );		

		if ( Mathf.Abs ( angle ) > 40 )												
			lostSight = true;														

		if ( lostSight )															
			timer += Time.deltaTime;												
			
		direction = transform.TransformDirection ( Vector3.forward * attackSpeed );	
		characterController.SimpleMove ( direction );								 

		var pos = transform.TransformPoint( hitPosition );							
		if ( Time.time > lastHitTime + 0.3 && ( pos - target.position ).magnitude < hitRadius )	
		{			
			lastHitTime = Time.time;												
		}
		if ( characterController.velocity.magnitude < attackSpeed * 0.3 ) 			
			break;
		yield;																		
	}
	animation.CrossFade ( "idle" );													
}
function ApplyDamage 			() {												// play death animation
	animation.CrossFade ( "die" );													
	yield WaitForSeconds (.65);														// wait before instantiating
	Instantiate ( killParticle, transform.position, Quaternion.identity );			
	Instantiate ( coin, transform.position, Quaternion.identity );					
	Destroy ( gameObject, .1 );														// destroy enemy
}
function OnDrawGizmosSelected 	() {												

}
function RotateTowardsPosition ( targetPos : Vector3, rotateSpeed : float ) : float{// rotate towards player 	
	var relative : Vector3 = transform.InverseTransformPoint ( targetPos );			// compute relative point and get the angle towards it
	var angle : float = Mathf.Atan2 ( relative.x, relative.z ) * Mathf.Rad2Deg;		
	var maxRotation : float = rotateSpeed * Time.deltaTime;							
	var clampedAngle : float = Mathf.Clamp ( angle, -maxRotation, maxRotation );	// clamp angle between min/max
	transform.Rotate ( 0, clampedAngle, 0 );										 
	return angle;																	
}
function OnTriggerEnter ( other : Collider ) {										
	if ( other.tag == "Player" )													
	{
		ControllerColliderAttack.isAttacking = true;	
	}
}