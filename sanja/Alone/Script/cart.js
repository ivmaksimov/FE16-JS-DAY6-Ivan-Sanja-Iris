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
for (let value of flowers) {
    document.getElementsByClassName("flower")[0].innerHTML += `<div class="flower col-12 col-md-6 col-lg-4 text-center fw-bold">
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
var cart = [];

function addToCart(flower) { //1
    if (cart.find((value) => value.name == flower.name)) { //3
        flower.qtty++;
    } else {
        cart.push(flower); //1
    }
    summary();
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
        });
        minus[i].addEventListener("click", function() { //7.1
            minusQuantity(i);
            summary();
        })
        deleTe[i].addEventListener("click", function() { //8.1
            deleteFlower(i);
            summary();
        });


    }

    // document.getElementById("cart-items").innerHTML = result;
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

function summary() { //5
    let summary = 0;
    for (let value of cart) {
        summary = summary + (value.qtty * value.price)
    }
    document.getElementById("price").innerHTML = summary.toFixed(2) + " €"; //.toFixed(2) to be a decimal with 2 numbers after dot
}