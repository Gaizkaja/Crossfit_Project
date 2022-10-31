//CARGAMOS LOS DATOS DE LAS ACTIVIDADES CON ARRAYS
var titulo_es = ["Crossfit", "Haltero", "Gymnastics", "Mobility", "Competitors", "Academy"];
var texto_es = ["Clases dirigidas que estan formadas de un Warm-up, un apartado de fuerza y el WOD principal",
    "Clases especificas de los movimientos principales de halterofilia (squat clean, back squat, strict press...)",
    "Clases especificas de los movimientos principales gimnasticos (pull ups, muscle ups, handstand walk...)",
    "Clases enfocadas a la ganancia de ROM (rango optimo e movimiento).",
    "Clases de programacion mas especifica enfocada al crosffit de competicion. Si te gusta el crossfit y deseas tener mas nivel esta es tu clase.",
    "Clases dirigidas principalmente a la ganancia de fuerza y desarrollo de skills (habilidades mas tecnicas que nos valen para tranferirlos a los entrenos de crossfit).",
];

var titulo_eus = ["Crossfit", "Haltero", "Gymnastics", "Mobility", "Competitors", "Academy"];
var texto_eus = ["Beroketa, indar atal bat eta WOD nagusia osatzen duten klase zuzenak",
    "Halterofiliako mugimendu nagusien klase zehatzak (squat clean, back squat, press zorrotza ...)",
    "Mugimendu gimnastiko nagusien klase espezifikoak (tiraderak, giharrak, eskuko oinez ...)",
    "Programazio klase zehatzagoak lehiaketa lehiaketetara bideratuta daude. Crossfit gustatzen bazaizu eta maila altuagoa izan nahi baduzu hau da zure klasea.",
    "Indarrak hartu eta trebetasunak garatzera bideratutako klaseak (crossfit entrenamendura transferitzea merezi duten trebetasun tekniko gehiago).",
];

// CARGAR CATEGORIAS

$(document).ready(function () {
    loadCategorias(true);
    $('#categoria').change(function (event) {
        cargarCategoria(event);
    });

})

// GO TO 
$('#histo').on('click', function () {

    $('html, body').animate({
        scrollTop: $("#historia").offset().top - 110
    }, 1000);

});
$('#actividad1').on('click', function () {

    $('html, body').animate({
        scrollTop: $("#actividades").offset().top - 100
    }, 1000);
});

$('#coach').on('click', function () {

    $('html, body').animate({
        scrollTop: $("#entrenador").offset().top - 110
    }, 1000);
});

$('#horario1').on('click', function () {

    $('html, body').animate({
        scrollTop: $("#horarios").offset().top - 110
    }, 1000);
});

$('#tarifas').on('click', function () {

    $('html, body').animate({
        scrollTop: $("#categorias").offset().top - 110
    }, 1000);
});



//DEPENDIENDO DE LA ACTIVIDAD QUE CLIQUE CAMBIAMOS LOS DATOS

