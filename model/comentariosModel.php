<?php
	// Esto no solo es util en caso de decidir si usamos un conector u otro, tambien podemos usarlo para evitar realizar ciertas cosas en los controladores
	// por ejemplo si queremos enviar un email cuando alguien inserte un comentario, en caso de estar en local necesitas instalar un servidor de correo sin
	// embargo si no estas en local, el hosting es muy probable que ya de por si tenga un servidor de mail de modo que ese fragmento de código se pueda ejecutar
	// sin causar excepciones
	if ( !defined( 'isLocal' ) ) {
		
		/**
		 * isLocal nos indica si estamos en un servidor local (True) o no (False)
		 */
		define( 'isLocal', !( $_SERVER[ 'HTTP_HOST' ] == "grupo1.zerbitzaria.net" ) );
		
	}
	
	if ( isLocal ) {
		
		include_once( "connect_data.php" );
	} else include_once( "connect_data_remote.php" );

	include_once( "comentariosClass.php" );
	include_once( "usuariosModel.php");

	/**
	 * Class comentariosModel
	 * Se encarga de la interacción con la DB refrente a los comentarios
	 */
	class comentariosModel extends comentariosClass {
		
		// ATRIBUTOS
		/**
		 * @var mysqli Conexión a la DB
		 */
		private $link;
		
		// MÉTODOS
		
		/**
		 * Abre la conexión con la DB
		 * @uses isLocal
		 */
		public function OpenConnect() {
			$konDat = null;
			
			if( isLocal ) {
				$konDat = new connect_data();
			} else $konDat = new connect_data_remote();
			
			try {
				$this->link = new mysqli( $konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname );
			} catch( Exception $e ) {
				echo $e->getMessage();
			}
			$this->link->set_charset( "utf8" );
		}
		
		/**
		 * Cierra la conexión con la DB
		 */
		public function CloseConnect() {
			mysqli_close( $this->link );
			
		}
		
		/**Buscar comentarios que coincidan con la ID del usuarioa
		 * @return array Comentarios del usuario cuya ID coincida con $idUsuario
		 */
		public function getById() {
			$this->OpenConnect();
			
			$id = $this->getIdUsuario();
			
			$sql = "CALL spLoadCommentsById('$id')";
			$query = $this->link->query( $sql );
			
			$comentarios = array();
			
			while ( $row = mysqli_fetch_array( $query, MYSQLI_ASSOC ) ) {
				$comentario = new comentariosModel();
				
				$comentario->setIdComentario( $row['idComentario'] );
				$comentario->setIdUsuario( $row[ 'idUsuario' ] );
				$comentario->setAsunto( $row['asunto'] );
				$comentario->setTexto( $row['texto'] );
			
				array_push( $comentarios, $comentario );
			}
			
			mysqli_free_result( $query );
			$this->CloseConnect();
			return $comentarios;
		}
		
		/**Insertar un comentario en base a la información del modelo
		 * @return bool Exito devuelve True y error devuelve False
		 */
		public function insert() {
			$this->OpenConnect();
			
			$idUsuario = $this->getIdUsuario();
			$asunto = $this->getAsunto();
			$texto = $this->getTexto();
			
			$sql = "CALL  spInsertComment($idUsuario,'$asunto','$texto')";
			
			if( $this->link->query( $sql ) ) {
				$this->CloseConnect();
				return true;
				
			} else {
				$this->CloseConnect();
				return false;
			}
		}
		
		/**Eliminar un comentario en base a la ID del modelo
		 * @return bool Exito devuelve True y error devuelve False
		 */
		public function deleteById() {
			$this->OpenConnect();
	
			$id = $this->getIdComentario();
	
			$sql = "DELETE FROM comentarios WHERE idComentario = $id";
	
			$result = false;
	
			if ( $this->link->query( $sql ) ) $result = true;
	
			$this->CloseConnect();
			return $result;
		}
		
		/**
		 * @param $data array Datos provenientes de la petición HTTP
		 * @param $email string E-mail del destinatario
		 */
		public function sendMail( $data, $email ) {
			$modeloUsuario = new usuariosModel();
	        $modeloUsuario->setIdUsuario( $data['idUsuario'] );
	
	        $modeloUsuario->getById();
	
	        $to_email = $email;
	        $subject = "Hay un nuevo comentario";
	        $body = "Comentario públicado por el usuario ".$modeloUsuario->getNombre()." ".$modeloUsuario->getApellido()."\r".$data['asunto']."\r".$data['texto'];
	
	        mail( $to_email, $subject, $body );
		}
		
		/**Elimina los valores nulos del array que es pasado como parámetro y lo actualiza mediante referencia, funciona a modo recursivo tambien limpiando los arrays dentro de este y viceversa
		 * @param $array array Array a limpiar
		 */
		public function cleanOutput( &$array ) {
			$array = json_decode( json_encode( $array ), true );
			
			foreach ( $array as $key => &$value ) {
				if ( is_null( $value ) ) {
					unset( $array[ $key ] );
				} elseif ( is_array( $value ) ) {
					$this->cleanOutput( $value );
				}
			}
		}
		
	}