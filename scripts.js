var randomPalette = new Palette();
var savedPalettes = [];

//queryselectors
var box0 =  document.querySelector("#box0");
var box1 = document.querySelector("#box1");
var box2 = document.querySelector("#box2");
var box3 = document.querySelector("#box3");
var box4 = document.querySelector("#box4");
var boxes = [box0, box1, box2, box3, box4];

var hexCode0 = document.querySelector("#hex0");
var hexCode1 = document.querySelector("#hex1");
var hexCode2 = document.querySelector("#hex2");
var hexCode3 = document.querySelector("#hex3");
var hexCode4 = document.querySelector("#hex4");
var hexCodes = [hexCode0, hexCode1, hexCode2, hexCode3, hexCode4];

var newPaletteButton = document.querySelector("#new-palette-button");
var savePaletteButton = document.querySelector("#save-palette-button");
var savedPaletteSection = document.querySelector(".saved-palettes");
var savedMiniPalettes = document.querySelector(".saved-mini-palettes");
var miniBox0 = document.querySelector("#mini-box0");
var miniBox1 = document.querySelector("#mini-box1");
var miniBox2 = document.querySelector("#mini-box2");
var miniBox3 = document.querySelector("#mini-box3");
var miniBox4 = document.querySelector("#mini-box4");

//listeners
window.addEventListener("load", function() {
    showPalette(randomPalette)
})
newPaletteButton.addEventListener("click", function() {
    replaceColor(randomPalette)
})
savePaletteButton.addEventListener("click", function() {
    savePalette(randomPalette, savedPalettes)
})

box0.addEventListener("click", function() {
    toggleIcon(event, randomPalette)
})

//functions
function showPalette(palette) {
    // boxes and hexCodes have the same length
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = palette.colorPalette[i].color;
        hexCodes[i].innerText = palette.colorPalette[i].color;
    }
}

function replaceColor(palette) {
    palette.replaceColors();
    showPalette(palette);
}

function savePalette(palette, paletteArray) {
    if (!paletteArray.includes(palette)) {
        paletteArray.push(palette)
    }
  displaySavedPalettes(paletteArray);
}

function displaySavedPalettes(paletteArray) {
    savedMiniPalettes.innerHTML = ""
    for (var i = 0; i < paletteArray.length; i++) {
        savedMiniPalettes.innerHTML += `
        <section class="saved-mini-palette">
              <div class="box mini" id="mini-box0" style= "background-color: ${paletteArray[i].colorPalette[0].color};"></div>
              <div class="box mini" id="mini-box1" style= "background-color: ${paletteArray[i].colorPalette[1].color};"></div>
              <div class="box mini" id="mini-box2" style= "background-color: ${paletteArray[i].colorPalette[2].color};"></div>
              <div class="box mini" id="mini-box3" style= "background-color: ${paletteArray[i].colorPalette[3].color};"></div>
              <div class="box mini" id="mini-box4" style= "background-color: ${paletteArray[i].colorPalette[4].color};"></div>
              <p class="trash" data-delete-id="${paletteArray[i].id}"> 🗑 </p>
        </section>
       `;        
    }
    randomPalette = new Palette();
    showPalette(randomPalette);
}

function toggleIcon (event, palette) {
    if (document.getElementById('box0').clicked == true) {
        console.log(palette)
        // if (!palette.colorPalette[0].locked) {
            palette.lockColor()
        
    }
}


//=========NOTES=========//

// Event listeners for each indiviual boxes 
// If boxes are clicked the lock will show and the unlock will hide. 
// When it's clicked this.locked will be set to true instead of false and vice versa.
// After it updates the color class it should check if it set to true or false and show the corresponding icon. 
// 
//===> A potential refactoring opportunity, more research is needed.
// var test = document.querySelectorAll(".hex-and-lock")
// test[0].firstChild.nextSibling.innerText = randomPalette.colorPalette[0].color
