let url = location.href;
if (url.search(/\/view\//i) !== -1) {
    // Aquí se va a comprobar si estamos en la carpeta view o no para cambiar los path
    // de los controladores en caso de que estemos en dicha carpeta

    const index = url.search(/view/);
    url = url.substring(0, index);  // Con esto me aseguro de que independientemente de cual sea la página que ejecute el script
                                    // La ruta a los controladores nunca falle
} else {
    const index = url.search(/[a-zA-z]*\.html/);
    url = url.substring(0, index);
}


$(document).ready(function () {
    var logeado = false;
    // Hide buttons and login info
    $('#loggedUser, #loginType').hide();
    // Check if there is a user logged in
    loadSession();

    // Login Verification
    $('#password').keydown(function (event) {
        formVerify(event);
    });
    $('#sendLoginData').click(function () {
        verifyLogin();
    });
    // Logout
    $('#logout').click(function () {
        logout();
    });

    // Comments
    $('#dudasForm #sendComment').click(function (event) {
        sendComment(event);
        return true;
    })
    //Boton para subir
    window.onscroll = () => {
        if (window.pageYOffset >= 500) {
            //Nos sale
            $('.go-top').css('display', 'block');
        } else {
            //se oculta
            $('.go-top').css('display', 'none');
        }

    }
    $('.go-top').on('click', function () {

        $("html, body").animate({
            scrollTop: 0
        }, 600);
    });
});

    // CARGAR SESION
function loadSession() {
    $.ajax({
        url: url + 'controller/cCheckSession.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json'

    }).done(response => {
        if (typeof (response.answer) === 'object') {
            $('#atletasIco').css('display', 'block');
            const admin = eval(response.answer.admin) ? 'Administrador' : 'Estandar';
            $('nav button[data-target="#loginModal"]').hide();
            $('#logout, #loggedUser, #loginType').show();
            $('#loggedUser').text(`${response.answer.nombre} ${response.answer.apellido}`);
            $('#loginType').text(`${admin}`);
            $('#commentUsername').val(response.answer.usuario).attr('data-id', response.answer.idUsuario);
            $('.notAuth').removeClass('notAuth');

        } else {
            $('button[data-target="#dudasModal"]').attr('disabled', 'true');

            $('.notAuth').removeClass(function (i, v) {
                const classList = v.split(' ');
                let toBeRemoved = [];

                classList.forEach(item => {

                    if (item.match(/d-(sm-|md-|lg-)?-?[a-zA-Z0-9]*/)) toBeRemoved.push(item);
                })

                return toBeRemoved;
            })
                .addClass('d-none');

            $('#commentNotAuth').removeClass('d-none');
            if (location.href.search(/\/(atletas|perfil).html/i) !== -1) location.href = url;    // Aquellos que no están logeados no pueden acceder a las otras páginas
            // y serán redireccionados al index.html
        }

    })
}
    // VERIFICAR LOGIN
function formVerify(event) {
    const username = $('#username').val();
    let password = $('#password').val();
    let validForm = true;

    if (event.key !== undefined) {
        if (event.key.length === 1) password += event.key;
        if (event.key === 'Backspace') password = password.substring(0, password.length - 1);

        if (!(username.length > 0) || !(password.length > 0)) {
            validForm = false;
        }
    }
    if (validForm) $('#sendLoginData').attr('disabled', false);
    else $('#sendLoginData').attr('disabled', true);
}
    // VERIFICAR LOGIN 
function verifyLogin() {
    const data = {
        username: $('#username').val(),
        password: $('#password').val()
    }

    $.ajax({
        url: url + 'controller/cLogin.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)

    }).done(response => {
        if (typeof (response.answer) !== 'object') {
            return alert(response.answer);
        }
        location.reload();
    })
}
    // CERRAR SESIÓN 
function logout() {
    $.ajax({
        url: url + 'controller/cLogout.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json'
    }).done(response => {
        if (response.answer) {
            alert('Logged out correctly');
            location.reload();
        } else alert('Error while trying to logout!');
    });
}
    // ENVIAR COMENTARIO
function sendComment() {
    const data = {
        idUsuario: $('#commentUsername').attr('data-id'),
        asunto: $('#commentSubject').val(),
        texto: $('#commentBody').val()
    }

    $.ajax({
        url: url + 'controller/cInsertCommentary.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
    }).done(response => {
        if (response.answer) {
            alert('Comentario enviado correctamente');
            $('#commentSubject, #commentBody').val('');
            location.reload();
        } else alert('Ha ocurrido un falló al enviar su comentario, revise que los campos estén debidamente rellenados');
    });
}
