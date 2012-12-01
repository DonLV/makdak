var skinMeshRenderer				: SkinnedMeshRenderer;							
var cameraObject					: Camera;										
var colliderAttack					: GameObject;									
var colliderHurt					: GameObject;									
var canWalk							: boolean 			= true;						
var canJog							: boolean 			= true;						
var canRun							: boolean 			= true;						
var canSprint						: boolean 			= true;						
var canBoost						: boolean 			= true;
var canJumpAll						: boolean			= true;						
var canJump_1						: boolean			= true;						
var canJump_2						: boolean			= true;						
var canJump_3						: boolean			= true;						
var canJumpFromAir 					: boolean 			= true;
var canJumpFromCrouch				: boolean			= true;						
var canJumpFromObject 				: boolean			= true;						
var canControlDecent				: boolean			= true;						
var canCrouch						: boolean			= true;						
var canCrouchHoldKeyDown			: boolean 			= true;						
var canAngleSlide					: boolean 			= true;						
var canIdleRotate					: boolean			= true;						 
var canJumpFromPad					: boolean			= true;						
var canFall							: boolean			= true;						
var canLand							: boolean			= true;						
var canHurt							: boolean			= true;						
var canAttack						: boolean			= true;						
var canKillzone						: boolean			= true;						
var canGrab							: boolean			= true;						
var canPush							: boolean			= true;						
var autoPush						: boolean			= true;						
var keyboardControls 				: boolean 			= false;				

var speedIdleMax					: float 			= 0.2;						 
var speedIdleRotate					: float 			= 1.2;						
var speedWalk						: float				= 3.0;						
var speedJog						: float				= 5.0;						
var speedRun						: float				= 8.0;						
var speedSprint						: float				= 12.0;						
var speedBoost						: float 			= 20.0;
var speedSlide						: float 			= 3.0;						
var speedPush						: float				= 1.5;						
var speedGrab						: float				= 2.0;						
var speedJumpFromCrouch 			: float				= 3.0;						
var speedJumpFromObject 			: float				= 10.0;						
var speedCrouch						: float 			= 0.0;						
var speedInAir						: float				= 1.0;						
var speedSmoothing					: float				= 10.0;						
var speedRotation					: float				= 50.0;						

var currentSpeed					: float 			= 10.0;						
var currentJumpHeight				: float 			= 0.0;						

var jump_1							: float				= 8.0;						
var jump_2							: float				= 10.0;						
var jump_3							: float				= 15.0;						

var jumpFromAir 					: float 			= 15.0;
var jumpFromCrouch					: float 			= 14.0;						
var jumpFromObject					: float 			= 8.0;						
var jumpFromObjectTag 				: String 			= "wall";					

var jumpComboTime					: float 			= 1.5;						
var jumpDelayTime 					: float 			= 0.5;						

var crouchControllerHeight  		: float 			= 1.0;						
var crouchControllerCenterY 		: float 			= 0.5;						 

var slideTag 						: String			= "slide";					
var slideThreshold 					: float 			= 0.88;						
var slideControllableSpeed 			: float 			= 5.0;						

var pushPower 						: float 			= 0.5;						
var pushLayers  					: LayerMask 		= -1;						

var gravity							: float				= 20.0;						 
var health 							: int				= 100;						

var aniIdle_1 						: AnimationClip;								
var aniIdle_2						: AnimationClip;							
var aniWalk 						: AnimationClip;								
var aniJog 							: AnimationClip;								
var aniRun 							: AnimationClip;								
var aniSprint 						: AnimationClip;								
var aniCrouchIdle					: AnimationClip;								
var aniLeanLeft						: AnimationClip;								
var aniLeanRight					: AnimationClip;								
var aniJumpFromCrouch				: AnimationClip;								
var aniJumpFromObject				: AnimationClip;								
var aniJump_1 						: AnimationClip;								
var aniJump_2 						: AnimationClip;								
var aniJump_3 						: AnimationClip;								
var aniJumpFall						: AnimationClip;								
var aniJumpLand						: AnimationClip;								
var aniSlide 						: AnimationClip;								
var aniGrab		 					: AnimationClip;								
var aniGrabIdle	 					: AnimationClip;								
var aniPush		 					: AnimationClip;								
var aniLand		 					: AnimationClip;								

var DebugMode						: boolean			= true;						

@HideInInspector																	
var characterController 			: CharacterController;							
@HideInInspector 
static var moveSpeed				: float 			= 0.0;						

private var moveDirection			: Vector3			= Vector3.zero;				
private var inAirVelocity			: Vector3			= Vector3.zero;				 

