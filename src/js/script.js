var app = angular.module('myApp', ['moduloTeste', 'ngMessages']);



app.controller('myCtrl', function ($scope, $q, customUtils) {
    var self = this;

    const content = '<div class="carousel-item">' +
        '<img class="d-block vh-100 mx-auto" src="/mge/AD_TGEDSIMG@IMAGEM@IDIMG=!!PLACEHOLDER!!.dbimage" alt="Terceiro Slide">' +
        '</div>';

    let where = '((ISNULL(IMG.DTINI, IMG.DTFIM) <= CAST(GETDATE() As Date)' +
        'AND IMG.DTFIM >= CAST(GETDATE() As Date))' +
        'OR IMG.PERMANENTE = \'S\') AND ' +
        'IMG.IMAGEM IS NOT NULL';

    var promisse = customUtils.loadFromQuery("IDIMG", "AD_TGEDSIMG IMG", where, true);

    promisse.then((result) => {

        result.forEach(element => {
            $("#carousel > .carousel-inner").append(content.replace("!!PLACEHOLDER!!", element.IDIMG));
        });

        if (result.length === 0) {
            $("#carousel > .carousel-inner").append('<div class="carousel-item">' +
                '<img class="d-block vh-100 mx-auto" src="https://www.folhavitoria.com.br/geral/blogs/empregoseconcursos/wp-content/uploads/2021/04/Marca-Ambiental.jpg" alt="First slide">' +
                '</div>');
        }

        let count = result.length;

        if (count === 0) {
            count++;
        }

        let num = 15000 / 2

        $(".carousel-item").first().addClass("active");
        $('.carousel').carousel({
            interval: parseInt(num) // set your desired interval
        });
        $('.carousel').carousel('cycle');

    }).catch((err) => {
        console.log(err);
    });

});
