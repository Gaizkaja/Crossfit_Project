<?php

include_once( "../model/comentariosModel.php" );

session_start();
$response['answer'] = 'Not Logged in';

if ( isset($_SESSION['id']) ) {
    $data = json_decode( file_get_contents( "php://input" ), true );

    $modeloComentario = new comentariosModel();

    $response = array();

    $modeloComentario->setIdUsuario( $data[ 'idUsuario' ] );
    $modeloComentario->setAsunto( $data[ 'asunto' ] );
    $modeloComentario->setTexto( strip_tags($data[ 'texto' ]) );

    $response[ 'answer' ] = $modeloComentario->insert();

    if ( $response['answer'] && !isLocal ) {
        $modeloComentario->sendMail( $data, "a_javier@fpzornotza.com" );
    }

}
echo json_encode( $response );

unset( $modeloComentario );