private var smoothDirection			: float 			= 10.0;						
private var jumpRepeatTime			: float				= 0.15;						
private var jumpFromObjectDelay 	: float				= 0.15;					
private var jumpDelay				: float				= 0.15;					
private var groundedDelay			: float				= 0.15;						
private var cameraTimeDelay			: float				= 0.0;					
private var sprintLastTime			: float				= 0.0;						
private var speedReset				: float				= 0.0;						
private var verticalSpeed			: float				= 0.0;						
private var walkTimeStart			: float 			= 0.0;						

private var isControllable			: boolean			= true;						
private var isMoving				: boolean			= false; 					
static  var isCrouching				: boolean 			= false;					
private var isJumping_1				: boolean 			= true;						
private var isJumping_2 			: boolean 			= false;					
private var isJumping_3 			: boolean			= false;					
private var isLanding 				: boolean			= false;					
private var isKilled				: boolean			= false;					
private var curTime					: float 			= 0.0;						
private var showPlayer				: boolean   		= true;						
private var resetCharController		: boolean			= false;					
private var objectJumpContactNormal : Vector3;										
private var touchObjectJumpTime 	: float 			= -1.0;						
private var wallJumpTimeout 		: float 			= 0.5;						
private var jumpableObject			: boolean			= false;					
private var controllerHeightDefault : float;										
private var controllerCenterYDefault: float;										
private var slideDirection 			: Vector3;										
private var collisionFlags			: CollisionFlags;								
private var coin 					: int 				= 0;							
private var key  					: int 				= 0;						
private var jumpingFromPad 			: boolean 			= false;					
private var playerStartPosition		: Vector3;										
private var playerStartRotation		: Quaternion;									
private var enemyHit 				: boolean;										
private var enemyHurt				: GameObject;									
private var resetHealth				: int;											
private var hitDirection 			: Vector3 			= Vector3(0,10,-2.5);		
private var pushObject				: Transform 		= null;																				
private var grabObject				: Transform 		= null;																						
private var tempSpeed 				: float 			= 0.0;						

@script RequireComponent ( CharacterController )									

function Reset					() {												
	if (!isControllable)
	{
		Input.ResetInputAxes();														
	}
}
function Awake 					() {												
	moveDirection = transform.TransformDirection ( Vector3.forward ); 				
}
function Start 					() {												
	characterController = GetComponent ( CharacterController );						
	characterController.tag = "Player";												
	controllerHeightDefault = characterController.height;							
	controllerCenterYDefault = characterController.center.y;						
	animation.Stop ();																
	AnimationClipCheck ();															
	playerStartPosition = transform.position;										
	playerStartRotation = Quaternion.LookRotation (transform.position);				
	resetHealth = health;															
	tempSpeed = currentSpeed;														
}
function UpdateMoveDirection 	() {														
	var forward : Vector3 = cameraObject.transform.TransformDirection ( Vector3.forward );
	forward.y = 0;																	
	forward = forward.normalized;													
	var right : Vector3 = Vector3( forward.z, 0, -forward.x );						

	var vertical : float   = Input.GetAxisRaw ( "Vertical"   );						
	var horizontal : float = Input.GetAxisRaw ( "Horizontal" );						

	var targetDirection : Vector3 = horizontal * right + vertical * forward;		

	if ( IsGrounded () )															
	{
		if ( targetDirection != Vector3.zero )										
		{
			moveDirection = Vector3.Lerp ( moveDirection, targetDirection, smoothDirection * Time.deltaTime );
			moveDirection = moveDirection.normalized;								
		}	
		var currentSmooth : float = speedSmoothing * Time.deltaTime;				
		
		targetSpeed = Mathf.Min ( targetDirection.magnitude, 1.0 ); 				
		moveSpeed  = Mathf.Lerp ( moveSpeed, targetSpeed * targetDirection.magnitude * currentSpeed, currentSmooth );	

		jumpableObject = false;														
		
		Idle   			();															// check
		Crouch 			();															
		Walk   			();															
		Jog    			();															
		Run    			();															
		Sprint 			();															
		Boost     		();
		Jump_1   		();															
		Jump_2   		();															
		Jump_3		   	();															
		JumpFromCrouch 	();															
		AngleSlide		();															
		IdleRotate		();															
		JumpPad			();															
		Hurt			();															
		Attack			();															
		Grab 			();															
		Push 			();															
		KeyboardMovementSpeed ();
	}
	else																			// if player is in air 
	{										
		inAirVelocity += targetDirection.normalized * Time.deltaTime * speedInAir;	// if in air, move player down based on velocity, direction, time and speed
		JumpFromAir ();
		JumpFromObject ();															// check for player jumping from objects tagged 'wall'
		Fall ();																	// check if player is falling from jump		
	}
	Killzone ();																	// check for player triggering killzone box
}
function Update 				() {												// loop for controller
	if ( isControllable )															// if player controllable, then move character
	{
		SetGravity ();																// pulls character to the ground 'if' in air
		UpdateMoveDirection ();														// motor, direction and ani for player movement

		var movement : Vector3 = moveDirection * moveSpeed + Vector3 ( 0, verticalSpeed, 0 ) + inAirVelocity; // stores direction with speed (h,v)
		movement *= Time.deltaTime;													// set movement to delta time for consistent speed
		
		objectJumpContactNormal = Vector3.zero;										// reset vectors back to zero
		
		collisionFlags = characterController.Move ( movement );						// move the character controller	
		
		if ( IsGrounded () ) 														// character is on the ground (set rotation, translation, direction, speed)
		{
			transform.rotation = Quaternion.LookRotation ( moveDirection );			// set rotation to the moveDirection
			inAirVelocity = Vector3(0,-0.1,0);										// turn off check on velocity, set to zero/// current set to -.1 because zero won't keep him on isGrounded true. goes back and forth			
			if ( moveSpeed < 0.15 ) 												// quick check on movespeed and turn it off (0), if it's
				moveSpeed = 0;														// less than .15
		}
		else 																		// player is in the air
		{
			transform.rotation = Quaternion.LookRotation ( moveDirection );			// quick adjustment for jumping off wall, turn player around in air
		}
	}
	ExampleShowHidePlayer ();															
}

