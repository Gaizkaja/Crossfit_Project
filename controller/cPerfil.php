<?php
include_once( "../model/entrenadoresModel.php" );
include_once( "../model/atletasModel.php" );

session_start();

$id = $_SESSION[ 'id' ];

$response = array();

$modeloAtleta = new atletasModel();

if( $_SESSION[ 'isEntrenador' ] ) {
	
	$modeloEntrenador = new entrenadoresModel();
	$modeloEntrenador->setIdEntrenador( $id );
	$modeloEntrenador->idEntrenador();
	
	$modeloAtleta->setIdEntrenador( $id );
	
	$response[ 'answer' ] = $modeloEntrenador;
	$response['atletas'] = $modeloAtleta->atletasEntrenador();
	$response[ 'isEntrenador' ] = true;
} else {
	
	$modeloAtleta->setIdAtleta( $id );
	$modeloAtleta->getById();

	
	$response[ 'answer' ] = $modeloAtleta;
	$response[ 'isEntrenador' ] = false;
}

$modeloAtleta->cleanOutput( $response );

echo json_encode( $response );