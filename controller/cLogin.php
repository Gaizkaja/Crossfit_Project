<?php
	
	include_once( '../model/usuariosModel.php' );
	
	$data = json_decode( file_get_contents( 'php://input' ), true );
	
	$username = $data[ 'username' ];
	$password = $data[ 'password' ];
	
	$modeloUsuario = new usuariosModel();
	
	$modeloUsuario->setUsuario( $username );
	$modeloUsuario->setPassword( $password );
	
	$verificationResult = $modeloUsuario->verifyUser();
	
	$response = array();
	
	if ( $verificationResult ) {
		$response[ 'answer' ] = $modeloUsuario;
		$modeloUsuario->cleanOutput( $response );
		
		session_start();
		$_SESSION[ 'id' ] = $modeloUsuario->getIdUsuario();
		$_SESSION[ 'admin' ] = $modeloUsuario->getAdmin();
		$_SESSION[ 'isEntrenador' ] = $modeloUsuario->isEntrenador(); // El ID se rellena al verificar correctamente el usuario / contraseña
		
	} else {
		if ( $verificationResult === null ) $response[ 'answer' ] = 'Usuario no encontrado!';
		else $response[ 'answer' ] = 'Contaseña incorrecta!';
	}
	
	echo json_encode( $response );