function Idle 					() {												
	if ( moveSpeed <= speedIdleMax && !isCrouching )								// check that speed is 0 for idle range
	{
		animation.CrossFade ( aniIdle_1.name );										
											
	}	
}
function Walk 					() {												
	if ( canWalk )
	{
		if ( moveSpeed > speedIdleMax && moveSpeed < speedJog )						
		{
			animation.CrossFade ( aniWalk.name );									
										
		}
	}
}
function Jog	 				() {												
	if ( canJog )
	{
		if ( moveSpeed > speedWalk)					 	
		{
			animation.CrossFade ( aniJog.name );									
											
		}
	}
}
function Run 					() {												
	if ( canRun )
	{
		if ( moveSpeed > speedJog)						
		{
			animation.CrossFade ( aniRun.name );									
											
		}
	}
}
function Sprint 				() {												
	if (canSprint)
	{
		if ( moveSpeed > speedRun && moveSpeed <= speedSprint && Input.GetButton ("Fire1") )
		{
			animation.CrossFade ( aniSprint.name );									
	
		}	
	}
}
function Boost 					() {																						
	if (canBoost)
	{
	if ( moveSpeed > speedJog && moveSpeed < speedSprint && Input.GetKey ( "g" ))
	{
	moveSpeed = speedBoost;

	}
	}
} 
function Jump_1 				() {												
	if ( canJumpAll )
	{
		if ( !canJump_2 )															
		{
			isJumping_1 = true;														
			isJumping_2 = false;													
		}
		if ( canJump_1 && !isCrouching && !ControllerColliderGrab.isGrabbing )		
		{
			if ( Input.GetButtonDown ( "Jump" ) && isJumping_1 && !isJumping_2 && !isJumping_3 && curTime + jumpDelayTime < Time.time )
			{
				isJumping_1 = false;												
				curTime = Time.time;												
				animation.CrossFade ( aniJump_1.name );								
				currentJumpHeight = jump_1;											
				inAirVelocity.y = currentJumpHeight;								
									
			}	
			else if ( IsGrounded () && !isJumping_1 && !isJumping_2 && !isJumping_3 )	
			{
								
				yield;
				isJumping_1 = false;												
				isJumping_2 = true;													
			}
			else if ( ControllerColliderHurt.enemyHit || ControllerColliderAttack.isAttacking )
			{
				inAirVelocity.y = 0;
				isJumping_1 = false;
			}
		}
	}
}
function Jump_2					() {												
	if( canJumpAll )
	{
		if( canJump_2)
		{
			if( Input.GetButtonDown ( "Jump" ) && !isJumping_1 && isJumping_2 && !isJumping_3 && Time.time < (curTime + jumpComboTime))
			{
			isJumping_2 = false;
			curTime = Time.time;
			animation.CrossFade (aniJump_2.name);
			currentJumpHeight = jump_2;
			inAirVelocity.y = currentJumpHeight;

			isJumping_3 = true; 
			}			
			if(!isJumping_1 && isJumping_2 && !isJumping_3 && Time.time > (curTime + jumpComboTime))
			{
			isJumping_2 = false;
			isJumping_1 = true;
			curTime = Time.time;

			}
		}
	}
}
function Jump_3					() {												
if(canJumpAll)
{
	if(!canJump_3 && isJumping_3)
	{
	isJumpint_1 = true;
	isJumping_3 = false;
	}
	if(canJump_3)
	{
		if(Input.GetButtonDown ( "Jump" ) && !isJumping_1 && !isJumping_2 && isJumping_3 && Time.time < (curTime + jumpComboTime))
		{
		isJumping_3 = false;
		isJumping_1 = true;
		curTime = Time.time;
		animation.CrossFade (aniJump_3.name);
		currentJumpHeight = jump_3;
		inAirVelocity.y = currentJumpHeight;

		}			
		if(!isJumping_1 && !isJumping_2 && isJumping_3 && Time.time > (curTime + jumpComboTime))
			{
		isJumping_3 = false;
		isJumping_1 = true;
		curTime = Time.time;

		
		}
	}
}
}
function JumpFromAir			() {
if ( canJumpAll )
 {
	if( canJumpFromAir )
	{
if ( !IsGrounded () )
      {
	if ( Input.GetButtonDown ("Jump") )
	      {
	currentJumpHeight = jumpFromAir;
	inAirVelocity.y = currentJumpHeight;
	      }
      }	
    }
 }
}
function JumpFromCrouch			() {	
																						
}
function JumpFromObject			() {												

}
function JumpPad				() {												

}
function AngleSlide				() {												

}
function IdleRotate				() {												

}
function Crouch					() {												

}
function Fall					() {												

}
function Attack					() {												
	if(canAttack)
	{
	if(colliderAttack == null)
	{

		return;
	} 
	if(ControllerColliderAttack.isAttacking)
	{
	ControllerColliderAttack.isAttacking = false;
	inAirVelocity.y = 10;
	animation.Play (aniJump_2.name);

	
	}
	}
}
function Hurt					() {												
	if(colliderHurt == null)
	{

	return;
	}
	if( ControllerColliderHurt.enemyHit)
	{
	ControllerColliderHurt.enemyHit = false;
	inAirVelocity = transform.InverseTransformDirection (hitDirection);
	animation.Play (aniJumpLand.name);
	health -= ControllerColliderHurt.damageAmount;
	yield;
	if(health <=0)
	{
	isKilled = true;

	}

	}
	}

