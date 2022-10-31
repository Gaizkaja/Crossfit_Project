<?php

/**
 * Class usuariosClass
 */
	class usuariosClass {
		
		// ATRIBUTOS
		
		/**
		 * @var int ID del usuario
		 */
		public $idUsuario;
		/**
		 * @var string Nombre del usuario
		 */
		public $nombre;
		/**
		 * @var string Apellido del usuario
		 */
		public $apellido;
		/**
		 * @var string Usuario del usuario
		 */
		public $usuario;
		/**
		 * @var string Contraseña del usuario
		 */
		public $password;
		/**
		 * @var int Si el usuario es admin 1 o no 0
		 */
		public $admin;
		/**
		 * @var int ID de la categoría del usuario
		 */
		public $idCategoria;
		/**
		 * @var string Foto del usuario
		 */
		public $foto;
		
		// MÉTODOS
		
		/**Obtener ID del usuario
		 * @return int
		 */
		public function getIdUsuario() {
			return $this->idUsuario;
		}
		
		/**Obtener Nombre del usuario
		 * @return string
		 */
		public function getNombre() {
			return $this->nombre;
		}
		
		/**Obtener Apellido del usuario
		 * @return string
		 */
		public function getApellido() {
			return $this->apellido;
		}
		
		/**Obtener Usuario del usuario
		 * @return string
		 */
		public function getUsuario() {
			return $this->usuario;
		}
		
		/**Obtener Contraseña del usuario
		 * @return string
		 */
		public function getPassword() {
			return $this->password;
		}
		
		/**Obtener si el usuario es admin o no
		 * @return int valores posibles 1 ó 0
		 */
		public function getAdmin() {
			return $this->admin;
		}
		
		/**Obtener ID de la categoría del usuario
		 * @return int
		 */
		public function getIdCategoria() {
			return $this->idCategoria;
		}
		
		/**Establecer ID del usuario
		 * @param $idUsuario int
		 */
		public function setIdUsuario( $idUsuario ) {
			$this->idUsuario = $idUsuario;
		}
		
		/**Establecer Nombre del usuario
		 * @param $nombre string
		 */
		public function setNombre( $nombre ) {
			$this->nombre = $nombre;
		}
		
		/**Establecer Apellido del usuario
		 * @param $apellido string
		 */
		public function setApellido( $apellido ) {
			$this->apellido = $apellido;
		}
		
		/**Establecer Usuario del usuario
		 * @param $usuario string
		 */
		public function setUsuario( $usuario ) {
			$this->usuario = $usuario;
		}
		
		/**Establecer Contraseña del usuario
		 * @param $password string
		 */
		public function setPassword( $password ) {
			$this->password = $password;
		}
		
		/**Establecer si el usuario es admin o no
		 * @param $admin int valores admitidos 1 ó 0
		 */
		public function setAdmin( $admin ) {
			$this->admin = $admin;
		}
		
		/**Establecer ID de la categoría del usuario
		 * @param $idCategoria int
		 */
		public function setIdCategoria( $idCategoria ) {
			$this->idCategoria = $idCategoria;
		}
		
		/**Obtener Foto del usuario
		 * @return string
		 */
		public function getFoto() {
			return $this->foto;
		}
		
		/**Establecer Foto del usuario
		 * @param $foto string
		 */
		public function setFoto( $foto ) {
			$this->foto = $foto;
		}
	}