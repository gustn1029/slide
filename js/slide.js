// const wrap = document.querySelector('.visual_wrap');
const slideWrap = document.querySelector('.slide_wrap');
const slideList = document.querySelector('.slide_list');
const slideConts = document.querySelectorAll('.slide_conts');
const contsFirst = document.querySelector('.slide_conts:first-child');
const contsLast = document.querySelector('.slide_conts:last-child');
const slideLen = slideConts.length;
let slideWidth = 100;
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const active = "slide_active";
let startNum = 0;
let curIndex;
let curSlide;
let contsWidth = (slideWidth / (slideLen + 2));

const firstNode = contsFirst.cloneNode(true);
const lastNode = contsLast.cloneNode(true);
firstNode.style.width = (slideWidth / (slideLen + 2)) + "%";
lastNode.style.width = (slideWidth / (slideLen + 2)) + "%";

slideList.appendChild(firstNode);
slideList.insertBefore(lastNode, slideList.firstElementChild);

slideWrap.style.overflow = "hidden";
slideList.style.width = (slideWidth * (slideLen + 2)) + "%";
for(let i = 0; i < slideLen; i++) {slideConts[i].style.width = (slideWidth / (slideLen + 2)) + "%";}
slideList.style.transform = `translate3d(-${contsWidth * (startNum + 1)}% , 0, 0)`;

curIndex = startNum;
curSlide = slideConts[curIndex];
curSlide.classList.add(active);

function nextEvent(){
    if(curIndex <= slideLen - 1) {
        slideList.style.transition = `all 0.3s`;
        slideList.style.transform = `translate3d(-${contsWidth * (curIndex + 2)}%, 0, 0)`;
    }
    if(curIndex === slideLen - 1) {
        setTimeout(function(){
            slideList.style.transition = `0s`;
            slideList.style.transform = `translate3d(-${contsWidth}%, 0, 0)`;
        }, 300);
        curIndex = -1;
    }
    curSlide.classList.remove(active);
    curSlide = slideConts[++curIndex];
    curSlide.classList.add(active);
}

function prevEvent() {
    if(curIndex >= 0) {
        slideList.style.transition = `all 0.3s`;
        slideList.style.transform = `translate3d(-${contsWidth * curIndex}%, 0, 0)`;
    }
    if(curIndex === 0) {
        setTimeout(function(){
            slideList.style.transition = `0s`;
            slideList.style.transform = `translate3d(-${contsWidth * slideLen}%, 0, 0)`;
        }, 300);
        curIndex = slideLen;
    }
    curSlide.classList.remove(active);
    curSlide = slideConts[--curIndex];
    curSlide.classList.add(active);
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
