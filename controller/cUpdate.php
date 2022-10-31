<?php

include_once( "../model/atletasModel.php" );

session_start();
//Comprobamos si es administrador antes de hacer el Update
$arr[ 'resultado' ] = 'No eres administrador';
if( $_SESSION[ 'admin' ] == 1 ) {
	$atleta = new atletasModel();
	
	$arr = array();
	
	$idAtleta = filter_input( INPUT_POST, 'idAtleta' );
	$fileBase64 = "";
	$nameUpdate = filter_input( INPUT_POST, 'nameUpdate' );
	$surnameUpdate = filter_input( INPUT_POST, 'surnameUpdate' );
	$emailUpdate = filter_input( INPUT_POST, 'emailUpdate' );
	$ageUpdatet = filter_input( INPUT_POST, 'ageUpdate' );
	$categoryUpdate = filter_input( INPUT_POST, 'categoryUpdate' );
	$trainerUpdate = filter_input( INPUT_POST, 'trainerUpdate' );
	//Para la foto:
	$filename = filter_input( INPUT_POST, 'filename' );
	$savedFileBase64 = filter_input( INPUT_POST, 'savedFileBase64' );
	$sexoUpdate = filter_input( INPUT_POST, 'sexoUpdate' );
	//Si ha cargado una nueva foto la guardamos en uploads, sino en $filename le pasamos la foto anterior
	if( $savedFileBase64 != "" ) {
		$fileBase64 = explode( ',', $savedFileBase64 )[ 1 ];
		$file = base64_decode( $fileBase64 );
		$writable_dir = '../uploads/';
		if( !is_dir( $writable_dir ) ) {
			mkdir( $writable_dir );
		}
		file_put_contents( $writable_dir . $filename, $file, LOCK_EX );
	}
	
	$atleta->setIdAtleta( $idAtleta );
	$atleta->setNombre( $nameUpdate );
	$atleta->setApellido( $surnameUpdate );
	$atleta->setCorreo( $emailUpdate );
	$atleta->setEdad( $ageUpdatet );
	$atleta->setIdCategoria( $categoryUpdate );
	$atleta->setIdEntrenador( $trainerUpdate );
	$atleta->setFoto( $filename );
	$atleta->setSexo( $sexoUpdate );
	$resultado = $atleta->update();
	
	$arr[ 'resultado' ] = $resultado;
	$arr[ 'fileBase64' ] = $fileBase64;
}
echo json_encode( $arr );

unset ( $atleta );
