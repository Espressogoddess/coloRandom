var randomPalette = new Palette();
var savedPalettes = [];

//queryselectors
var box0 = document.querySelector("#box0");
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
var lockIcons = document.querySelectorAll(".lock-icon");
var unlockIcons = document.querySelectorAll(".unlock-icon")
var mainPaletteContainer = document.querySelector(".main-palette-container");
var savedPalettesSection = document.querySelector("#saved-palettes-container");

//listeners
window.addEventListener("load", function () {
    showPalette(randomPalette);
})
newPaletteButton.addEventListener("click", function () {
    replaceColor(randomPalette);
})
savePaletteButton.addEventListener("click", function () {
    savePalette(randomPalette, savedPalettes);
    randomPalette = new Palette();
    showPalette(randomPalette);
})

mainPaletteContainer.addEventListener("click", function (event) {
    toggleColorLock(event, randomPalette);
})
savedPalettesSection.addEventListener('click', function(event) {
    deleteSavedPalette(event, savedPalettes)
})

//functions
function showPalette(palette) {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = palette.colorPalette[i].color;
        //boxes[i].dataset.colorIndex = i;
        hexCodes[i].innerText = palette.colorPalette[i].color;
    }
}

function replaceColor(palette) {
    palette.replaceColors();
    showPalette(palette);
}

function resetLocks(palette) {
    for(var i = 0; i < palette.colorPalette.length; i++) {
        if(!palette.colorPalette.locked) {
        lockIcons[i].classList.add("hidden");
        unlockIcons[i].classList.remove("hidden");
        }
    }
}

function savePalette(palette, paletteArray) {
    if (!paletteArray.includes(palette)) {
        paletteArray.push(palette);
    }
    displaySavedPalettes(paletteArray);
    resetLocks(palette);
}

function displaySavedPalettes(paletteArray) {
    savedMiniPalettes.innerHTML = "";
    for (var i = 0; i < paletteArray.length; i++) {
        savedMiniPalettes.innerHTML += `
        <section class="saved-mini-palette" data-palette-index="${i}">
              <div class="box mini" id="mini-box0" style= "background-color: ${paletteArray[i].colorPalette[0].color};"></div>
              <div class="box mini" id="mini-box1" style= "background-color: ${paletteArray[i].colorPalette[1].color};"></div>
              <div class="box mini" id="mini-box2" style= "background-color: ${paletteArray[i].colorPalette[2].color};"></div>
              <div class="box mini" id="mini-box3" style= "background-color: ${paletteArray[i].colorPalette[3].color};"></div>
              <div class="box mini" id="mini-box4" style= "background-color: ${paletteArray[i].colorPalette[4].color};"></div>
              <p class="trash" data-delete-id="${paletteArray[i].id}"> 🗑 </p>
        </section>
       `;
    }
}

function toggleColorLock(event, palette) {
    if (event.target.dataset.colorIndex) {
        palette.toggleLock(event.target.dataset.colorIndex);
        updateIcon(event, palette);
    }
    
}

function updateIcon(event, palette) {
    if (palette.colorPalette[event.target.dataset.colorIndex].locked) {
        lockIcons[event.target.dataset.colorIndex].classList.remove("hidden");
        unlockIcons[event.target.dataset.colorIndex].classList.add("hidden");
    } else {
        lockIcons[event.target.dataset.colorIndex].classList.add("hidden");
        unlockIcons[event.target.dataset.colorIndex].classList.remove("hidden");
        }
}

function deleteSavedPalette(event, paletteArray) {
    if(event.target.classList.contains("trash")) {
        paletteArray.splice(event.target.parentElement.dataset.paletteIndex, 1) 
        displaySavedPalettes(paletteArray);
    }
}






//=========NOTES=========//
//===> A potential refactoring opportunity, more research is needed.
// var test = document.querySelectorAll(".hex-and-lock")
// test[0].firstChild.nextSibling.innerText = randomPalette.colorPalette[0].color