function datos(id) {

    if (window.location.href.search(/#eu/) !== -1) {

        $('#modal-titulo').html(titulo_eus[id]);
        $('#modal-texto').html(texto_eus[id]);

    } else {
        $('#modal-titulo').html(titulo_es[id]);
        $('#modal-texto').html(texto_es[id]);
    }
}

// CARGAR COMBOBOX DE TARIFAS

function loadCategorias(es) {
    let option = `<option value="null">Kategoriak Aukeratu</option>`;
    if (es) {
        option = `<option value="null">Seleccionar Categoria</option>`;
    }
    // La variable url está declarada en main.js y esta contiene el path actual del navegador
    $.ajax({
        url: url + 'controller/cSelectCategorias.php',
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json'
    }).done(response => {
        $('#categoria').html(option);
        response.list.forEach(categoria => {
            $('#categoria').html(function (i, content) {
                return `${content}<option value="${categoria.idCategoria}">${categoria.nombre}</option>`;
            });
        })
    })
}

// MODO CLARO/OSCURO

function changeBodyClaroIndex() {

    var modo1 = $('#modoclaro1').html();

    if (modo1 === "Modo Claro") {


        $("#modoclaro1").html("Modo Oscuro");

        //INDEX
        $('.navbar-toggler').css('background-color', '#242b26');
        $("#img1").attr('src', url + 'view/iconos/historia.png');
        $("#img2").attr('src', url + 'view/iconos/localizacion.png');
        $("#img3").attr('src', url + 'view/iconos/coaches.png');
        $("#img4").attr('src', url + 'view/iconos/actividades.png');
        $("#img5").attr('src', url + 'view/iconos/horario.png');
        $("#img6").attr('src', url + 'view/iconos/tarifas.png');
        $("#img7").attr('src', url + 'view/iconos/atletas.png');

        // INDEX HISTORIA
        $("#img_hist").attr('src', url + 'view/images/index/logo_white.jpeg');

        document.body.style.background = 'white';

        // NAVBAR
        $("#navbar").css("background-color", "#bfbcb2");
        $("#navbar a").css("color", "black");
        // BODY
        $("h2").css("color", "black");
        $(".texto-light").css("color", "black");
        $("#xx").css("color", "black");
        $("#langtext2").css("color", "black");
        $(".coachtable .info").css("background-color", "black").css("color", "white");
        $("#yy").css("color", "black");
        // COMPETICIONES
        $("#div1, #div2, #div3").css("background", "-webkit-linear-gradient(top, rgba(242,246,248,1) 0%, rgba(181,198,208,1) 37%, rgba(216,225,231,1) 52%, rgba(224,239,249,1) 100%)");
        // FOOTER
        $("footer").css("background-color", "#bfbcb2");
        $("footer a").css("color", "black");
        $("#footer").css("color", "grey");
        $(".enlace").css("color", "white");
        $("dl").css("color", "black");
        $("td").css("color", "black");
        $("th").css("color", "black");

    }

    if (modo1 === "Modo Oscuro") {
        // NAVBAR

        $("#modoclaro1").html("Modo Claro");

        $('.navbar-toggler').css('background-color', 'black');
        $("#img1").attr('src', url + 'view/iconos/historia1.png');
        $("#img2").attr('src', url + 'view/iconos/localizacion1.png');
        $("#img3").attr('src', url + 'view/iconos/coaches1.png');
        $("#img4").attr('src', url + 'view/iconos/actividades1.png');
        $("#img5").attr('src', url + 'view/iconos/horario1.png');
        $("#img6").attr('src', url + 'view/iconos/tarifas1.png');
        $("#img7").attr('src', url + 'view/iconos/atletas1.png');
        // INDEX HISTORIA
        $("#img_hist").attr('src', url + 'view/images/index/Logo_Black.jpg');

        document.body.style.background = 'black';

        // NAVBAR
        $("#navbar").css("background-color", "#0e0e0e");
        $("#navbar a").css("color", "black");
        // BODY
        $("h2").css("color", "white");
        $(".texto-light").css("color", "white");
        $("#xx").css("color", "white");
        $("#langtext2").css("color", "white");
        $(".coachtable .info").css("background-color", "white").css("color", "black");
        $("#yy").css("color", "white");
        // COMPETICIONES
        $("#div1, #div2, #div3").css("background", "white");
        // FOOTER
        $("#footer").css("color", "black");
        $("footer").css("background-color", "black");
        $("footer a").css("color", "white");
        $(".enlace").css("color", "#008CBA");
        $("dl").css("color", "white");
        $("td").css("color", "white");
        $("th").css("color", "white");

    }

    if (modo1 === "Modu Iluna") {
        // NAVBAR

        $("#modoclaro1").html("Modu Argia");

        //INDEX
        $('.navbar-toggler').css('background-color', 'black');
        $("#img1").attr('src', url + 'view/iconos/historia1.png');
        $("#img2").attr('src', url + 'view/iconos/localizacion1.png');
        $("#img3").attr('src', url + 'view/iconos/coaches1.png');
        $("#img4").attr('src', url + 'view/iconos/actividades1.png');
        $("#img5").attr('src', url + 'view/iconos/horario1.png');
        $("#img6").attr('src', url + 'view/iconos/tarifas1.png');
        $("#img7").attr('src', url + 'view/iconos/atletas1.png');
        // INDEX HISTORIA
        $("#img_hist").attr('src', url + 'view/images/index/Logo_Black.jpg');

        document.body.style.background = 'black';

        // NAVBAR
        $("#navbar").css("background-color", "#0e0e0e");
        $("#navbar a").css("color", "black");
        // BODY
        $("h2").css("color", "white");
        $(".texto-light").css("color", "white");
        $("#xx").css("color", "white");
        $("#langtext2").css("color", "white");
        $(".coachtable .info").css("background-color", "white").css("color", "black");
        $("#yy").css("color", "white");
        // COMPETICIONES
        $("#div1, #div2, #div3").css("background", "white");
        // FOOTER
        $("#footer").css("color", "black");
        $("footer").css("background-color", "black");
        $("footer a").css("color", "white");
        $(".enlace").css("color", "#008CBA");
        $("dl").css("color", "white");
        $("td").css("color", "white");
        $("th").css("color", "white");


    }

    if (modo1 === "Modu Argia") {
        // NAVBAR

        $("#modoclaro1").html("Modu Iluna");

        $('.navbar-toggler').css('background-color', '#242b26');
        $("#img1").attr('src', url + 'view/iconos/historia.png');
        $("#img2").attr('src', url + 'view/iconos/localizacion.png');
        $("#img3").attr('src', url + 'view/iconos/coaches.png');
        $("#img4").attr('src', url + 'view/iconos/actividades.png');
        $("#img5").attr('src', url + 'view/iconos/horario.png');
        $("#img6").attr('src', url + 'view/iconos/tarifas.png');
        $("#img7").attr('src', url + 'view/iconos/atletas.png');

        // INDEX HISTORIA
        $("#img_hist").attr('src', url + 'view/images/index/logo_white.jpeg');

        document.body.style.background = 'white';

        // NAVBAR
        $("#navbar").css("background-color", "#bfbcb2");
        $("#navbar a").css("color", "black");
        // BODY
        $("h2").css("color", "black");
        $(".texto-light").css("color", "black");
        $("#xx").css("color", "black");
        $("#langtext2").css("color", "black");
        $(".coachtable .info").css("background-color", "black").css("color", "white");
        $("#yy").css("color", "black");
        // COMPETICIONES
        $("#div1, #div2, #div3").css("background", "-webkit-linear-gradient(top, rgba(242,246,248,1) 0%, rgba(181,198,208,1) 37%, rgba(216,225,231,1) 52%, rgba(224,239,249,1) 100%)");
        // FOOTER
        $("footer").css("background-color", "#bfbcb2");
        $("footer a").css("color", "black");
        $("#footer").css("color", "grey");
        $(".enlace").css("color", "white");
        $("dl").css("color", "black");
        $("td").css("color", "black");
        $("th").css("color", "black");

    }

}

//IDIOMAS

$("#es_index").click(function () {
    loadCategorias(true);

    //NAVBAR
    $("#his").html("Historia");
    $("#comp").html("Competiciones");
    $("#coa").html("Entrenadores");
    $("#act").html("Actividades");
    $("#hor").html("Horarios");
    $("#tar").html("Tarifas");
    $("#coa").html("Coaches");
    $("#atl").html("Atletas");
    $("#login2").html("LOGIN");


    if ($("#modoclaro1").html("Modu Iluna")) {

        $("#modoclaro1").html("Modo Oscuro");
    } 


    if ($("#modooscuro1").html("Modo Argia")) {

        $("#modooscuro1").html("Modo Claro");

    }




    // TITULOS
    $("#historia_tit").html("Historia");
    $("#instalaciones").html("Conoce nuestras instalaciones");
    $("#competiciones").html("Competiciones");
    $("#entrenador").html("Coaches");
    $("#hora").html("Horarios");
    $("#actividad").html("Actividades");
    $("#categoria-titulo").html("Tarifas");

    //FOOTER TITULOS
    $("#tel").html("Teléfono");
    $("#dire").html("Dirección");
    $("#avisolegal").html("Aviso legal y condiciones del Box");
    $("#aviso").html("Aviso legal");
    $("#politica").html("Política de privacidad");
    $("#cookies").html("Política de cookies");
    $("#dark").html("Dark Phoenix CrossFit en instagram");
    $("#comentario").html("Comentario");


    // HISTORIA
    $("#xx").html("CrossFit es una técnica de entrenamiento que conecta movimientos de diferentes disciplinas, tales como la halterofilia, el entrenamiento metabólico o el gimnástico.\n" +
        "Consiste en acometer un programa de ejercicios (flexiones, tracción, etc), en un tiempo determinado y con un número definido de veces.\n" +
        "Esta noción tiene como principio mantener intacta la motivación de los deportistas a largoplazo. Se puede realizar de manera individual o en grupo, y las sesiones suelen ser cortas,\n" +
        "variadas y adaptables en función del nivel de cada participante.");
    $("#langtext2").html("El creador del CrossFit, Greg Glassman ha diseñado varios grupos, unos bautizados con nombres de mujeres en referencia a los huracanes americanos,\n" +
        "y otros con nombres de héroesmilitares, policías, o bomberos, entre otros, como homenaje.Existen también otros grupos que no tienen nombre, simplemente la descripción de los ejercicios.\n" +
        "El tiempo de ejecución de cada grupo puede variar, desde solo 5 minutos hasta casi 30 minutos, sin contar el calentamiento y la vuelta a la calma.");
    // INSTALACIONES
    $("#yy").html("Nuestro centro deportivo de alto rendimiento se encuentra a escasos metros de la parada de tren de Zuhatzu, Galdakao.Si quieres probar tus habilidades ven a vernos.\n" +
        "<br><span>PRIMERA CLASE GRATIS.</span><br>");
    $("#nuestras_ins").html("Conoce nuestras Instalaciones</br>");
    // COMPETICIONES
    $("#langtext4").html("¿Quieres participar en una competición? <br>Te gustaria desafiarte a ti mismo poniendote a prueba contra las personas mas entrenadas del mundo.<br>Descubre las competiciones mas competitivas de este deporte.");

    // HORARIO
    $("#l").html("Lunes");
    $("#ma").html("Martes");
    $("#mi").html("Miercoles");
    $("#j").html("Jueves");
    $("#v").html("Viernes");
})

$("#eus_index").click(function () {

    loadCategorias(false);

    //NAVBAR
    $("#his").html("Historia");
    $("#comp").html("Konpetizioak");
    $("#coa").html("Entrenatzaileak");
    $("#act").html("Aktibitateak");
    $("#hor").html("Ordutegiak");
    $("#tar").html("Tarifak");
    $("#coa").html("Entrenatzaileak");
    $("#atl").html("Atletak");
    $("#login2").html("HASI SAIOA");


    if ($("#modoclaro1").html("Modo Claro")) {

        $("#modoclaro1").html("Modu Argia");

    }

    if ($("#modooscuro1").html("Modo Oscuro")) {

        $("#modoclaro1").html("Modu Iluna");

    }

   
    // TITULOS
    $("#historia_tit").html("Historia");
    $("#instalaciones").html("Ezagutu gure instalazioak");
    $("#competiciones").html("Konpetizioak");
    $("#entrenador").html("Entrenatzaileak");
    $("#hora").html("Ordutegiak");
    $("#actividad").html("Aktibitateak");
    $("#categoria-titulo").html("Tarifak");

    //FOOTER TITULOS
    $("#tel").html("Telefonoa");
    $("#dire").html("Helbidea");
    $("#avisolegal").html("Lege-oharra eta Boxaren baldintzak");
    $("#aviso").html("Lege-oharra");
    $("#politica").html("Pribatutasun-politika");
    $("#cookies").html("Cookien politika");
    $("#dark").html("Dark Phoenix CrossFit instagram-en");
    $("#comentario").html("Komentarioa");


    // HISTORIA
    $("#xx").html("CrossFit diziplina ezberdinetako mugimenduak konektatzen dituen entrenamendu teknika bat da, halterofilia, entrenamendu metabolikoa edo gimnastikoa kasu.\n" +
        "Ariketa-programa bat egitean datza (flexioak, trakzioa, etab.), denbora jakin batean eta aldi kopuru zehatz batekin.\n" +
        "Nozio horren printzipioa kirolarien motibazioa epe luzera bere horretan mantentzea da. Bakarka edo taldeka egin daiteke, eta saioak laburrak,\n" +
        "askotarikoak eta egokigarriak izaten dira, parte-hartzaile bakoitzaren mailaren arabera.");
    $("#langtext2").html("Greg Glassman CrossFit delakoaren sortzaileak hainbat talde diseinatu ditu, batzuk emakumeen izenekin bataiatu ditu urakan amerikarrei erreferentzia eginez,\n" +
        "eta beste batzuk heroesmilitar, polizia edo suhiltzaileen izenekin, besteak beste, omenaldi gisa. Badira izenik ez duten beste talde batzuk ere, ariketen deskribapena besterik ez.\n" +
        "Talde bakoitzaren exekuzio-denbora aldatu egin daiteke, 5 minututik ia 30 minutura, beroketa eta lasaitasunera itzultzea kontuan hartu gabe.");
    // INSTALACIONES
    $("#yy").html(" Gure errendimendu handiko kirol-zentroa Galdakaoko Zuhatzu tren-geltokitik metro gutxira dago.\n" +
        "Zure trebetasunak probatu nahi badituzu, zatoz gu ikustera.<br>\n" +
        "<span> DOAKO LEHEN KLASEA.</span>");
    $("#nuestras_ins").html("Ezagutu gure instalazioak.</br>");
    // COMPETICIONES
    $("#langtext4").html("Nahi duzu parte hartu lehiaketa batean? Zeure buruari desafioa egin nahi zenioke trebatuenen aurka proba eginez.\n" +
        "Ezagutu kirol honetako lehiaketa lehiakorrenak.");
    // HORARIO
    $("#l").html("Astelehena");
    $("#ma").html("Asteartea");
    $("#mi").html("Asteazkena");
    $("#j").html("Osteguna");
    $("#v").html("Ostirala");
})

// CARGAR CATEGORIAS EN INDEX TARIFAS

function cargarCategoria(event) {
    const data = {
        idCategoria: event.target.value
    };
    // La variable url está declarada en main.js y esta contiene el path actual del navegador
    $.ajax({
        url: url + 'controller/cCategoriaId.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
    }).done(response => {
        const categoria = response.answer;
        let content = '';
        if (typeof (response.answer) === 'object') {
            content = `
            <div class="card bg-dark text-light" style="width: 18rem;">
                <div class="card-title m-0 px-3">
                    <h5 class="card-title display-4">${categoria.nombre}</h5>
                    <hr class="bg-light"> 
                </div>
                <div class="card-body pt-0 text-left">
                    <p class="ml-5">Edades: ${categoria.edad}</p>
                    <p class="ml-5"><h1 class="text-center display-1"> ${categoria.precio} €</h1></p>
                    <p class="ml-5">Clases impartidas: Crossfit, Haltero, Gymnastics, Mobility..</p>
                </div>
            </div>`;
        }
        $('#card-categoria').html(content);
    })
}