function Killzone				() {												
	if ( canKillzone )																// toggle killzone areas
	{
		if ( isKilled ) 															
		{
			isKilled = false;														
			HidePlayer ();															
			yield WaitForSeconds (1);												
			animation.Stop();														
			transform.rotation = playerStartRotation;								// set rotation just in case
			transform.position = playerStartPosition;								
			moveDirection = Vector3(0,0,.1);										// set player move speed to almost zero (when he comes back in we want him stopped)- almost zero throws error in update
			yield WaitForSeconds (1);												
			animation.Play ( aniIdle_1.name );										
											
			isJumping_1 = true;														// reset jumping(498,499)
			isJumping_2 = false;													
			isJumping_3 = false;													
			health = resetHealth;													
			ShowPlayer ();																		
		}
	}
}
function Push 					() {												

}
function Grab					() {
												
}
function ShowPlayer				() {												

}
function HidePlayer				() {											

}
function KeyboardMovementSpeed 	() {												

}

function IsGrounded 			() {												// check if player is touching the ground or a collision flag
return ( collisionFlags & CollisionFlags.CollidedBelow ) != 0;					// if isGround not equal to 0 if it doesn't equal 0
}
function SetGravity				() {												// sets gravity to 0 for ground and subtracts if in air
	if ( IsGrounded () )
		verticalSpeed = 0.0;														// stop subtracting, if player on ground set to 0
	else
		verticalSpeed -= gravity * Time.deltaTime;									// if character in air, begin moving downward
}
function Message ( text : String ) {												

}
function Message ( text : float )  {												

}
function Message ( text : int )    {												

}
function AnimationClipCheck 	() {												

}
function ExampleShowHidePlayer 	() {												 

}
function OnTriggerEnter ( other : Collider ) {										
	if(other.tag == "coin")
	{
	coin += 1;
	Destroy (other.gameObject);
;
	}
	if(other.tag == "key")
	{
	key += 1;
	Destroy (other.gameObject);

	}
	if(other.tag == "killzone")
	{
	isKilled = true;
	
	}
}
function OnTriggerStay  ( other : Collider ) {										

}
function OnTriggerExit  ( other : Collider ) {										

}
function OnControllerColliderHit ( hit : ControllerColliderHit ) {					

}
function OnGUI 					() {												
	GUI.Box   ( Rect ( 0,0, 100, 60  ), "" );										
	GUI.Label ( Rect ( 10,5,100,100  ), "Health: " + health );						
	GUI.Label ( Rect ( 10,20,100,100 ), "Coins: "  + coin   );						
	GUI.Label ( Rect ( 10,35,100,100 ), "Keys: "   + key    );						
}