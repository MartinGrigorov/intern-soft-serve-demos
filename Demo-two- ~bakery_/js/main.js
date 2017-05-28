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
}

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

$('ul#filter a').click(function() {
    $(this).css('outline', 'none');
    $('ul#filter .current').removeClass('current');
    $(this).parent().addClass('current');

    var filterVal = $(this).text().toLowerCase().replace(' ', '-');

    if (filterVal == 'all') {
        $('#portfolio .recipe-item.hidden').fadeIn('slow').removeClass('hidden');
    } else {
        $('#portfolio .recipe-item').each(function() {
            if (!$(this).hasClass(filterVal)) {
                $(this).fadeOut('slow').addClass('hidden');
            } else {
                $(this).fadeIn('slow').removeClass('hidden');
            }
        });
    }

    return false;
});

function cycleImages() {
    var $active = $('.sliderWrapper .active');
    var $next = ($active.next().length > 0)
        ? $active.next()
        : $('.sliderWrapper img:first');
    $next.css('z-index', 2); //move the next image up the pile
    $active.fadeOut(1500, function() { //fade out the top image
        $active.css('z-index', 1).show().removeClass('active'); //reset the z-index and unhide the image
        $next.css('z-index', 3).addClass('active'); //make the next image the top one
    });
}

$(window).on('load', function() {
    setInterval('cycleImages()', 2500);
});

function myDate() {
    var now = new Date();
    var hours = now.getHours();

    if (hours > 7 && hours < 22) {
        if (hours > 7 && hours < 11) {
            $('#lunch-btn, .item-lunch').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
            $('#dinner-btn, .item-dinner').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
        } else if (hours > 11 && hours < 17) {
            $('#breakfast-btn, .item-breakfast').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
            $('#dinner-btn, .item-dinner').attr('data-toggle', 'modal').attr('data-target', '#error').attr('href', '#');
        } else if (hours > 17 && hours < 22) {
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
}

$(document).ready(function() {
    myDate();
});

// function that zoomes images
$('.zoom').elevateZoom({
  cursor: "crosshair",
  easing:true,
  tint:true,
  tintColour:'#333',
  tintOpacity:0.5,
  scrollZoom:true
});
