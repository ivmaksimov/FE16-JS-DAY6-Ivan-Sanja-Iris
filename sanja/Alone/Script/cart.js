/**
 * JavaScricpt Shopping Cart
 */
var flowers = [{
    name: "Dew",
    image: "Images/dew.jpg",
    price: 32.00,
    qtty: 1
}, {
    name: "Gazanie",
    image: "Images/gazanie.jpg",
    price: 21.00,
    qtty: 1
}, {
    name: "Sunflower8",
    image: "Images/sunflower.jpg",
    price: 45.00,
    qtty: 1
}, {
    name: "Rose",
    image: "Images/rose.jpg",
    price: 25.00,
    qtty: 1
}, {
    name: "Petals",
    image: "Images/petals.jpg",
    price: 29.00,
    qtty: 1
}, {
    name: "Wildflower",
    image: "Images/wildfl.jpg",
    price: 11.00,
    qtty: 1
}, {
    name: "Liverflower",
    image: "Images/liverflower.jpg",
    price: 31.00,
    qtty: 1
}, {
    name: "Lily",
    image: "Images/lily.jpg",
    price: 42.00,
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
    `
}
var cart = [];

function addToCart(flower) { //1
    if (cart.find((value) => flower.name === value.name)) { //3
        flower.qtty++;
    } else {
        cart.push(flower); //1
    }

    console.table(cart); //1
}
let buttons = document.getElementsByClassName("flower-button"); //2
for (let i = 0; i < buttons.length; i++) { //has to be LET not VAR
    buttons[i].addEventListener("click", function() {
        addToCart(flowers[i]);
    })
}