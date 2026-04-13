var cart=[]
var total=0

function add_to_cart(name,price){
    cart.push({name,price})
    total=total+price
    update_cart();
}
function update_cart(){
    var cart_list=document.getElementById("cart-items")
    var cart_count=document.getElementById("cart-count")
    var cart_total=document.getElementById("cart-total")
    cart_list.innerHTML="";
}
