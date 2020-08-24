// Classes
var ShoppingCart=class{
    constructor(){
        this.cartArray=new Array();
    }
    addToCart(product){
        // find the product in the Array
        // if so increment its quantitybr 1
        let foundAtIndex = this.indexOfProductInCartArray(product);
        if(foundAtIndex!=-1){
            this.cartArray[foundAtIndex].qty++;
        }
        else{
            // the product is not the array so add it.
            product.qty=1;
            this.cartArray.push(product);
        }
    }
    deleteFromCart(product){
        // let foundAtIndex=-1
        // find if the product is in the array
        // if so decrement its quanity by 1
        let foundAtIndex=this.indexOfProductInCartArray(product);
        if(foundAtIndex!=-1){
            this.cartArray[foundAtIndex].qty--;
        }
        // if found product qty is 0, remove it from array
        if(this.cartArray[foundAtIndex.qty==0]){
            this.cartArray.splice(foundAtIndex,1);
        }
    }
    indexOfProductInCartArray(product){
        let foundAtIndex=-1;
        // loop to find if the product is in the array
        // if so decrement its quantity by 1
        for(let i=0;i<this.cartArray.length;i++){
            if(this.cartArray[i].name===product){
                foundAtIndex=i;
                return foundAtIndex;
            }
        }
        return foundAtIndex;
    }
    totalToPay(){
        let toPay=0;
        for(let i=0;i<this.cartArray.length;i++){
            toPay+=this.cartArray[i].price*this.cartArray[i].qty;
        }
        return toPay;
    }
    numberOfProducts(){
        let totalNumbers=0;
        for(let i=0;i<this.cartArray.length;i++){
            totalNumbers+=this.cartArray[i].qty;
        }
        return totalNumbers;
    }
    showProductsInCart(){
        // Create header info cart table
        tablecart.innerHTML="";
        tablecart.innerHTML="<tr><td>Name</td><td>Price</td><td>Qty</td><td>Amount</td><td><td></tr>";

        // Loops the cart array to display it's products
        this.cartArray.forEach(function(element, idx){
            // create tr qith its cells for each product
            let tr=tablecart.insertRow(-1);
            let tdName=tr.incertCell(-1);
            let tdPrice=tr.incertCell(-1);
            let tdQty=tr.incertCell(-1);
            let tdPay=tr.incertCell(-1);
            let tdPlus=tr.incertCell(-1);
            let tdMinus=tr.incertCell(-1);
            tdName.textContent=element.name;
            tdPrice.textContent=element.price;
            tdQty.textContent=element.qty;
            tdPay.textContent =element.price*element.qty;

            tdPlus.innerHTML="<i class='glyphcion glyphcion-plus>'</i>"
            tdPlus.addEventListener("click", function(){
                cart.addToCart(element);
                cart.showProductsInCart();
            });

            tdMinus.innerHTML="<i class='glyphcion glyphcion-minus>'</i>"
            tdMinus.addEventListener("click", function(){
                cart.deleteFromCart(element);
                cart.showProductsInCart();
            });
        }); // End foreach
        let trTotal=tablecart.insertRow(-1);

        let tdTotaltoPay=trTotal.insertCell(-1);
        tdTotaltoPay.innerHTML="<b>You pay: "+this.totalToPay() + "</br>";
        tdTotaltoPay.colSpan=6;
        tdTotaltoPay.align="right";
        // And into to badge
        let badge=document.querySelector(".badge");
        badge.textContent="qty:"+this.numberOfProducts()+ " $"+this.totalToPay();
    } // End showProductsInCart()
} // End classes