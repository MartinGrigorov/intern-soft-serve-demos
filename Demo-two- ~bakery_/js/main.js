// function that takes the input from the daily menu and calculate price and discount
$('#quantity').on('change', function() {
    var quantity = Number($(this).val()),
        price = Number($('.single-price').text()),
        newPrice = 0;

    totalPrice = (quantity * price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");

    if (quantity > 2) {
        newPrice = ((quantity * price) / 1.2).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");

        discount = (totalPrice - newPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        totalPrice = newPrice;

        $('.discount').css('visibility', 'visible');
        $('.single-discount').text(discount);
    } else {
        $('.discount').css('visibility', 'hidden');
    }
    $('.total-price').text(totalPrice);
});

//  function that takes char from the string-number times
function generateOrderID(number) {
    var text = "",
        possible = "0123456789-MARTIN";

    for (let i = 0; i < number; i++) {
        text += possible.charAt((Math.random() * possible.length));
    }
    return text;
};

// callback function witch invoke generateOrderID function and disable the form for ordering
$('#orderButton').click(function() {

    var orderID = generateOrderID(6);

    $('#orderID').text(orderID);

    $(this).attr('disabled', 'disabled').css('background-color', 'rgb(217, 237, 226)').text('You already ordered');
    $('#orderIDp').css('visibility', 'visible');
    $('#quantity').attr('disabled', 'disabled');
});

// function that takes the input from recipes and calculate quantity for each engridient
$("#serving").on('change', function() {
    var qnt = $(this).val();
    $('.amount').each(function(index) {
        var originalAmount = $(this).attr('data-amount');
        console.log(originalAmount);
        var currentAmount = (originalAmount * qnt) / 5;
        $(this).text(currentAmount);
    });
});

//function which filtered some meal
$('#filter a').click(function() {
    $('.current').removeClass('current');

    $(this).parent().addClass('current');

    var filterVal = $(this).text().toLowerCase().replace(' ', '-');

    if (filterVal == 'all') {
        $('.recipe-item').fadeIn('slow').removeClass('hidden');
    } else {
        $('.recipe-item').each(function() {
            if (!$(this).hasClass(filterVal)) {
                $(this).fadeOut('slow').addClass('hidden');
            } else {
                $(this).fadeIn('slow').removeClass('hidden');
            }
        });
    }
});


//function which check which is the first img and swich it to the second one.
function cycleImages() {
    var $active = $('.sliderWrapper .active');

    var $next = ($active.next().length > 0) ? $active.next() : $('.sliderWrapper img:first');
    $next.css('z-index', 2); //move the next image up the pile
    $active.fadeOut(1500, function() { //fade out the top image
        $active.css('z-index', 1).show().removeClass('active'); //reset the z-index and unhide the image
        $next.css('z-index', 3).addClass('active'); //make the next image the top one
    });
};

//invoke the cycleImages() function
$(window).on('load', function() {
    setInterval('cycleImages()', 2500);
});

//function for checking which time is it at this very moment.
$(function myDate() {
    var now = new Date();
    var hours = now.getHours();

    if (hours > 7 && hours < 22) {
        if (hours >= 7 && hours <= 9) {
            $('#lunch-btn, .item-lunch').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
            $('#dinner-btn, .item-dinner').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
        } else if (hours >= 10 && hours <= 17) {
            $('#breakfast-btn, .item-breakfast').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
            $('#dinner-btn, .item-dinner').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
        } else if (hours >= 18 && hours < 22) {
            $('#breakfast-btn, .item-breakfast').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
            $('#lunch-btn, .item-lunch').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
        }
    } else {
        $('#breakfast-btn, .item-breakfast').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
        $('#lunch-btn, .item-lunch').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
        $('#dinner-btn, .item-dinner').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
        $('#if-close').html("Our Bakery-restaurant is closed, you can order from <br>8 O'clock till 21 O'clock");
        $('#if-close').removeClass('alert-info').addClass('alert-danger');
    }
});

//invoke function myDate() when the document is ready
$(document).ready(function() {
    myDate();
});


// function which zoomes images
$('.zoom').elevateZoom({
    cursor: "crosshair",
    easing: true,
    tint: true,
    tintColour: '#333',
    tintOpacity: 0.5,
    scrollZoom: true
});


//function for form validation
$(function validationOfForm() {
    var errorName = false,
        errorEmail = false,
        errorText = false,
        name = '';

    $('input[name="name"]').focusout(function() {
        nameValidation();
    });

    $('input[name="email"]').focusout(function() {
        emailValidation();
    });

    $('textarea').focusout(function() {
        textAreaValidation();
    });

    // function which validate the name input
    function nameValidation() {

        name = $('.name').val();

        if ($('.name').val().match('^[a-zA-Z]{3,16}$')) {
            $('.name').css('background-color', 'rgba(255, 255, 255, 0.39)');
            $('.erors-name').css('visibility', 'hidden');
            errorName = true;
        } else {
            $('.name').css('background-color', 'rgb(224, 27, 110)');
            $('.erors-name').css('visibility', 'visible');
        }
    }

    // function which validate the email input
    function emailValidation() {

        var email = $('.email').val();

        if ($('.email').val().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            $('.email').css('background-color', 'rgba(255, 255, 255, 0.39)');
            $('.erors-email').css('visibility', 'hidden');
            errorEmail = true;
        } else {
            $('.email').css('background-color', 'rgb(224, 27, 110)');
            $('.erors-email').css('visibility', 'visible');

        }
    }

    // function which validate the textarea
    function textAreaValidation() {
        if ($('.textarea').val() == '') {
            $('.textarea').css('background-color', 'rgb(224, 27, 110)');
            $('.erors-textarea').css('visibility', 'visible');

        } else {
            $('.textarea').css('background-color', 'rgba(255, 255, 255, 0.39)');
            $('.erors-textarea').css('visibility', 'hidden');
            errorText = true;
        }
    }
    //function which check again the inputs if one of them is incorect the button will change his css prop
    $('#modal-button').click(function() {
        if (errorText == false || errorEmail == false || errorName == false) {
            $('#modal-button').html("Your form is not correct!");
            $('#modal-button').css({'background-color': 'rgb(224, 27, 110)', 'color': 'white'});

        } else {

            $('#modal-button').html("Sending....");
            $('#modal-button').css({'background-color': 'rgb(120, 165, 233, 0.84)', 'color': 'white'})

            function modalShow() {
                $('#Send-message').modal('show');
                $('#if-send').html("<strong>" + name + "</strong> , your message was send!");
                $('#modal-button').html("Send this suggestions");
                $('input').val('');
                $('textarea').val('');

            }
            setTimeout(modalShow, 500);
        }
    });

});
