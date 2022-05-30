const coin = document.getElementById("coin");
const coin2 = document.getElementById("coin2");
const coin3 = document.getElementById("coin3");
const cloud = document.getElementById("cloud");
const bush = document.getElementById("bush");
const fountain = document.getElementById("fountain");
const splashes = document.getElementById("splashes");
const instructions = document.getElementById("instructions");

let status = 0;
let tries = 3;

const coinApiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h";

const cryptoWidget = document.getElementById("crypto-widget");

coin.onclick = function () {
    dropCoin()
};

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function dropCoin() {
    if (tries == 3) {
        coin.classList.add("drop-animation");
        splashes.classList.add("animate");
        fountain.classList.add("animate");

        if (status !== 1) {
            resetCoin(coin2, "try again", status);
        }
    }

    if (tries == 2) {
        coin.classList.add("drop-animation");
        splashes.classList.add("animate");
        fountain.classList.add("animate");

        if (status !== 1) {
            resetCoin(coin3, "one more", status);
        }
    }

    if (tries == 1) {
        coin.classList.add("drop-animation");
        splashes.classList.add("animate");
        fountain.classList.add("animate");

        if (status !== 1) {
            endGame();
        }
    }

    tries--;
    console.log(tries);
}

function resetCoin(e, string, status) {
    instructions.innerHTML = "";

    e.classList.add("poof");

    setTimeout(function () {
        instructions.innerHTML = string;
        coin.classList.remove("drop-animation");
        splashes.classList.remove("animate");
        fountain.classList.remove("animate");

        if (status !== 1) {
            cloud.classList.add("animate");
            bush.classList.add("animate");
        }
    }, 1200);
}

function endGame(){
    instructions.innerHTML = "";

    setTimeout(function () {
        instructions.innerHTML = "not so lucky this time around. you can try again in an hour";
        coin.remove();
        cloud.classList.remove("animate");
        bush.classList.remove("animate");
    }, 1200);

    setTimeout(function () {
        instructions.classList.add("fadeout");
        document.documentElement.classList.add("disabled")
    }, 4000);
}







fetchTopCoinsData();

async function fetchTopCoinsData(){
    const response = await fetch(coinApiUrl);
    const data = await response.json(); //extract JSON from the http response

    for (const row of data) {
        createRow(row);
    }
}

function createRow(data) {
    const newRow = document.createElement("div");
    newRow.setAttribute("class", "row");

    const newName = document.createElement("span");
    setupElement(newName,"name", data.name)

    const newPriceChange = document.createElement("span");
    let priceChangeClass = "price-change positive";
    if (data.price_change_percentage_24h < 0) {
        priceChangeClass = "price-change negative";
    }
    setupElement(newPriceChange, priceChangeClass, data.price_change_percentage_24h, "percentage")

    const newPrice = document.createElement("span");
    setupElement(newPrice,"price", data.current_price, "price")

    newRow.append(newName, newPriceChange, newPrice);

    cryptoWidget.appendChild(newRow);

    function setupElement(element, className, data, type ){
        if (type == "percentage") {
            data = Math.round(data * 100) / 100;
            data = Math.abs(data);
            data = data + "%";
        }

        if (type == "price") {
            data = "$" + data;
            data = data.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }

        element.setAttribute("class", className);
        element.appendChild(document.createTextNode(data));
    }
}

