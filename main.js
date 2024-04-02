let theFirstBool = false, theSecondBool = false;
let theFirst , theSecond;
let counter = null,
    counterToFull = 0;
let boxes = document.querySelectorAll(".boxes .box"),
    dropper = document.querySelector(".dropper"),
    dropperTime = document.querySelector(".dropper span"),
    varsCSS = document.querySelector(":root");

// Boxes Control

function boxClick() {
    boxes.forEach(box => {
        box.addEventListener("click", () => {
            if(theFirstBool === false && theSecondBool === false) {
                theFirstBool = true;
                theFirst = box;
                theFirst.classList.add("selected");
            }else if(theFirstBool === true && theSecondBool === false) {
                theSecondBool = true;
                theSecond = box;
            }
            if(theFirstBool && theSecondBool) {
                if(theFirst.innerHTML === theSecond.innerHTML && !theFirst.innerHTML == ""  && theFirst != theSecond){
                    theSecond.innerHTML = +theFirst.innerHTML + +theSecond.innerHTML;
                    theFirst.innerHTML = "";
                    counterToFull = -1;
                    boxes.forEach(e => {
                        if(e.innerHTML != ""){
                            counterToFull += 1;
                        }
                    });
                }
                theFirst.classList.remove("selected");
                theFirst = undefined;
                theSecond = undefined;
                theFirstBool = false;
                theSecondBool = false;
            }
        });
    });
    console.log(boxes.length);
}
boxClick();
// Dropping

function dropTimeCounter(){
    if(counterToFull < boxes.length - 1){
        if(dropperTime.innerHTML > 0){
            scale = scale + 0.1;
            varsCSS.style.setProperty("--scale", `${scale}`);
            dropperTime.innerHTML -= 1;
        }else {
            if(counterToFull < boxes.length){
                drop();
                scoreCalc();
            }
            scale = 0;
            varsCSS.style.setProperty("--scale", `${scale}`);
            dropperTime.innerHTML = 9;
        }
    }
}

let scale = 0;
dropper.addEventListener("click", dropTimeCounter);

counter = setInterval(dropTimeCounter, 1000);

// Drop Randomly function

function drop() {
    counterToFull = 0;
    boxes.forEach(e => {
        if(e.innerHTML != ""){
            counterToFull += 1;
        }
    });

    let random = Math.floor(Math.random() * boxes.length);
    if(counterToFull < boxes.length){
        if(boxes[random].innerHTML === ""){
            boxes[random].innerHTML = "1";
        }else{
            drop();
        }
    }
}

// Score And Level ups
var bar = document.querySelector(".exp-bar"),
    lvl = bar.previousElementSibling,
    score = 0;
function calcProgress() {
    return (score / ((2**boxes.length) - 1)) * 100;
}
function scoreCalc() {
    score = 0;
    boxes.forEach(box => {
        score += +box.innerHTML;
    });
    bar.setAttribute("data-ex", `${score}`);
    varsCSS.style.setProperty("--bar-width", `${calcProgress()}%`);
    leveling();
}

function leveling() {
    if(score === (2 ** boxes.length) - 1){
        lvl.innerHTML = +lvl.innerHTML + 1;
        newLand();
        classLvl();
    }
}

function classLvl() {
    if(boxes.length + 1 >= 11){
        boxes.forEach(box => {
            box.classList.remove("lvl-4");
            box.classList.add("lvl-5");
        });
        return 5;
    }else if(boxes.length >= 8){
        boxes.forEach(box => {
            box.classList.remove("lvl-3");
            box.classList.add("lvl-4");
        });
        return 4;
    }else{
        return 3;
    }
}

function newLand() {
    let boxesArea = document.querySelector(".boxes");
    boxesArea.innerHTML += `<div class="box lvl-${classLvl()}"></div>`;
    boxes = document.querySelectorAll(".boxes .box");
    boxClick();
}