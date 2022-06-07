


let dropBtn = document.getElementById("nav-categories");
let dropMenu = document.getElementById("nav-dropdown");


let showMenu = ()=> {
  if (dropMenu.style.display ==="none") {
  dropMenu.style.display ="block";
  } else {
    dropMenu.style.display ="none";
  }
}

let basket = JSON.parse(localStorage.getItem("data")) || [];

let main = document.getElementById("main");

let displayCards = () => {
  return (main.innerHTML = itemsData.map((x) => {
    let {id, name, price, desc, img} = x;
    let search = basket.find((x) => x.id === id) || []
    return `
      <div id=product-id-${id} class="card">
        <img width="298" src="${img}" alt="" />
        <div class="card-body">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
                ${search.item === undefined? 0: search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`
  }).join(""));
};
displayCards();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x)=> x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item +=1;
  }
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x)=> x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -=1;
  }
  update(selectedItem.id);
  basket = basket.filter((x)=> x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x)=> x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = ()=> {
  let cartIcon = document.getElementById("shop-cart-items-count");
  cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y,0);
}

calculation();