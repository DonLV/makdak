static var enemyHit 	: boolean = false;											// toggle for attack mode
static var damageAmount : int;														// hold player damage amount

function OnTriggerEnter ( other : Collider ) {										// trigger events for collider on foot
	if ( other.tag == "enemy" ) 													// if collider equals enemy object
	{
		enemyHit = true;															// enable attacking 
		damageAmount = other.GetComponent ( EnemyController ).damageAmount;			// take damage to player health
		yield WaitForSeconds ( 1 );													// wait a second before checking for another hit
	}
}
function OnTriggerExit  ( other : Collider ) {										// check for collider exiting
	if ( other.tag == "enemy" )														// if tag enemey exits
	{
		enemyHit = false;															// disable enemy hit ability
	}
}
