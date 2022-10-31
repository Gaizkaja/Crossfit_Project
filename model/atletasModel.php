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
	
	include_once( "atletasClass.php" );
	include_once( "entrenadoresModel.php" );
	include_once( "categoriasModel.php" );

/**
 * Class atletasModel
 * Se encarga de la interacción con la DB referente a los atletas
 */
class atletasModel extends atletasClass {
	
	// ATRIBUTOS
	
	/**
	 * @var mysqli Conexión a la DB
	 */
	private $link;
	/**
	 * @var entrenadoresModel Entrenador del atleta
	 */
	public $objEntrenador;
	/**
	 * @var categoriasModel Categoría del atleta
	 */
	public $objCategoria;
	
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
	
	/**Trae la información de los atletas junto a $objCategoria y $objEntrenador
	 * @return array Todos los atletas
	 */
	public function atletas() {
			$this->OpenConnect();
			
			$sql = "call spListaAtletas()";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$newAtleta = new atletasModel();
				$newAtleta->idAtleta = $row[ 'idAtleta' ];
				$newAtleta->nombre = $row[ 'nombre' ];
				$newAtleta->apellido = $row[ 'apellido' ];
				$newAtleta->correo = $row[ 'correo' ];
				$newAtleta->foto = $row[ 'foto' ];
				$newAtleta->sexo = $row[ 'sexo' ];
				$newAtleta->edad = $row[ 'edad' ];
				$newAtleta->idEntrenador = $row[ 'idEntrenador' ];
				$newAtleta->idCategoria = $row[ 'idCategoria' ];
				
				$newCategoria = new categoriasModel();
				$newCategoria->idCategoria = $row[ 'idCategoria' ];
				$newCategoria->idCategoria();
				$newAtleta->objCategoria = $newCategoria;
				
				$newEntrenador = new entrenadoresModel();
				$newEntrenador->idEntrenador = $row[ 'idEntrenador' ];
				$newEntrenador->idEntrenador();
				$newAtleta->objEntrenador = $newEntrenador;
				
				array_push( $list, $newAtleta );
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return ( $list );
		}
	
	/**Busca los atletas que hay en una determinada categoría
	 * @return array Atletas de la categoría cuya ID coincida con la de $idCategoria
	 */
	public function atletasCategoria() {
			
			$this->OpenConnect();
			
			$idCategoria = $this->idCategoria;
			
			$sql = "call spAtletasCategoria('$idCategoria')";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$newAtleta = new atletasModel();
				$newAtleta->idAtleta = $row[ 'idAtleta' ];
				$newAtleta->nombre = $row[ 'nombre' ];
				$newAtleta->apellido = $row[ 'apellido' ];
				$newAtleta->idEntrenador = $row[ 'idEntrenador' ];
				$newAtleta->idCategoria = $row[ 'idCategoria' ];
				
				$newEntrenador = new entrenadoresModel();
				$newEntrenador->idEntrenador = $row[ 'idEntrenador' ];
				$newEntrenador->idEntrenador();
				$newAtleta->objEntrenador = $newEntrenador;
				
				$newCategoria = new categoriasModel();
				$newCategoria->idCategoria = $row[ 'idCategoria' ];
				$newCategoria->idCategoria();
				$newAtleta->objCategoria = $newCategoria;
				
				array_push( $list, $newAtleta );
				
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return ( $list );
		}

