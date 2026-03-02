let show = () => {
    let name = document.getElementById("name").value;

    document.getElementById("display").innerHTML =
        "Wish you a very Happy New Year to " + name;

    document.getElementById("img").src = "https://www.wordsjustforyou.com/wp-content/uploads/2022/12/Happy-New-Year-2026-Greetings-Gif-77719121225.gif";

    document.getElementById("content").innerHTML =
        "New year, new hopes and newer beginnings- all of us ardently wait for the clock to strike 12 and usher in the new year. It's such a celebratory, positive time which keeps everyone in good spirits!";

    document.getElementById("dis").style.color = "#FFFFFF";
}

document.getElementById("btn").addEventListener("click", show);

// cd..  => to go back [change directory]