let cart = [];
 const addToCartButtons = document.querySelectorAll('.add-to-cart');
 const cartBtn = document.getElementById('cart-btn');
 const cartPopup = document.getElementById('cart-popup');
 const closeCartBtn = document.getElementById('close-cart');
 const cartItems = document.getElementById('cart-items');
 const cartCount = document.getElementById('cart-count');
 const cartTotal = document.getElementById('cart-total');
 const paypalBtn = document.getElementById('paypal-btn');
 const cardBtn = document.getElementById('card-btn');
 addToCartButtons.forEach(button => {
 button.addEventListener('click', () => {
 const product = button.parentElement;
 const name = product.querySelector('h3').innerText;
 const price =
 parseFloat(product.querySelector('p').innerText.replace('$', ''));
 cart.push({ name, price });
 updateCart();
 });
 });
 cartBtn.addEventListener('click', () => {
 cartPopup.classList.add('show');
 });
 closeCartBtn.addEventListener('click', () => {
 cartPopup.classList.remove('show');
 });
 function updateCart() {
 cartItems.innerHTML = '';
 let total = 0;
 cart.forEach(item => {
 const li = document.createElement('li');
 li.textContent = `${item.name} - $${item.price}`;
 cartItems.appendChild(li);
 total += item.price;
 });
 cartTotal.innerText = total.toFixed(2);
 cartCount.innerText = cart.length;
 }
 // Botones de pago (simulación)
 paypalBtn.addEventListener('click', () => {
 alert('Redirigiendo a PayPal para pagar $' + cartTotal.innerText);
 });
 cardBtn.addEventListener('click', () => {
 alert('Redirigiendo a la pasarela de tarjeta para pagar $' +
 cartTotal.innerText);
