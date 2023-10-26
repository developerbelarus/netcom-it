$(".form-submit").unbind().on("submit", function (event) {
    event.preventDefault();

    const form = new FormData($(this)[0]);

    var thisForm = $(this)[0]

    var valid = true;

    var noChars = ["!", "@", "№", "$", ";", "%", "^", ":", "&", "?", "*", "(", ")",
        "_", "-", "+", "=", "<", ">", "'", ",", "/", "|", "]", "[", "{", "}", "`", "~", "'",
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "#"];

    if (form.has("tel")) {
        var str = form.get("tel")
        str = str.split("-").join("");
        str = str.split("(").join("");
        str = str.split(")").join("");
        str = str.split("+").join("");
        str = str.split(" ").join("");

        if (str.length !== 12) {
            $(this).find("input[name='tel']").removeClass("yes-valid")
            $(this).find("input[name='tel']").addClass("no-valid");
            $(this).find("input[name='tel']").prev().removeClass('yes-valid');
            $(this).find("input[name='tel']").prev().addClass('no-valid');
            valid = false;
        } else {
            $(this).find("input[name='tel']").removeClass("no-valid")
            $(this).find("input[name='tel']").addClass("yes-valid");
            $(this).find("input[name='tel']").prev().removeClass('no-valid');
            $(this).find("input[name='tel']").prev().addClass('yes-valid');
        }

    }

    if (form.has("name")) {
        if (!form.get("name")) {
            $(this).find("input[name='name']").addClass("yes-valid");
            return true;
        }

        var str = form.get("name").split("");
        for (var i = 0; i < str.length; i++) {
            for (var i1 = 0; i1 < noChars.length; i1++) {
                if (str[i] === noChars[i1]) {
                    $(this).find("input[name='name']").removeClass("yes-valid");
                    $(this).find("input[name='name']").addClass("no-valid");
                    $(this).find("input[name='name']").prev().removeClass('yes-valid');
                    $(this).find("input[name='name']").prev().addClass('no-valid');
                    valid = false;
                    return false
                } else {
                    $(this).find("input[name='name']").removeClass("no-valid");
                    $(this).find("input[name='name']").addClass("yes-valid");
                    $(this).find("input[name='name']").prev().removeClass('no-valid');
                    $(this).find("input[name='name']").prev().addClass('yes-valid');
                }
            }
        }
    }

    if($(thisForm).attr('data-id') === 'popup-1'){
        if (valid){

            const xml = new XMLHttpRequest();
            xml.open("POST", "../php/form.php");
            xml.send(form);

            xml.onload = () => {
                if (xml.status != 200){
                    $('#load').addClass('load-error')
                }else{
                    $('#load').addClass('load-yes')
                    $(this).find("input[type='text']").val("")
                    $('.yes-valid').removeClass('yes-valid')
                    $('.no-valid').removeClass('yes-valid')
                    console.log(xml.status)
                }
            }
        }
    }else if($(thisForm).attr('data-id') === 'popup-2'){
        if (valid){

            const xml = new XMLHttpRequest();
            xml.open("POST", "../php/form2.php");
            xml.send(form);

            xml.onload = () => {
                if (xml.status != 200){
                    $('#load').addClass('load-error')
                }else{
                    $('#load').addClass('load-yes')
                    $(this).find("input[type='text']").val("")
                    $('.yes-valid').removeClass('yes-valid')
                    $('.no-valid').removeClass('yes-valid')
                    console.log(xml.status)
                }
            }
        }
    }else{

    }
});

$("input.input-text").on("click", function () {
    $(this).removeClass("no-valid")
    $(this).removeClass("yes-valid")
})


$(function(){
    $('.menu-toggle').unbind().on('click', function (){
        $(this).toggleClass('active');
        $('#header-menuList').toggleClass('active');
        $('#header-logo').toggleClass('active');
    });

    $(window).on('scroll', fixedHeader)
    fixedHeader()

    $('.close-popup-js').on('click', function (){
        $('.popup').removeClass('active')
        $('body').removeClass('active-popup')
        $('.yes-valid').removeClass('yes-valid')
        $('.no-valid').removeClass('no-valid')
    });

    $('.open-popup-js').on('click', () => openPopup('#popup-1'));
    $('.open-popup-js-2').on('click', () => openPopup('#popup-2'))


    //Маски для телефонов
    $('.input-js').mask('+375 (99) 999-99-99')

    $('[data-href]').on('click', function (event){
        event.preventDefault();

        var toGoPosition = $($(this).attr('data-href')).offset().top;
        $('html, body').animate({
            scrollTop: toGoPosition - 200
        }, 500);

        $('.menu-toggle').toggleClass('active');
        $('#header-menuList').toggleClass('active');
        $('#header-logo').toggleClass('active');
    })

    $('.load__message-link').on('click', function (){
        $('#load').removeClass('load-load load-yes load-error');
        $('.popup').removeClass('active');
    })
})

//header to fixed
var header = $('#header')
var intro = $('#intro')
var popup = $('#popup-1')
var popup2 = $('#popup-2')
var positionWindow = $(window).scrollTop()

function fixedHeader(){
    positionWindow = $(this).scrollTop()
    if(positionWindow > intro.innerHeight()){
        if(!header.hasClass('fixed')) {
            header.removeClass('visible')
            header.addClass('fixed')
        }
    }else{
        header.removeClass('fixed')
        header.addClass('visible')
    }
}

function openPopup(object){
    $(object).addClass('active')
    $('body').addClass('active-popup')
    $('.yes-valid').removeClass('yes-valid')
    $('.no-valid').removeClass('no-valid')
}