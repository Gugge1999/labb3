let nameArray = [];
let descriptionArray = [];
let priceArray = [];

/* Start getProducts*/
function getProducts() {
  $.getJSON('http://127.0.0.1:3000/products/', function (data) {
    showProductsInTable(data);
    console.log(data);
  });
}

function showProductsInTable(data) {
  let table = $('#tblProduct');
  table.empty();
  table.append('<thead>');
  table.append('<th>' + 'ID' + '</th>');
  table.append('<th>' + 'Name' + '</th>');
  table.append('<th>' + 'Description' + '</th>');
  table.append('<th>' + 'Price' + '</th>');
  table.append('</thead>');
  table.append("<tbody id='myTable'");
  $.each(data, function (idx, products) {
    table.append(
      '<tr>' +
        "<td><a href='#' onclick=getProductById('" +
        products.ID +
        "')>" +
        products.ID +
        '</a></td>' +
        '<td>' +
        products.name +
        '</td>' +
        '<td>' +
        products.description +
        '</td>' +
        '<td>' +
        products.price +
        '</td>' +
        '</tr>'
    );
  }); // End loop
  table.append('</tbody>');
} // End showProductsInTable

function getProductById(id) {
  $.getJSON('http://127.0.0.1:3000/products/' + id, function (data) {
    showProductInForm(data);
  });
} // End getProductById

function showProductInForm(data) {
  // Get the textfield from modal
  let myId = $('#txtId');
  let myName = $('#txtName');
  let myDescription = $('#txtDescription');
  let myPrice = $('#txtPrice');
  // set textfield from json
  myId.val(data.ID);
  myName.val(data.name);
  myDescription.val(data.description);
  myPrice.val(data.price);

  // Show the modal
  $('#updateAndDeleteModal').modal('show');
}

function addProduct() {
  // Assign values in the modal textifeld to variables
  let myName = $('#myAddModal #txtAddName').val(); // Gets the value from the textfield in the modal
  let myDescription = $('#myAddModal #txtAddDescription').val();
  let myPrice = $('#myAddModal #txtAddPrice').val();

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:3000/products/',
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify({
      name: myName,
      description: myDescription,
      price: myPrice,
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      getProducts();
      $('#myAddModal').modal('hide');
    },
    failure: function (errMsg) {
      alert(errMsg);
    },
  });
} // End addProduct

function deleteProduct() {
  let myId = $('#txtId').val(); //get value from textfield
  $.ajax({
    type: 'DELETE',
    url: 'http://127.0.0.1:3000/products/' + myId,
    success: function (data) {
      getProducts();
      $('#updateAndDeleteModal').modal('hide');
    },
    failure: function (errMsg) {
      alert('failure:' + errMsg.title);
    },
  });
}

function updateProduct() {
  //assign values in modal text fields to variables
  let myName = $('#txtName').val(); //get value from textfield
  let myDescription = $('#txtDescription').val();
  let myPrice = $('#txtPrice').val();
  let myId = $('#txtId').val();
  console.log(myName);

  $.ajax({
    type: 'PUT',
    url: 'http://127.0.0.1:3000/products/',
    // The key needs to match your method's input parameter (case-sensitive).
    data: JSON.stringify({ name: myName, description: myDescription, price: myPrice, id: myId }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      getProducts();
      $('#updateAndDeleteModal').modal('hide');
    },
    failure: function (errMsg) {
      alert(errMsg);
    },
  });
}

function itemArray() {
  // Gets the value from the textfield in the midal
  let myName = $('#myAddModal #txtAddName').val();
  let myDescription = $('#myAddModal #txtAddDescription').val();
  let myPrice = $('#myAddModal #txtAddPrice').val();
  let myId = $('#txtId').val();

  /* nameArray.push(myName);
    descriptionArray.push(myDescription);
    priceArray.push(myPrice);

    console.log(nameArray);
    console.log(descriptionArray);
    console.log(priceArray); */

  var jsonStr = '{"theTeam":[]}';

  var obj = JSON.parse(jsonStr);
  obj['theTeam'].push({ name: myName, description: myDescription, price: myPrice, id: myId });
  jsonStr = JSON.stringify(obj);
  console.log(jsonStr);
}

$(document).ready(function () {
  $(function () {
    $('#btnSubmit').on('click', function (e) {
      var form = $(addProductForm)[0];
      var isValid = form.checkValidity();
      if (!isValid) {
        e.preventDefault();
        e.stopPropagation();
      } else if (isValid) {
        addProduct();
        itemArray();
      }
      form.classList.add('was-validated');
      return false;
    });
  });
  getProducts();
});
