// Load cart from localStorage or empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;

// Calculate total initially
cart.forEach(item => total += item.price);

// Add to Cart
function addToCart(name, price){
    cart.push({name, price});
    total += price;

    saveCart();
    updateCart();
}

// Save cart to localStorage
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove item
function removeItem(index){
    total -= cart[index].price;
    cart.splice(index, 1);

    saveCart();
    updateCart();
}

// Update UI
function updateCart(){
    let cartList = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let cartTotal = document.getElementById("cart-total");

    if(!cartList) return; // prevents error on other pages
cart.forEach((item, index) => {
let li = document.createElement("li");

li.innerHTML = `
${item.name} - $${item.price}
<button onclick="removeItem(${index})">❌</button>
`;

cartList.appendChild(li);
});

if(cartCount) cartCount.textContent = cart.length;
if(cartTotal) cartTotal.textContent = total;
}

// Load cart when page opens
window.onload = function(){
updateCart();

let finalTotal = document.getElementById("final-total");
if(finalTotal){
finalTotal.textContent = total;
}
}

// Place Order
function placeOrder(event){
event.preventDefault();

alert("Order placed successfully! 🎉");

cart = [];
total = 0;

saveCart();
updateCart();

window.location.href = "index.html";
}