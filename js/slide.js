// const wrap = document.querySelector('.visual_wrap');
const slideWrap = document.querySelector('.slide_wrap');
const slideList = document.querySelector('.slide_list');
const slideConts = document.querySelectorAll('.slide_conts');
const contsFirst = document.querySelector('.slide_conts:first-child');
const contsLast = document.querySelector('.slide_conts:last-child');
const slideLen = slideConts.length;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const active = "slide_active";
let slideWidth = 100;
let startNum = 0;
let carIndex;
let carSlide;
let contsWidth = (slideWidth / (slideLen + 2));

const firstNode = contsFirst.cloneNode(true);
const lastNode = contsLast.cloneNode(true);
firstNode.style.width = contsWidth + "%";
lastNode.style.width = contsWidth + "%";

slideList.appendChild(firstNode);
slideList.insertBefore(lastNode, slideList.firstElementChild);

slideWrap.style.overflow = "hidden";
slideList.style.width = (slideWidth * (slideLen + 2)) + "%";
for(let i = 0; i < slideLen; i++) {slideConts[i].style.width = contsWidth + "%";}
slideList.style.transform = `translate(-${contsWidth * (startNum + 1)}% , 0)`;

carIndex = startNum;
carSlide = slideConts[carIndex];
carSlide.classList.add(active);

function nextEvent(){
    if(carIndex <= slideLen - 1) {
        slideList.style.transition = `all 0.3s`;
        slideList.style.transform = `translate(-${contsWidth * (carIndex + 2)}%, 0)`;
    }
    if(carIndex === slideLen - 1) {
        setTimeout(function(){
            slideList.style.transition = `0s`;
            slideList.style.transform = `translate(-${contsWidth}%, 0)`;
        }, 300);
        carIndex = -1;
    }
    carSlide.classList.remove(active);
    carSlide = slideConts[++carIndex];
    carSlide.classList.add(active);
}

function prevEvent() {
    if(carIndex >= 0) {
        slideList.style.transition = `all 0.3s`;
        slideList.style.transform = `translate(-${contsWidth * carIndex}%, 0)`;
    }
    if(carIndex === 0) {
        setTimeout(function(){
            slideList.style.transition = `0s`;
            slideList.style.transform = `translate(-${contsWidth * slideLen}%, 0)`;
        }, 300);
        carIndex = slideLen;
    }
    carSlide.classList.remove(active);
    carSlide = slideConts[--carIndex];
    carSlide.classList.add(active);
}

// next button
nextBtn.addEventListener('click', function(){
    nextEvent();
})

// prev button
prevBtn.addEventListener('click', function(){
    prevEvent();
})

// play, pause button
let play;

playBtn.addEventListener('click', function(){
    play = setInterval(nextEvent, 3000);
    playBtn.style.display = "none";
    pauseBtn.style.display = "block"
})

pauseBtn.addEventListener('click', function(){
    clearInterval(play)
    pauseBtn.style.display = "none";
    playBtn.style.display = "block"
})
