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
	
	include_once( "usuariosClass.php" );
	include_once( "categoriasModel.php" );

	/**
	 * Class usuariosModel
	 * Se encarga de la interacción con la DB referente a los usuarios
	 */
	class usuariosModel extends usuariosClass {
		
		// ATRIBUTOS
		
		/**
		 * @var mysqli Conexión a la DB
		 */
		private $link;
		/**
		 * @var categoriasModel Categoría del usuario
		 */
		public $objCategoria;
		
		// MÉTODOS
		
		/**Trae la indormación de todos los usuarios
		 * @return array Todos los usuarios junto a su $objCategoria
		 */
		public function getAll() {
			$this->OpenConnect();
			
			$sql = "call spListaUsuarios()";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$newUsu = new usuariosModel();
				$newUsu->idUsuario = $row[ 'idUsuario' ];
				$newUsu->nombre = $row[ 'nombre' ];
				$newUsu->apellido = $row[ 'apellido' ];
				$newUsu->usuario = $row[ 'usuario' ];
				$newUsu->password = $row[ 'password' ];
				$newUsu->admin = $row[ 'admin' ];
				$newUsu->idCategoria = $row[ 'idCategoria' ];
				
				$newCategoria = new categoriasModel();
				$newCategoria->idCategoria = $row[ 'idCategoria' ];
				$newCategoria->idCategoria();
				$newUsu->objCategoria = $newCategoria;
				
				array_push( $list, $newUsu );
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return ( $list );
		}
		
		/**Trae la información de el usuario cuya ID coincida con la del modelo
		 * @return bool Exito devuelve True y error devuelve False
		 */
		public function getById() {
			$this->OpenConnect();
			
			$id = (int)$this->idUsuario;
			$sql = "CALL spFindUserById('$id')";
			
			$result = $this->link->query( $sql );
			
			$found = false;
			
			if ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				
				$this->setNombre( $row[ 'nombre' ] );
				$this->setApellido( $row[ 'apellido' ] );
				$this->setUsuario( $row[ 'usuario' ] );
				$this->setPassword( $row[ 'password' ] );
				$this->setAdmin( $row[ 'admin' ] );
				$this->setIdCategoria( $row[ 'idCategoria' ] );
				$this->setFoto( $row[ 'foto' ] );
				
				$found = true;
			}
			
			mysqli_free_result( $result );
			return $found;
		}
		
		/**Verifica la información de inicio de sesión
		 * @return bool|null Exito devuelve True, contraseña incorrecta devuelve False y usuario inexistente devulve null
		 */
		public function verifyUser() {
			$this->OpenConnect();
			
			$username = $this->usuario;
			$password = $this->password;
			
			$sql = "CALL spFindUser('$username')";
			$result = $this->link->query( $sql );
			
			$found = null;
			
			if ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				if ( $password === $row[ 'password' ] ) {
					$this->setIdUsuario( $row[ 'idUsuario' ] );
					$this->setNombre( $row[ 'nombre' ] );
					$this->setApellido( $row[ 'apellido' ] );
					$this->setAdmin( $row[ 'admin' ] );
					$this->setIdCategoria( $row[ 'idCategoria' ] );
					
					$found = true;
				} else $found = false;
			}
			
			mysqli_free_result( $result );
			return $found;
		}
		
		/**Nos dice si el usuario es un entrenador o no
		 * @return bool
		 */
		public function isEntrenador() {
			$this->OpenConnect();
			
			$id = $this->getIdUsuario();
			
			$sql = "CALL spIsEntrenador('$id')";
			$query = $this->link->query($sql);
			
			$isEntrenador = false;
			
			if ( $row = mysqli_fetch_array( $query, MYSQLI_ASSOC ) ) {
				if ( $row['amount'] > 0 ) $isEntrenador = true;
			}
			
			mysqli_free_result($query);
			$this->CloseConnect();
			return $isEntrenador;
		}
		
		/**Elimina los valores nulos del array que es pasado como parámetro y lo actualiza mediante referencia, funciona a modo recursivo tambien limpiando los arrays dentro de este y viceversa
		 * @param $array array Array a limpiar
		 */
		function cleanOutput( &$array ) {
			$array = json_decode( json_encode( $array ), true );
			
			foreach ( $array as $key => &$value ) {
				if ( is_null( $value ) ) {
					unset( $array[ $key ] );
				} elseif ( is_array( $value ) ) {
					$this->cleanOutput( $value );
				}
			}
		}
		
		/**
		 * Abre la conexión con la DB
		 * @uses isLocal
		 */
		public function OpenConnect() {
			$konDat = null;
			
			if ( isLocal ) {
				$konDat = new connect_data();
			} else $konDat = new connect_data_remote();
			
			try {
				$this->link = new mysqli( $konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname );
			} catch ( Exception $e ) {
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
	}
