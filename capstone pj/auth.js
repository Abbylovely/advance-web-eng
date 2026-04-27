async function signup(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });

    if(error){
        alert(error.message);
    } else {
        alert("Signup successful! 🎉");
        window.location.href = "login.html";
    }
}

async function login(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if(error){
        alert(error.message);
    } else {
        alert("Login successful! ✅");
        window.location.href = "shop.html";
    }
}

async function logout(){
    await supabase.auth.signOut();
    window.location.href = "login.html";
}