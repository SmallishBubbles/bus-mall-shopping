/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //DONE: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById('items');
  for (var i in Product.allProducts) {
    var optionEl = document.createElement('option');
    optionEl.textContent = Product.allProducts[i].name;
    optionEl.value = Product.allProducts[i].name;
    selectElement.appendChild(optionEl);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  //Prevent the page from reloading
  event.preventDefault();

  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// done: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // done: suss out the item picked from the select list
  var selectedItem = document.getElementById('items').value;
  // done: get the quantity
  var selectedQuantity = parseInt(document.getElementById('quantity').value);
  // done: using those, add one item to the Cart

  cart.addItem(selectedItem, selectedQuantity);
}

// Done: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var productCounter = document.getElementById('itemCount');
  var selectedQuantity = parseInt(document.getElementById('quantity').value);
  var counter;
  if (localStorage.getItem('counter')) {
    counter = JSON.parse(localStorage.getItem('counter'));
  } else {
    counter = 0;
  }
  counter += selectedQuantity;
  productCounter.textContent = '   ' + counter;
  localStorage.setItem('counter', JSON.stringify(counter));
}

// Done: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var selectedItem = document.getElementById('items').value;
  var selectedQuantity = parseInt(document.getElementById('quantity').value);
  var cartPreview = document.getElementById('cartContents');
  var ulEl = document.createElement ('ul');
  var liEl = document.createElement ('li');
  liEl.textContent = 'Item: ' + selectedItem + ' Quantity: ' + selectedQuantity;
  ulEl.appendChild(liEl);
  cartPreview.appendChild(ulEl);
  // Done: Get the item and quantity from the form
  // Done: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