	/**Busca todos los atletas de un entrenador
	 * @return array Atletas que son son entrenados por el entrenador cuya ID coincida con $idEntrenador
	 */
	public function atletasEntrenador() {
			$this->OpenConnect();
			
			$idEntrenador = $this->idEntrenador;
			
			$sql = "call spAtletasEntrenador('$idEntrenador')";
			
			$list = array();
			
			$result = $this->link->query( $sql );
			
			while ( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$newAtleta = new atletasModel();
				$newAtleta->idAtleta = $row[ 'idAtleta' ];
				$newAtleta->nombre = $row[ 'nombre' ];
				$newAtleta->apellido = $row[ 'apellido' ];
				$newAtleta->foto = $row[ 'foto' ];
				array_push( $list, $newAtleta );
				
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
			return ( $list );
		}
	
	/**
	 *Busca la información del atleta de la ID elegida y rellena el modelo con ella
	 */
	public function getById() {
			$this->OpenConnect();
			$id = $this->getIdAtleta();
			
			$sql = "call spAtletaById('$id')";
			$result = $this->link->query( $sql );
			
			if( $row = mysqli_fetch_array( $result, MYSQLI_ASSOC ) ) {
				$this->setIdEntrenador( $row[ 'idEntrenador' ] );
				$this->setCorreo( $row[ 'correo' ] );
				$this->setSexo( $row[ 'sexo' ] );
				$this->setEdad( $row[ 'edad' ] );
				$this->setIdUsuario( $row[ 'idUsuario' ] );
				$this->setNombre( $row[ 'nombre' ] );
				$this->setApellido( $row[ 'apellido' ] );
				$this->setUsuario( $row[ 'usuario' ] );
				$this->setAdmin( $row[ 'admin' ] );
				$this->setIdCategoria( $row[ 'idCategoria' ] );
				$this->setFoto( $row[ 'foto' ] );
				
				$modeloEntrenador = new entrenadoresModel();
				$modeloEntrenador->setIdEntrenador( $row[ 'idEntrenador' ] );
				$modeloEntrenador->idEntrenador();
				$this->objEntrenador = $modeloEntrenador;
				
				$modeloCategoria = new categoriasModel();
				$modeloCategoria->setIdCategoria( $row[ 'idCategoria' ] );
				$modeloCategoria->idCategoria();
				
				$this->objCategoria = $modeloCategoria;
			}
			mysqli_free_result( $result );
			$this->CloseConnect();
		}
	
	/**Inserta un nuevo atleta
	 * @return string Mensaje del resultado
	 */
	public function insert() {
			
			$this->OpenConnect();
			
			$nombreInsert = $this->getNombre();
			$apellidoInsert = $this->getApellido();
			$correoInsert = $this->getCorreo();
			$idEntrenadorInsert = $this->getIdEntrenador();
			$idCategoriaInsert = $this->getIdCategoria();
			$edadInsert = $this->getEdad();
			$fotoInsert = $this->getFoto();
			$sexoInsert = $this->getSexo();
			
			$sql = "CALL spInsert('$nombreInsert','$apellidoInsert','$correoInsert',$idEntrenadorInsert,$idCategoriaInsert,$edadInsert,'$fotoInsert','$sexoInsert')";
			
			if ( $this->link->query( $sql ) ) {
				$returnString = "insertado.Num de inserts: " . $this->link->affected_rows;
				$this->CloseConnect();
				return $returnString;
				
			} else {
				$this->CloseConnect();
				return $sql . "Error al insertar";
			}
			
		}
	
	/**Elimina un atleta
	 * @return string Mensaje del resultado
	 */
	public function delete() {
			
			$this->OpenConnect();
			
			$id = $this->idUsuario;
			$sql = "CALL spDelete($id)";
			
			if ( $this->link->query( $sql ) ) {
				$returnString = "Borrado.Num de deletes: 1";
				$this->CloseConnect();
				return $returnString;
			} else {
				$this->CloseConnect();
				return "Error al borrar";
			}
		}
	
	/**Actualiza un atleta
	 * @return string Mensaje del resultado
	 */
	public function update() {
			
		    $this->OpenConnect();
		    
		    $idAtleta = $this->getIdAtleta();
		    $nombreUpdate = $this->getNombre();
		    $apellidoUpdate = $this->getApellido();
		    $correoUpdate = $this->getCorreo();
		    $idEntrenadorUpdate = $this->getIdEntrenador();
		    $idCategoriaUpdate = $this->getIdCategoria();
		    $edadUpdate = $this->getEdad();
		    $fotoUpdate = $this->getFoto();
		    $sexoUpdate = $this->getSexo();
		    
		    $sql = "CALL spUpdate($idAtleta,'$nombreUpdate','$apellidoUpdate',$idCategoriaUpdate,'$correoUpdate','$fotoUpdate','$sexoUpdate',$edadUpdate,$idEntrenadorUpdate)";
		    
		    if ( $this->link->query( $sql ) ) {
		        $returnString = "Actualizado: " . $this->link->affected_rows;
		        $this->CloseConnect();
		        return $returnString;
		    } else {
		        $this->CloseConnect();
		        return $sql . "Error al Modificar";
		    }
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
