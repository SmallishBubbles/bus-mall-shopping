/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// Done: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var tableBody = document.querySelector('#cart>tbody');
  tableBody.innerHTML = '';
}

// Done: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // Done: Find the table body
  var tableBody = document.querySelector('#cart>tbody');
  for (var i = 0; i < cart.items.length; i++) {
    var trEl = document.createElement('tr');
    var tdEl1 = document.createElement('td');
    var tdEl2 = document.createElement('td');
    var tdEl3 = document.createElement('td');
    tdEl1.innerHTML = `<button id = "${i}">X</button>`;
    tdEl2.textContent = cart.items[i].quantity;
    tdEl3.textContent = cart.items[i].product;
    trEl.appendChild(tdEl1);
    trEl.appendChild(tdEl2);
    trEl.appendChild(tdEl3);
    tableBody.appendChild(trEl);
  }

  // Done: Iterate over the items in the cart
  // Done: Create a TR
  // Done: Create a TD for the delete link, quantity,  and the item
  // Done: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(event) {
// if (event.target === button)
  for (var i = 0; i < cart.items.length; i++) {
    if (Number(event.target.id) === i) {
      cart.removeItem(i);
      cart.saveToLocalStorage();
      renderCart();
    }
  }
  // Done: When a delete link is clicked, use cart.removeItem to remove the correct item
  // Done: Save the cart back to local storage
  // Done: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
