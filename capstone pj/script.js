// ===============================
// 🔐 Check if user is logged in
// ===============================
async function checkUser(){

    const { data, error } = await supabase.auth.getUser();

    if(error){
        console.log(error);
    }

    if(!data.user){
        alert("Please login first!");
        window.location.href = "login.html";
    }
}

// Run check ONLY on protected pages
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

// Calculate total
let total = cart.reduce((sum, item) => {
    return sum + Number(item.price);
}, 0);

// ===============================
// 💾 SAVE CART
// ===============================
function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

    localStorage.setItem("finalTotal", total);
}

// ===============================
// ➕ ADD TO CART
// ===============================
function add_to_cart(name, price){

    cart.push({
        name: name,
        price: Number(price)
    });

    total += Number(price);

    saveCart();

    updateCart();

    console.log("Cart Updated:", cart);
    console.log("Total:", total);
}

// ===============================
// ❌ REMOVE ITEM
// ===============================
function removeItem(index){

    total -= Number(cart[index].price);

    cart.splice(index, 1);

    saveCart();

    updateCart();
}

// ===============================
// 🔄 UPDATE CART UI
// ===============================
function updateCart(){

    let cartList = document.getElementById("cart-items");

    let cartCount = document.getElementById("cart-count");

    let cartTotal = document.getElementById("cart-total");

    // Update cart items
    if(cartList){

        cartList.innerHTML = "";

        cart.forEach((item, index) => {

            let li = document.createElement("li");

            li.innerHTML = `
                ${item.name} - $${item.price}
                <button onclick="removeItem(${index})">❌</button>
            `;

            cartList.appendChild(li);
        });
    }

    // Update cart count
    if(cartCount){
        cartCount.textContent = cart.length;
    }

    // Update cart total
    if(cartTotal){
        cartTotal.textContent = total;
    }

    // Update checkout total
    let finalTotal = document.getElementById("final-total");

    if(finalTotal){
        finalTotal.textContent = total;
    }

    // Update payment total
    let payTotal = document.getElementById("pay-total");

    if(payTotal){
        payTotal.textContent = total;
    }
}

// ===============================
// 🚀 PAGE LOAD
// ===============================
window.addEventListener("DOMContentLoaded", function(){

    // Reload cart
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Reload total
    total = cart.reduce((sum, item) => {
        return sum + Number(item.price);
    }, 0);

    updateCart();

    console.log("Page Loaded");
    console.log("Cart:", cart);
    console.log("Total:", total);
});

// ===============================
// 🧾 PLACE ORDER
// ===============================
function placeOrder(event){

    event.preventDefault();

    // Reload latest cart
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Recalculate total
    total = cart.reduce((sum, item) => {
        return sum + Number(item.price);
    }, 0);

    if(cart.length === 0){

        alert("Cart is empty ❌");

        return;
    }

    // Save total
    localStorage.setItem("finalTotal", total);

    console.log("Final Total Saved:", total);

    // Redirect
    window.location.href = "payment.html";
}

// ===============================
// 💳 PAYMENT
// ===============================
async function pay(method){

    console.log("Payment button clicked");

    try{

        const { data, error } = await supabase.auth.getUser();

        if(error){
            console.log(error);
        }

        let user = data.user;

        // TEMPORARY: allow payment without login
        if(!user){

            alert("No user logged in, saving as guest");

        }

        // Get cart
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Get total
        let total = localStorage.getItem("finalTotal") || 0;

        console.log("Cart:", cart);
        console.log("Total:", total);

        // Save to database
        const { error: insertError } = await supabase
        .from("orders")
        .insert([
            {
                user_id: user ? user.id : null,
                items: JSON.stringify(cart),
                total: total,
                payment_method: method
            }
        ]);

        if(insertError){

            console.log(insertError);

            alert("Database error ❌");

            return;
        }

        alert("Payment successful via " + method + " 🎉");

        // Clear cart
        localStorage.removeItem("cart");

        localStorage.removeItem("finalTotal");

        // Redirect
        window.location.href = "index.html";

    }
    catch(err){

        console.log(err);

        alert("Something went wrong ❌");
    }
}