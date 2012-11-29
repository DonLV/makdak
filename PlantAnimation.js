function Start () {									
	animation.Stop ();								
}
function OnTriggerEnter ( col : Collider ) {		
	animation.Play ( "wiggle" );					
}