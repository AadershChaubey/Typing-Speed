const Words = ["Bharat", "Bose", "Chandrashekhar","Atal", "Gopal", "Neelkanthay", "Maharana", "Gandhi", "Vikramaditya", "Tanaji", "Mahadev", "Shastriji", "Shivaji", "Ram", "Krishna", "Suheldev"]
var wordSequence = [];

const timer = document.querySelector(".timer")
const bottom = document.querySelector(".bottom")
const reportCard = document.querySelector(".report-card")
var timerStart = false;
const Input = document.querySelector("input")
const text = document.querySelector(".text");
const retryButton = document.querySelector(".retry");
var indexOfWordSequence = 0;
var word = 0;
var wrongWord = 0;
var time = 1;
fillWords(text)
// timer
var sec = document.querySelector(".sec")
var min = document.querySelector(".min")


Input.addEventListener("keyup", (e)=>{
    if(!timerStart){
        timerStart = true;
        startTimer();
    }
    let value = Input.value
    if(e.keyCode == 32){
        let offSetCurr = wordSequence[indexOfWordSequence].offsetTop;
        if(value.slice(0, value.length) !== wordSequence[indexOfWordSequence].innerText){
            wordSequence[indexOfWordSequence].style.color = "rgb(241, 79, 79)";
            wrongWord++;
        }
        wordSequence[indexOfWordSequence].style.background =  "transparent";
        indexOfWordSequence++;
        Input.value = "";
        value = "";
        if(wordSequence[indexOfWordSequence].offsetTop != offSetCurr){
            let i = 0;
            while(i != indexOfWordSequence){
                wordSequence[i++].remove();
            }
        }
        word++;
    }
    if(value != wordSequence[indexOfWordSequence].innerText.slice(0, value.length))wordSequence[indexOfWordSequence].style.background = "rgb(241, 79, 79)";
    else wordSequence[indexOfWordSequence].style.background =  "rgb(182, 177, 177)";
})



function fillWords(element){
    let size = Words.length - 1;
    for(let i = 0; i < 3000; i++){
        let newSpan = document.createElement("span");
        let index = (Math.random() * size).toFixed(0);
        newSpan.innerText += Words[index] + " ";
        element.append(newSpan)
    }
    wordSequence = document.querySelectorAll("span");
}


timer.addEventListener("click", ()=>{
    let minT = min.innerText;
    time = (parseInt(minT) + 2 )% 6
    min.innerText = time;
})

function startTimer(){
    timer.disabled = true;
    const Timer = setInterval(()=>{
        let secT = sec.innerText
        let minT = min.innerText;
        secT--;
        if(secT < 0){
            secT = 59;
            minT--;
            if(minT < 0){
                clearInterval(Timer)
                timer.style.transform = "scale(0, 0)"
                Input.disabled = true;
                createReportCard()
                setTimeout(()=>{
                    reportCard.style.transform = "scale(1, 1)"
                }, 500)
                return;
            }
        }
        if(sec < 10)sec.innerText = "0" +  secT;
        else sec.innerText = secT;

        min.innerText =  minT;
    }, 1000)
}

retryButton.addEventListener("click", ()=>{
    timer.disabled = false;
    reportCard.style.transform = "scale(0, 0)"
    setTimeout(()=>{
        timer.style.transform = "scale(1, 1)"
    }, 500)
    resetValues();
})


function createReportCard(){
    let speed = document.querySelector(".wps");
    speed.innerText = (word / time) + " wps";

    let wrong = document.querySelector(".wrong");
    wrong.innerText = wrongWord;

    let right = document.querySelector(".right");
    right.innerText = word - wrongWord;
}

function resetValues(){
    word = 0;
    wrongWord = 0;
    indexOfWordSequence = 0;
    timerStart = false;
    Input.disabled = false;
    text.innerText = "";

    fillWords(text);
    min.innerHTML = time;
    Input.value = ""
}