<?php

/**
 * Class comentariosClass
 */
class comentariosClass {
	
	// ATRIBUTOS
	
	/**
	 * @var int ID del comentario
	 */
	public $idComentario;
	/**
	 * @var int ID del usuario que ha públicado el comentario
	 */
	public $idUsuario;
	/**
	 * @var string Asunto del comentario
	 */
	public $asunto;
	/**
	 * @var string Texto del comentario
	 */
	public $texto;
	
	// MÉTODOS
	
	/**Obtener ID del comentario
	 * @return int
	 */
	public function getIdComentario() {
		return $this->idComentario;
	}
	
	/**Obtener ID del usuario que ha públicado el comentario
	 * @return int
	 */
	public function getIdUsuario() {
		return $this->idUsuario;
	}
	
	/**Obtener asunto del comentario
	 * @return string
	 */
	public function getAsunto() {
		return $this->asunto;
	}
	
	/**Obtener tecto del comentario
	 * @return string
	 */
	public function getTexto() {
		return $this->texto;
	}
	
	/**Establecer ID del comentario
	 * @param $idComentario int
	 */
	public function setIdComentario( $idComentario ) {
		$this->idComentario = $idComentario;
	}
	
	/**Establecer ID del usuario que ha públicado el comentario
	 * @param $idUsuario int
	 */
	public function setIdUsuario( $idUsuario ) {
		$this->idUsuario = $idUsuario;
	}
	
	/**Establecer asunto del comentario
	 * @param $asunto string
	 */
	public function setAsunto( $asunto ) {
		$this->asunto = $asunto;
	}
	
	/**Establecer texto del comentario
	 * @param $texto string
	 */
	public function setTexto( $texto ) {
		$this->texto = $texto;
	}
}