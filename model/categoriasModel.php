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
	
	include_once( "categoriasClass.php" );

/**
 * Class categoriasModel
 * Se encarga de la interacción con la DB refrente a las categorías
 */
	class categoriasModel extends categoriasClass {
		
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
		
		/**Trae la información de las categorías
		 * @return array Todas las categorías
		 */
		public function categorias() {
			$this->OpenConnect();
			
			$sql = "call spListaCategorias()";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				
				$newCategoria = new categoriasModel();
				$newCategoria->idCategoria = $row[ 'idCategoria' ];
				$newCategoria->nombre = $row[ 'nombre' ];
				$newCategoria->edad = $row[ 'edad' ];
				$newCategoria->precio = $row[ 'precio' ];
				
				array_push( $list, $newCategoria );
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return $list;
		}

		/**
		 *Busca la información de la categoría cuya ID coincida y rellena el modelo con ella
		 */
		public function idCategoria() {
			$this->OpenConnect();
			$idCategoria = $this->idCategoria;
			$sql = "CALL spIdCategorias('$idCategoria')";
			
			$result = $this->link->query( $sql );
			
			$found = false;
			
			if ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$this->nombre = $row[ 'nombre' ];
				$this->edad = $row[ 'edad' ];
				$this->precio = $row[ 'precio' ];
				
				$found = true;
			}
			
			mysqli_free_result( $result );
			$this->CloseConnect();
			return $found;
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
		
	}
