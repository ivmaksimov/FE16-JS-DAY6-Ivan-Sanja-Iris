/**
 * JavaScricpt Shopping Cart
 */
var flowers = [{
    name: "Dew",
    image: "Images/dew.jpg",
    price: 32.10,
    qtty: 1
}, {
    name: "Gazanie",
    image: "Images/gazanie.jpg",
    price: 21.40,
    qtty: 1
}, {
    name: "Sunflower8",
    image: "Images/sunflower.jpg",
    price: 45.20,
    qtty: 1
}, {
    name: "Rose",
    image: "Images/rose.jpg",
    price: 25.25,
    qtty: 1
}, {
    name: "Petals",
    image: "Images/petals.jpg",
    price: 29.99,
    qtty: 1
}, {
    name: "Wildflower",
    image: "Images/wildfl.jpg",
    price: 11.80,
    qtty: 1
}, {
    name: "Liverflower",
    image: "Images/liverflower.jpg",
    price: 31.05,
    qtty: 1
}, {
    name: "Lily",
    image: "Images/lily.jpg",
    price: 42.50,
    qtty: 1
}, {
    name: "Anemone",
    image: "Images/anemone.jpg",
    price: 32.00,
    qtty: 1
}];

//for SORTING ad a function = "" so that you can call it later in sortUp
for (let value of flowers) {
    document.getElementsByClassName("flower")[0].innerHTML += `<div class="flower mb-5col-12 col-md-6 col-lg-4 text-center fw-bold">
    <div class="card text-white"><img class="flower-image" src="${value.image}" width="200" height="200">
    <div class="card-img-overlay">
    <h5 class="flower-title text-white card-title">${value.name}</h5>
      </div>  </div>

    <div class="flower-details">
        <p class="flower-price h4 m-3">${value.price} €</p>
        <button class="btn btn-primary flower-button" type="button">ADD TO CART</button>
    </div>
    </div>
    `;
}
let sortPrUp = document.getElementById('sortUp');

sortPrUp.addEventListener("click", function() {
    sortUp();
    createRows();
    summary();
    countItems();
});



function sortUp() { //6.2
    flowers.sort((a, b) => a.price - b.price);
    //document.getElementsByClassName("cart-quantity")[index].innerHTML = cart[index].qtty;
    console.table(flowers);
}

var cart = [];

function addToCart(flower) { //1
    if (cart.find((value) => value.name == flower.name)) { //3
        flower.qtty++;
    } else {
        cart.push(flower); //1
    }
    summary();
    countItems();
    discount();
    createRows();

    // console.table(cart); //1
}
let buttons = document.getElementsByClassName("flower-button"); //2
for (let i = 0; i < buttons.length; i++) { //has to be LET not VAR
    buttons[i].addEventListener("click", function() {
        addToCart(flowers[i]);
    })
}
// var result = ""; // have to be outside of the LOOP to not overwrite the last entrit

function createRows() { //4

    document.getElementById("cart-items").innerHTML = ""; //have outside and inside the loop instead of result is = to empty string

    for (let value of cart) { //doens't matter if you have the same name as up"val/value...""
        document.getElementById("cart-items").innerHTML += `<div class="cart-row row d-flex">
    <div class="cart-item col-6 my-3 ">
        <img class="cart-item-image" src="${value.image}" width="100" height="100">
        <span class="cart-item-title h5 ">${value.name}</span>
    </div>
    
    <span class="cart-price col-3 h4 my-3">${value.price} €</span>
   
    <div class="cart-qtty-action col-3 d-flex">            
        <i class="minus fa fa-minus-circle my-auto" ></i>            
        <div class="cart-quantity p-4 h4">${value.qtty}</div>            
        <i class="plus fa fa-plus-circle my-auto"></i>         
        <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
    </div>
    </div>`;
    }
    let plus = document.getElementsByClassName('plus'); //6
    let minus = document.getElementsByClassName("minus"); //7
    let deleTe = document.getElementsByClassName("del"); //8

    for (let i = 0; i < plus.length; i++) { //6.1
        plus[i].addEventListener("click", function() {
            plusQuantity(i);
            summary();
            countItems();
        });
        minus[i].addEventListener("click", function() { //7.1
            minusQuantity(i);
            summary();
            countItems();
        })
        deleTe[i].addEventListener("click", function() { //8.1
            deleteFlower(i);
            summary();
            countItems();
        });


    }

    // document.getElementById("cart-items").innerHTML = result;
}

function countItems() { //9
    let countItems = 0;
    for (let value of cart) {
        countItems = countItems + value.qtty;
    }
    document.getElementById("count").innerHTML = countItems;

}

function plusQuantity(index) { //6.2
    cart[index].qtty++;
    document.getElementsByClassName("cart-quantity")[index].innerHTML = cart[index].qtty;
}

function minusQuantity(index) { //7.2
    if (cart[index].qtty == 1) { // if just one product 
        cart.splice(index, 1); //sPPPlice not slice
        createRows();
    } else {
        cart[index].qtty--; // if more than one product same product
        document.getElementsByClassName("cart-quantity")[index].innerHTML = cart[index].qtty;

    }
}

function deleteFlower(index) { //6.2
    cart[index].qtty = 1; // to be = to 1 and than cut it offfff
    cart.splice(index, 1);
    createRows();
}


//10% on EUR 100,-
function discount(price) {
    let summary;
    if (price >= 100) {
        summary = price * 0.1;
    } else {
        summary = 0;
    }
    return summary;
    // document.getElementById("action").innerHTML = summary;
}


function summary() { //5
    let summary_value = 0;
    for (let value of cart) {
        summary_value = summary_value + (value.qtty * value.price)
    }
    let final_discount = discount(summary_value)
    console.log(final_discount);
    document.getElementById("price").innerHTML = summary_value.toFixed(2) + " €"; //.toFixed(2) to be a decimal with 2 numbers after dot
}