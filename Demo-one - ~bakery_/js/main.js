function calc() {
    var quantity = Number(document.getElementsByClassName('quantity')[0].value),
        price = Number(document.getElementsByClassName('single-price')[0].innerHTML);

    var totalPrice = quantity * price;

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

function generateOrderID(l) {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < l; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function orderID() {
    var orderID = generateOrderID(6);

    document.getElementById('orderID').innerHTML = orderID;
    document.getElementById('orderButton').disabled = true;
    document.getElementById('orderIDp').style.visibility = 'visible';
}

function calculateIngridients() {
    var qnt = document.getElementById('serving').value;
    var amounts = document.querySelectorAll('span[data-amount]');
    var kilos = document.querySelectorAll('kilos');

    for (let i = 0; i < amounts.length; ++i) {
        var originalAmount = amounts[i].getAttribute('data-amount');

        var currentAmount = (originalAmount * qnt) / 5;
        amounts[i].innerHTML = currentAmount;
    }

}
