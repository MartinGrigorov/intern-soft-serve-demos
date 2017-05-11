

// function that takes the input from the daily menu and calculate price and discount
function calc() {
    var quantity = Number(document.getElementsByClassName('quantity')[0].value),
        price = Number(document.getElementsByClassName('single-price')[0].innerHTML),
        newPrice = 0,

        totalPrice = quantity * price;

    if (quantity > 2) {
        newPrice = (quantity * price) / 1.2;

        discount = totalPrice - newPrice;
        totalPrice = newPrice;

        document.getElementsByClassName('discount')[0].style.visibility = 'visible';
        document.getElementsByClassName('single-discount')[0].innerHTML = (discount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    } else {
        document.getElementsByClassName('discount')[0].style.visibility = 'hidden';
    }

    document.getElementsByClassName('total-price')[0].innerHTML = (totalPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

//  function that takes char from the string-number times
function generateOrderID(number) {
    var text = "",
        possible = "0123456789-MARTIN";

    for (let i = 0; i < number; i++){
      text += possible.charAt((Math.random() * possible.length));
    }

    return text;
}


// callback function witch invoke generateOrderID function and disable the form for ordering
function orderID() {
    var orderID = generateOrderID(6);

    document.getElementById('orderID').innerHTML = orderID;

    document.getElementById('orderButton').disabled = true;
    document.getElementById('orderButton').setAttribute('style', 'background-color:rgb(217, 237, 226)');
    document.getElementById('orderButton').innerHTML = 'You already ordered';
    document.getElementById('orderIDp').style.visibility = 'visible';
    document.getElementById('quantity').disabled = true;

}

// function that takes the input from recipes and calculate quantity for each engridient
function calculateIngridients() {
    var qnt = document.getElementById('serving').value,
        amounts = document.querySelectorAll('span[data-amount]'),

        kilos = document.querySelectorAll('kilos');


    for (let i = 0; i < amounts.length; ++i) {
        var originalAmount = amounts[i].getAttribute('data-amount');

        var currentAmount = (originalAmount * qnt) / 5;
        amounts[i].innerHTML = currentAmount;
    }

}
