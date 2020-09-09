// Instance variables
let cartArray = [];

/* Start getProducts*/
function getProducts() {
  $.getJSON('http://127.0.0.1:3000/products/', function (jsondata) {
    showCards(jsondata);
  });
} /* End getProducts*/

function showCards(jsondata) {
  let cardgroup = $('#all-cards');

  let cardrow = document.createElement('div');
  cardrow.setAttribute('class', 'row');

  for (i = 0; i < jsondata.length; i++) {
    let cardcolumn = document.createElement('div');
    cardcolumn.setAttribute('class', 'col-sm-12 col-md-6 col-lg-3 card-margin');

    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('style', 'width: 100%');

    let cardbody = document.createElement('div');
    cardbody.setAttribute('class', 'card-body');

    let cardtitle = document.createElement('h5');
    cardtitle.setAttribute('class', 'card-title');
    cardtitle.innerHTML += jsondata[i].name;

    let cardtext = document.createElement('p');
    cardtext.setAttribute('class', 'card-text');
    cardtext.innerHTML += jsondata[i].price;

    let readmoreButton = document.createElement('button');
    readmoreButton.setAttribute('class', 'btn btn-primary');
    readmoreButton.innerHTML += 'Read more';
    readmoreButton.setAttribute('data-toggle', 'modal');
    readmoreButton.setAttribute('data-target', '#detailsModal');
    readmoreButton.setAttribute('data-name', jsondata[i].name);
    readmoreButton.setAttribute('data-description', jsondata[i].description);
    readmoreButton.setAttribute('data-price', jsondata[i].price);

    let addButton = document.createElement('button');
    addButton.setAttribute('class', 'btn btn-success');
    addButton.innerHTML += 'Add';
    addButton.setAttribute('id', jsondata[i].ID);

    let findID = jsondata[i].ID;

    $(addButton).on('click', function () {
      // Denna metod hittar det första objektet av något genom att köra alla json objekt och kollar
      // sen där jsonItem.id = det id som finns på produktern och tilldellar sedan detta objekt till item.
      let item = jsondata.find((jsonItem) => jsonItem.ID == addButton.getAttribute('id'));
      cartArray.push(item);
      var uniqueItems = [...new Set(cartArray)]; // uniqueItems söker genom cartArray och tar bort dubbletter
      sessionStorage.setItem('cart', JSON.stringify(uniqueItems));
      let numberOfItems = Object.keys(uniqueItems).length;
      document.getElementById('numberOfItemsInCart').innerHTML = numberOfItems;
      // Disable button after it's clicked
      http: $(this).prop('disabled', true);
      // Blink Shopping Cart Button
      $('#shoppingCart').fadeTo(100, 0.5, function () {
        $(this).fadeTo(500, 1.0);
      });
    });

    $('#detailsModal').on('show.bs.modal', function (event) {
      // Button that triggered the modal
      var button = $(event.relatedTarget);
      // Extract info from data-* attributes
      var name = button.data('name');
      var description = button.data('description');
      var price = button.data('price');

      // Update the modal's content.
      var modal = $(this);
      modal.find('#name').text(name);
      modal.find('#description').text(description);
      modal.find('#price').text(price);
    });

    cardbody.append(cardtitle);
    cardbody.append(cardtext);
    cardbody.append(readmoreButton);
    cardbody.append(addButton);
    card.append(cardbody);
    cardcolumn.append(card);
    cardrow.append(cardcolumn);
  }

  cardgroup.append(cardrow);
}

$(document).ready(function () {
  getProducts();
}); // End document ready
