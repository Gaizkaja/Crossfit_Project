$(document).ready(function () {
    // Ocultar botón modo oscuro
    $('a.claro').hide();
    // Cambio de lenguaje
    $('.enlaces a[data-lang]').click( function () {
        const lang = $(this).attr('data-lang');

        $('html').attr('lang', lang);
    } )

    // Añadir eventos a las pestañas
    $('#infoTab, #commentsTab').click(function (event) {
        highlightSection(event);
    });

    loadUserInfo();
    loadUserComments();

    $('.cambiarmodo').click( function ( event ) {
        const body = $( 'body' );
        const logo = $( '.navbar-brand img' );

        if ( $( this ).attr('class').split(/\s+/).includes('oscuro') ) {
            if ( confirm('Esta acción puede causar un daño irreversible a tus ojos,\r ¿Aún sabiendo esto quieres continuar?') ) {
                $(this).hide();
                $('a.claro').show();
                body.removeClass('oscuro').addClass('claro');
                logo.attr('src', 'images/index/Logo_Blanco.png');
            }
        } else {

            $( this ).hide();
            $( 'a.oscuro' ).show();
            body.removeClass( 'claro' ).addClass( 'oscuro' );
            logo.attr( 'src', 'images/index/Logo_Negro.png' )
        }
    } )
});

function highlightSection(event) {
    const target = event.target;
    const tab = target.dataset.tab;

    $.each($('.profile-nav > span, .profile-body > div'), function (index, element) {

        const isSection = element.tagName === 'DIV';
        if (element.dataset.tab === tab) {
            isSection ? $(this).addClass('selected d-block') : $(this).addClass('selected');
        } else isSection ? $(this).removeClass('selected d-block') : $(this).removeClass('selected');
    })
}

function loadUserInfo() {

    fetch(url + 'controller/cPerfil.php', {
        method: 'GET'
    })
        .then(result => result.json())
        .then(response => {

            const user = response.answer;
            if (typeof (user) !== 'object') location.href = url;

            $('#picture').attr('style', `background-image: url('${url}uploads/${user.foto}')`);

            const admin = eval(user.admin) ? 'Administrador' : 'Estandar';

            let content = `
                <div class="col-6">
                    <h2><u lang="es">Personal</u><u lang="eu">Pertsonala</u></h2>
                    <p><strong lang="es">Nombre:</strong><strong lang="eu">Izena:</strong> ${user.nombre} <strong lang="es">Apellido:</strong> <strong lang="eu">Abizena:</strong>${user.apellido}</p>
                    <p><strong lang="es">Rol:</strong><strong lang="eu">Rola:</strong> ${admin}</p>
                    <p><strong lang="es">Categoría:</strong><strong lang="eu">Kategoria:</strong> ${user.objCategoria.nombre}</p>
            `;

            let contentTwo = `<div class="col-6">`;

            const categoria = user.objCategoria;

            // Si el usuario es Entrenador entonces tiene menos campos del area personal y en vez de información de la Tarifa
            // este tendrá la inforación sobre la categoría que imparte y cuantos atletas entrena
            if (response.isEntrenador) {
                const atletas = response.atletas;

                content += `</div>`;
                contentTwo += `
                        <h2><u lang="es">Categoría impartida</u><u lang="eu">Kategoria emanda</u></h2>
                        <p><strong lang="es">Categoría:</strong><strong lang="eu">Kategoria:</strong> ${categoria.nombre} <strong lang="es">Edades: </strong> <strong lang="eu">Adinak: </strong> ${categoria.edad}</p>
                        <p><strong lang="es">Número de atletas en entrenamiento:</strong><strong lang="eu">Entrenamenduan dauden atleten kopurua:</strong> ${atletas.length}</p>
                    </div>
                `;
            } else {
                content += `
                        <p><strong lang="es">Email:</strong><strong lang="eu">Email-a:</strong> ${user.correo}</p>
                        <p><strong lang="es">Sexo:</strong><strong lang="eu">Sexua:</strong> ${user.sexo}</p>
                        <p><strong lang="es">Entrenador:</strong><strong lang="eu">Entrenatzailea:</strong> ${user.objEntrenador.nombre} ${user.objEntrenador.apellido}</p>
                    </div>
                `;
                contentTwo += `
                    <h2><u lang="es">Tarifa</u><u lang="eu">Tarifa</u></h2>
                    <p><strong lang="es">Categoria:</strong><strong lang="eu">Kategoria:</strong> ${categoria.nombre} <strong>Edades: </strong> ${categoria.edad}</p>
                    <p><strong lang="es">€/Mes: </strong><strong lang="eu">€/Hila: </strong> ${categoria.precio}€</p>
                </div>
            `;
            }
            $('#infoUsuario').html(content + contentTwo);
        })
}

function loadUserComments() {

    fetch(url + 'controller/cLoadComments.php', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(result => {

            const comentarios = result.answer.comments;

            let content = ``;

            if ( result.answer.comments.length !== 0  ) {
                comentarios.forEach(comentario => {
                    content += `
                        <div class="comentario row col-12 mb-3 justify-content-center align-items-center">
                            <div class="col-11">
                                <input type="text" class="form-control rounded-0 text-center" placeholder="Asunto" aria-label="Asunto" aria-describedby="Asunto" value="${comentario.asunto}" readonly>
                                <textarea class="col form-control rounded-0 text-center" aria-label="Comentario" readonly>${comentario.texto}</textarea>
                            </div>
                            <div class="col-1">
                                <button data-id='${comentario.idComentario}' type='button' class='btn btn-danger'><img src='iconos/cross_white.png'></button>
                            </div>
                        </div>
                    `;
                })
            } else content = `<h1 class="col text-center" lang="es">NO HAY COMENTARIOS</h1><h1 class="col text-center" lang="eu">ES DAGO KOMENTARIORIK</h1>`

            $('#comentariosUsuario').html(content);
            var btnDelte = document.querySelectorAll(".btn-danger");
            for (let i = 0; i < btnDelte.length; i++) {
                btnDelte[i].addEventListener('click',execDeletComent);
            }
        })
}

function execDeletComent(){
    var x = confirm("Confirmar eliminación??");
    if (x){
        var idComentario = this.dataset.id;
        var url = "../controller/cDeleteComment.php";
        var data = {'idComentario': idComentario};
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(result => {
            console.log(result.answer);
            if(result.answer){
                alert("Eliminado correctamente")
            }
            window.location.reload(true);
        })
            .catch(error => console.error('Error status:', error));
    }
}
