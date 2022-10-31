$(document).ready(function () {

    // GO TO 
    $('#oficial').on('click', function () {

        $('html, body').animate({
            scrollTop: $("#div1").offset().top - 110
        }, 1000);

    });
    $('#sanctional').on('click', function () {

        $('html, body').animate({
            scrollTop: $("#div2").offset().top - 110
        }, 1000);
    });

    $('#spartanrace').on('click', function () {

        $('html, body').animate({
            scrollTop: $("#div3").offset().top - 110
        }, 1000);
    });


    $("#eus_competis").click(function () {

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

        // TITULOS
        $('.titulo_principal').html("Konpetizioak");
        $("#tel").html("Telefonoa");
        $("#dire").html("Helbide");
        $("#noticias").html("Berriak");
        $("#no_ti1").html("Milioiaren galdera");
        $("#no_ti2").html("Jatorria");
        $("#no_ti3").html("Onura");
        $("#no_ti4").html("Desabantailak");

        //FOOTER TITULOS
        $("#tel").html("Telefonoa");
        $("#dire").html("Helbidea");
        $("#avisolegal").html("Lege-oharra eta Boxaren baldintzak");
        $("#aviso").html("Lege-oharra");
        $("#politica").html("Pribatutasun-politika");
        $("#cookies").html("Cookien politika");
        $("#dark").html("Dark Phoenix CrossFit instagram-en");
        $("#comentario").html("Komentarioa");


        // COMPETICIONES
        $('#textComp1').html("<p> Lehiaketa hau uda guztietan ospatzen da 2007ko ekainaren 30az geroztik eta bertan,\n" +
            "atletak pistara irten baino ordu batzuk lehenago ematen zaizkien ariketa errutinetan lehiatzen dira.\n" +
            "Errutina horietako askok igogailu estandarrak eta gimnasia mugimenduak biltzen dituzte, baina batzuetan CrossFit\n" +
            "erregimen tipikoaren parte ez diren harridura elementuak biltzen dituzte; gertaera batzuetan igeriketa edo trebetasun ariketak daude,\n" +
            "hala nola pilotak jaurtitzea. </p> <p> Gertaera hau Lurreko jenderik egokienak edo Lurreko egokienak ezagutzeko eskaintzen da. </p>");
        $('#textComp2').html("<p> Egungo sailkapen moduetako bat dira eta 2019tik eskualde zaharrak ordezkatzen dituzte.\n" +
            "Zigortutako gertaerak CrossFit® markarekin loturarik ez zuten Fitness lehiaketak dira, beraz CrossFit-en paraleloan lan egin zuten Jokoak. </p>\n" +
            "<p> Erregionalak deuseztatu zirenean, jokoen antolaketa lehiaketa horietako batzuekin harremanetan jarri zen CrossFit txapelketako partaide izateko eta,\n" +
            "beraz, zigortutako Ekitaldi bakoitzeko irabazleek fase bat sortzeko. CrossFit Jokoetarako sailkapen zuzena izango lukete.\n" +
            "2019ko edizioan, aurrez fase honetan parte hartzeko baldintzak betetzen zituzten 15 gertaera zituzten jada </p>");
        $('#textComp3').html("<p> Spartan Race distantzia eta zailtasun desberdinetako oztopo ibilbide sorta da.\n" +
            "3 kilometrotik maratoiko distantzietara doaz. Estatu Batuetan egiten dira batez ere, baina 30 herrialdetan ere izaten dira,\n" +
            "Kanada, Hego Korea, Australia, Txile eta Europako hainbat herrialdetan. </p> <p> Lasterketa honen formak honako hauek dira:\n" +
            "Spartan Sprint, non 3 mila 20 oztoporekin korrika egiten duzun, Spartan Super, 8 mila 25 oztoporekin, \n" +
            "Spartan Beast, 13 milia 30 oztoporekin eta Spartan Ultra, 30 kilometro eta 60 oztopo. 11 Oztopoak berez aldatu egiten dira arraza batetik bestera .. </p> ");

        // NOTICIAS
        $("#no_front1").html("Zer behar dut crossfit praktikatzen hasi aurretik?");
        $("#no_front2").html("Zeintzuk dira Crossfit delakoaren jatorria?");
        $("#no_front3").html("Zeintzuk dira Crossfit delakoaren onura nagusiak?");
        $("#no_front4").html("Zeintzuk dira Crossfit delakoaren desabantailak?");
        $("#no_back1").html("Bada, beldurrak kanpo: krossfitero izateko ez da beharrezkoa formaz.");
        $("#no_back2").html("Gregg Glassman mugimendu honen sortzailea da.");
        $("#no_back3").html("Entrenamendu osoa da. Zerbait espezifikoan lan egin beharrean, gorputz osoa batera lantzen da.");
        $("#no_back4").html("Teknika jakin batzuk egiteko, beharrezkoa da entrenatzaile bat izatea.");
    })


    $("#es_competis").click(function () {


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
    
    

        // TITULOS
        $('.titulo_principal').html("Competiciones");
        $("#tel").html("Teléfono");
        $("#dire").html("Dirección");
        $("#noticias").html("Noticias");
        $("#no_ti1").html("La pregunta del millón");
        $("#no_ti2").html("Orígenes");
        $("#no_ti3").html("Beneficios");
        $("#no_ti4").html("Desventajas");

        //FOOTER TITULOS
        $("#tel").html("Teléfono");
        $("#dire").html("Dirección");
        $("#avisolegal").html("Aviso legal y condiciones del Box");
        $("#aviso").html("Aviso legal");
        $("#politica").html("Política de privacidad");
        $("#cookies").html("Política de cookies");
        $("#dark").html("Dark Phoenix CrossFit en instagram");
        $("#comentario").html("Comentario");

        // COMPETICIONES
        $('#textComp1').html("<p>Esta competición se lleva a cabo cada verano desde el 30 de junio de 2007 y en ella,\n" +
            "los atletas compiten en rutinas de ejercicios que les son entregadas pocas horas antes de salir a la pista.\n" +
            "Muchas de estas rutinas, comprenden levantamientos estándar y movimientos gimnásticos, pero a veces incluyen elementos sorpresa\n" +
            "que no forman parte del régimen típico de CrossFit;\n" +
            "en algunos eventos se incluye la natación o ejercicios de habilidad como lanzamiento de pelotas..</p>\n" +
            "<p>Este evento va dedicado a descubrir a las personas más en forma sobre La Tierra o «Fittest on Earth».</p>");
        $('#textComp2').html("<p> Son uno de los modos de clasificación actuales y que sustituyen a los antiguos Regionals desde 2019.\n" +
            "Los Sanctioned Events son competiciones ya existentes de Fitness que no estaban relacionadas con la marca CrossFit®,\n" +
            "por lo que funcionaban de forma paralela a los CrossFit Games.</p> <p> Al suprimirse los Regionals, la organización de los juegos\n" +
            "contactó con varias de estas competiciones para que pasasen a formar parte del campeonato de CrossFit y \n" +
            "así crear una fase en la que los ganadores de cada Sanctioned Event, tendrían una clasificación directa para los CrossFit Games.\n" +
            "En la edición de 2019, ya contaban con 15 eventos que cumplían los requisitos para formar parte de esta fase previa </p>");
        $('#textComp3').html("<p>Spartan Race es una serie de carreras de obstáculos de distancias diversas y dificultades varias.\n" +
            "Van desde las 3 millas hasta distancias de maratón. Se llevan a cabo principalmente en los Estados Unidos, pero también se realizan en 30 países,\n" +
            "incluidos Canadá, Corea del Sur, Australia, Chile y varios países europeos. </p> <p> Las formas de esta carrera incluyen el Spartan Sprint,\n" +
            "donde se corren 3 millas con 20 obstáculos, el Spartan Super, de 8 millas con 25 obstáculos, la Spartan Beast, de 13 millas con 30 obstáculos,\n" +
            "y el Spartan Ultra, de 30 millas con 60 obstáculos. 11​ Los obstáculos en sí también varían de una carrera a otra..</p>");
        // NOTICIAS
        $("#no_front1").html("¿Que necesito antes de empezar a practicar crossfit?");
        $("#no_front2").html("¿Cuáles son los origenes del Crossfit?");
        $("#no_front3").html("¿Cuáles son los principales beneficios del Crossfit?");
        $("#no_front4").html("¿Cuáles son las desventajas del Crossfit?");
        $("#no_back1").html("Pues bien, fuera miedos: para ser crossfitero no es necesario en forma.");
        $("#no_back2").html("Gregg Glassman es el fundador de este movimiento que nace como tal en California, Estados Unidos.");
        $("#no_back3").html("Es un entrenamiento completo. En lugar de trabajar en algo específico, se trabaja todo el cuerpo en conjunto.");
        $("#no_back4").html("Para realizar determinadas técnicas es necesario contar con un entrenador.");
    })
})