<?php

include_once( '../model/comentariosModel.php' );

$data = json_decode(  file_get_contents('php://input'), true);

$id = $data[ 'idComentario' ];

$modeloComentario = new comentariosModel();
$modeloComentario->setIdComentario( $id );

$response[ 'answer' ] = false;

if ( $modeloComentario->deleteById() ) $response[ 'answer' ] = true;

echo json_encode( $response );
unset( $modeloComentario );