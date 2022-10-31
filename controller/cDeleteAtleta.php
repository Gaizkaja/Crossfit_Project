<?php

include_once( "../model/atletasModel.php" );

session_start();

$response[ 'error' ] = 'No eres admnistrador';

//Comprobamos si es administrador antes de hacer el Delete	
if( $_SESSION[ 'admin' ] == 1 ) {
	
	$data = json_decode( file_get_contents( "php://input" ), true );
	
	$idUsuario = $data[ 'idUsuario' ];
	
	$atleta = new atletasModel();
	$atleta->idUsuario = $idUsuario;

	$response[ 'error' ] = $atleta->delete();
}
echo json_encode( $response );

unset ( $atleta );
