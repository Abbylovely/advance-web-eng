// ===============================
// 🔐 Check if user is logged in (only for protected pages)
// ===============================
async function checkUser(){
    const { data } = await supabase.auth.getUser();

    if(!data.user){
        alert("Please login first!");
        window.location.href = "login.html";
    }
}

// Run check ONLY on shop / checkout / payment pages
if(
    window.location.pathname.includes("shop") ||
    window.location.pathname.includes("checkout") ||
    window.location.pathname.includes("payment")
){
    checkUser();
}

// ===============================
// 🛒 CART SETUP
// ===============================

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Calculate total safely
let total = cart.reduce((sum, item) => sum + item.price, 0);

// ===============================
// ➕ Add to Cart
// ===============================
function add_to_Cart(name, price){
    cart.push({ name, price });
    total += price;

    saveCart();
    updateCart();
}

// ===============================
// 💾 Save cart
// ===============================
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// ❌ Remove item
// ===============================
function removeItem(index){
    total -= cart[index].price;
    cart.splice(index, 1);

    saveCart();
    updateCart();
}

// ===============================
// 🔄 Update UI
// ===============================
function updateCart(){
    let cartList = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let cartTotal = document.getElementById("cart-total");

    if(!cartList) return;

    cartList.innerHTML = "";

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

// ===============================
// 🚀 On Page Load
// ===============================
window.onload = function(){
    updateCart();

    // Show total in checkout page
    let finalTotal = document.getElementById("final-total");
    if(finalTotal){
        finalTotal.textContent = total;
    }
}

// ===============================
// 🧾 Checkout → Go to Payment Page
// ===============================
function placeOrder(event){
    event.preventDefault();

    if(cart.length === 0){
        alert("Cart is empty ❌");
        return;
    }

    // Save data for payment page
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("finalTotal", total);

    // Go to payment page
    window.location.href = "payment.html";
}

// ===============================
// 💳 Payment Function (call in payment.html)
// ===============================
async function pay(method){

    const { data } = await supabase.auth.getUser();
    let user = data.user;

    if(!user){
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = localStorage.getItem("finalTotal");

    // Save order AFTER payment
    await supabase.from("orders").insert([
        {
            user_id: user.id,
            items: JSON.stringify(cart),
            total: total,
            payment_method: method
        }
    ]);

    alert("Payment successful via " + method + " 🎉");

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect
    window.location.href = "index.html";
}

