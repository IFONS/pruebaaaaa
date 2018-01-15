$(document).ready(inicio,eventos);
function inicio()
{
    validarFormAnuncio();
    /**
    * funcion para que solo se vea el login al principio
    */
    //mostrarLogin();
    cabecera();
    comprobarContraseña();

}
function registro()
{
    //comprobar correo()
    comprobarContraseña();
}
function login()
{
    comprobarCorreoL();
}

function cabecera()
{
    /**
     * funcion para que cuando pinchen en login solo se vea el login
     */
    $("#loginBtn").click(mostrarLogin);
    /**
     * funcion para que cuando pinchen en sign up solo se vea el formulario de sign up
     */
    $("#registerBtn").click(mostrarSingUp);
    /**
     * funcion para que cuando pinchen en login solo se vea el login
     */
    $("#log").click( mostrarLogin);
    /**
     * funcion para que cuando pinchen en sign up solo se vea el formulario de sign up
     */
    $("#sig").click(mostrarSingUp);
    registro();
    login();
}

function comprobarCorreoL()
{
    $('#emailoLog').on('focusout',
        function (e)
        {
            e.preventDefault(); //parar el submit para que no se envíe el formulario recargando la página.
            var datos = $(this).serialize();
            var email=$('#emailoLog').text(datos)
            //Envía el formulario vía AJAX. Recoge el resultado en la callback.
            $.ajax
            ({
                type: 'POST',
                url: 'server.php',
                data: email,
                success: function (data)
                {
                    console.log('Llamada OK --> '+email);
                    alert('Llamada OK --> '+email);
                }
            });
        });
}
function comprobarContraseña()
{
    var cont1=$('#passwordReg').val();
    var cont2=$('#passwordReg2').val();

        $('#passwordReg2').on('blur',
           function ()
           {
               if (cont1==cont2)
               {
                   $('#thub2').html('<div class="alert alert-success" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\\n\' +\n' +
                       '                \'  <strong>Warning!</strong> Better check yourself, you\\\'re not looking too good.</div>');
               }
               else
               {
                   $('#thub2').html('<div class="alert alert-danger" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
                       '  <strong>Warning!</strong> Better check yourself, you\'re not looking too good.</div>');
               }
           }
        )

}
function mostrarLogin()
{
    window.location.href = "http://none.com/views/login.php";
    /**
    *Oculta los divs que no nos interesa mostrar y muestro el que queremos
    */
    $("#thubRegister").hide();
    $("#thubLogin").show();

}
function mostrarSingUp()
{   /**
    *Oculta los divs que no nos interesa mostrar y muestro el que queremos
    */
    $("#thubLogin").hide();
    $("#thubRegister").show();
}


/********************************************************/
/*************************JOVI***************************/
/*||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
/*VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV*/

//$(document).ready(eventos);

function eventos(){
    validarFormAnuncio();
    limpiarWarnings();
    comprobarVaciosBlur();
}


function limpiarWarnings(){
    $(".formAnuncio input[type='text']").click(function(){
        $(this).next().removeClass("alert alert-danger");
        $(this).next().html("");
    });
}
function comprobarVaciosBlur(){
    $(".formAnuncio input[type='text']").blur(function(){
        if( $(this).val().length ===0 ) {
            $(this).next().addClass("alert alert-danger");
            $(this).next().html("<strong>Campo vacio!</strong> Por favor, rellena todos los campos");
        }
    });
}
function validarFormAnuncio() {
    var nombre = $("input[name='nombreAnuncio']").val();
    var precio = $("input[name='precio']").val();
    $(".formAnuncio").submit(function (e){
        if(comprobarVacios($(".formAnuncio input[type='text']"))==false ){
            e.preventDefault();
        }else if(comprobarFormato(nombre,precio)==false){
            e.preventDefault();
        }
    });
}

function comprobarVacios(input){
    var validado =true;
    for(var x=0;x<input.length||validado==true;x++){
        if($(input[x]).val().length ===0){
            $(input[x]).next().addClass("alert alert-danger");
            $(input[x]).next().html("<strong>Campo vacio!</strong> Por favor, rellena todos los campos");
            validado=false
        }
    }
    if (validado == false) {
        return false;
    }
    return true;
}
function comprobarFormato(nombre,precio){
    var nomRegExp = new RegExp("^[a-zA-Z ]{2,30}$");
    var priceRegExp = new RegExp(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/);
    var validado = true;
    if (!nomRegExp.test(nombre)){
        $(nombre).next().addClass("alert alert-danger");
        $(nombre).next().html("<strong>Formato invalido!</strong> El nombre escrito no puede contener numeros ni caracteres especiales");
        validado = false;
    }
    if (!priceRegExp.test(precio)){
        $(precio).next().addClass("alert alert-danger");
        $(precio).next().html("<strong>Formato invalido!</strong> El precio escrito no puede contener letras, solo puntos y comas aceptados como caracteres");
        validado = false;
    }
    if(validado==false){
        return false;
    }
    return true;
}
