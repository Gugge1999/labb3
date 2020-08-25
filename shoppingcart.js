//classes
var ShoppingCart = class {
  constructor() {
    this.cartArray = new Array();
  }
  addToCart(product) {
    //find the product in the Array
    //if so increament its quantity by 1
    let foundAtIndex = this.indexOfProductInCartArray(product);
    if (foundAtIndex != -1) {
      this.cartArray[foundAtIndex].qty++;
    } else {
      //the product is not in the array so add it.
      product.qty = 1;
      this.cartArray.push(product);
    }
  } //end method

  indexOfProductInCartArray(product) {
    let foundAtIndex = -1;
    //loop to find if the product is in the Array
    //if it's, return itÂ´s indexposition
    for (let i = 0; i < this.cartArray.length; i++) {
      // is there a match on the product's name?
      if (this.cartArray[i].name === product.name) {
        foundAtIndex = i;
        return foundAtIndex;
      }
    } //end for
    //product not in the array return -1
    return foundAtIndex;
  } //end method

  deleteFromCart(product) {
    //find if the product is in the Array
    //if so decrement its quantity by 1
    let foundAtIndex = this.indexOfProductInCartArray(product);
    if (foundAtIndex != -1) {
      this.cartArray[foundAtIndex].qty--;
    }
    //if found product qty is 0, remove it from array.
    if (this.cartArray[foundAtIndex].qty == 0) {
      this.cartArray.splice(foundAtIndex, 1);
    }
  } //end method

  totalToPay() {
    let totPay = 0;
    for (let i = 0; i < this.cartArray.length; i++) {
      //loop to multiply price and qty from each product
      //then add to totPay
      totPay += this.cartArray[i].price * this.cartArray[i].qty;
    }
    return totPay;
  } //end method

  numberOfProducts() {
    let numberofproducts = 0;
    for (let i = 0; i < this.cartArray.length; i++) {
      //loop to add qty from each product
      //to numberofproducts
      numberofproducts += this.cartArray[i].qty;
    }
    return numberofproducts;
  } //end numberofproducts
  showProductsInCart() {
    //empty table
    tablecart.innerHTML = '';
    //start rewriting table content;
    tablecart.innerHTML = '<tr><td>Name</td><td>Price</td><td>Qty</td><td>Amount</td><td><td></tr>';
    //loop to create a tr  and td's for each product in the cartarray
    this.cartArray.forEach(function (element, idx) {
      //create tr with its cells for each product
      let tr = tablecart.insertRow(-1);
      let tdName = tr.insertCell(-1);
      tdName.textContent = element.name; //add product name to td

      let tdPrice = tr.insertCell(-1);
      tdPrice.textContent = element.price; //add product price to td

      let tdQty = tr.insertCell(-1);
      tdQty.textContent = element.qty; //add product qty to td

      let tdAmount = tr.insertCell(-1);
      //add amount by multiply product qty and price to td
      tdAmount.textContent = element.qty * element.price;

      let tdPlus = tr.insertCell(-1);
      tdPlus.innerHTML = "<i class='glyphicon glyphicon-plus'></i>";
      tdPlus.addEventListener('click', function () {
        //cart.addToCart(element);
        //cart.showProductsInCart();
        cart.addToCart(element);
        cart.showProductsInCart();
      }); //end event listener

      let tdMinus = tr.insertCell(-1);
      tdMinus.innerHTML = "<i class='glyphicon glyphicon-minus'></i>";
      tdMinus.addEventListener('click', function () {
        //cart.deleteFromCart(element);
        //cart.showProductsInCart();
        cart.deleteFromCart(element);
        cart.showProductsInCart();
      }); //end event listener
    }); //end foreach
    //new tr and td for total to pay for all products
    let trTotal = tablecart.insertRow(-1);
    let tdTotalToPay = trTotal.insertCell(-1);

    tdTotalToPay.innerHTML = '<b>You pay: ' + this.totalToPay() + '</b>';
    tdTotalToPay.colSpan = 6;
    tdTotalToPay.align = 'right';

    //and info to badge
    let badge = document.querySelector('.badge');
    badge.textContent = 'qty:' + this.numberOfProducts() + ' $' + this.totalToPay();
    //epty array if
  } //end showProductsInCart
}; //end class ShoppingCart

function getProducts() {
  let cart = JSON.parse(sessionStorage.getItem('cart'));
  initShop(cart);
}

var Product = class {
  constructor(name, price) {
    //instanvariables
    this.name = name;
    this.price = price;
    this.qty = 0;
  } //end constructor
}; //end class Product

//Gsbal variables
var cart = new ShoppingCart();
var tableProducts = document.querySelector('#tblProducts');
var tablecart = document.querySelector('#tblCart');

function initShop(data) {
  //create array of products for sale in our little shop
  let productsForSale = data;

  productsForSale.forEach(function (element, idx) {
    //create tr and td for product for sale
    let tr = tableProducts.insertRow(-1);
    let tdName = tr.insertCell(-1);
    let tdPrice = tr.insertCell(-1);
    let tdAddToCart = tr.insertCell(-1);
    //let tdVoteUp=tr.insertCell(-1);
    //let tdVoteDown=tr.insertCell(-1);

    tdAddToCart.innerHTML = "<i class='glyphicon glyphicon-shopping-cart'></i>";
    tdAddToCart.addEventListener('click', function () {
      cart.addToCart(element);
      cart.showProductsInCart();
    });
    tdName.textContent = element.name;
    tdPrice.textContent = element.price;
    // sessionStorage.clear();
    //tdVoteUp.innerHTML="<i class='glyphicon glyphicon-hand-up'></i>";
    //tdVoteDown.innerHTML="<i class='glyphicon glyphicon-hand-down'></i>";
  }); //end foreach
} //end function
