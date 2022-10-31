<?php
	
	include_once( "../model/atletasModel.php" );
	
	session_start();
	$arr[ 'resultado' ]='No eres administrador';
	//Comprobamos si es administrador antes de hacer el Insert
	if ( $_SESSION['admin'] == 1 ) {
		$aleta = new atletasModel();

		$fileBase64="";
		$nameInsert = filter_input( INPUT_POST, 'nameInsert' );
		$surnameInsert = filter_input( INPUT_POST, 'surnameInsert' );
		$emailInsert = filter_input( INPUT_POST, 'emailInsert' );
		$ageInsert = filter_input( INPUT_POST, 'ageInsert' );
		$categoryInsert = filter_input( INPUT_POST, 'categoryInsert' );
		$trainerInsert = filter_input( INPUT_POST, 'trainerInsert' );
		//Para la foto:
		$filename = filter_input( INPUT_POST, 'filename' );
		$savedFileBase64 = filter_input( INPUT_POST, 'savedFileBase64' );
		$sexoInsert = filter_input( INPUT_POST, 'sexoInsert' );
		//Si no trae foto, le insertamos por defecto una
		if ( $filename == "" ) {
			$filename = "default.jpg";
		}else{
			//Si trae, la guardamos en la carpeta uploads.
			$fileBase64 = explode( ',', $savedFileBase64 )[ 1 ]; 
			$file = base64_decode( $fileBase64 );
			$writable_dir = '../uploads/';
			if ( !is_dir( $writable_dir ) ) {
				mkdir( $writable_dir );
			}
			file_put_contents( $writable_dir . $filename, $file, LOCK_EX );
		}
		$aleta->setNombre( $nameInsert );
		$aleta->setApellido( $surnameInsert );
		$aleta->setCorreo( $emailInsert );
		$aleta->setEdad( $ageInsert );
		$aleta->setIdCategoria( $categoryInsert );
		$aleta->setIdEntrenador( $trainerInsert );
		$aleta->setFoto( $filename );
		$aleta->setSexo( $sexoInsert );
		$resultado = $aleta->insert();

		$arr[ 'resultado' ] = $resultado;
		$arr[ 'fileBase64' ] = $fileBase64;
	}

//echo json_encode($arr);
	echo json_encode($arr);
	unset ( $aleta );