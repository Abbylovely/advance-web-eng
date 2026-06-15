var desc=[
    "sixteen-year-old Cadence Sinclair summers on a private island with her wealthy, dysfunctional family. She and her three cousins—the Liars—experience a tragic, fire-related accident that leaves Cadence with memory loss. Returning two years later, she struggles to piece together the truth, eventually uncovering a devastating twist: she and her aunts inadvertently caused a deadly fire, and the Liars she is happily reuniting with are actually her own traumatic ghosts.","bb","cc"
]
function show_details(num,img){
let box=img.nextElementSibling;
box.innerHTML=desc[num];
box.style.display="block";
}var desc = [

`Sixteen-year-old Cadence Sinclair spends summers on a private island with her wealthy family. A mysterious accident causes her memory loss, and she must uncover the truth.`,

`The Spiderwick Chronicles follows siblings Jared, Simon, and Mallory as they discover a hidden world filled with magical creatures and dangerous adventures.`,

`Jinx is a fantasy novel about a boy believed to be cursed. As he discovers magical powers, he learns the truth about himself and his destiny.`

];

function show_details(num, img){

    // Hide all description boxes first
    let allBoxes = document.getElementsByClassName("description_box");

    for(let box of allBoxes){
        box.style.display = "none";
    }

    // Show description for clicked book
    let box = img.nextElementSibling;

    box.innerHTML = desc[num];
    box.style.display = "block";
}