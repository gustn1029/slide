# slide vanilla JS
```html
<div class="visual_wrap">
    <div class="visual slide_wrap">
        <div class="slide_list">
            <div class="slide_conts">
                <figure>
                    <img src="/img/visual/visual01.jpg" alt="">
                    <p>1</p>
                </figure>
            </div>
            <div class="slide_conts">
                <figure>
                    <img src="/img/visual/visual01.jpg" alt="">
                    <p>2</p>
                </figure>
            </div>
            <div class="slide_conts">
                <figure>
                    <img src="/img/visual/visual01.jpg" alt="">
                    <p>3</p>
                </figure>
            </div>
            <div class="slide_conts">
                <figure>
                    <img src="/img/visual/visual01.jpg" alt="">
                    <p>4</p>
                </figure>
            </div>
            <div class="slide_conts">
                <figure>
                    <img src="/img/visual/visual01.jpg" alt="">
                    <p>5</p>
                </figure>
            </div>
        </div>
        <div class="btn_wrap">
            <a href="javascript:void(0)" class="prev">prev</a>
            <a href="javascript:void(0)" class="play">play</a>
            <a href="javascript:void(0)" class="pause">pause</a>
            <a href="javascript:void(0)" class="next">next</a>
        </div>
    </div>
</div>
```
먼저 실제 visual 영역에서 사용할 때를 가정해서  
이미지와 문구를 넣고 슬라이드를 만들었습니다.  
 
```html 
<div class="visual_wrap">
    <div class="visual slide_wrap">
        <div class="slide_list">
            <div class="slide_conts">
```
먼저 `visual_wrap` 으로 감싸서 `width` 를 결정하고  
`slide_wrap` 을 통해 슬라이드 되는 영역을 `overflow: hidden` 해주었습니다.  
그리고 `slide_list` 를 통해서 실제로 `slide_conts` 가 슬라이드 되도록 만들었습니다.

```html
<div class="btn_wrap">
    <a href="javascript:void(0)" class="prev">prev</a>
    <a href="javascript:void(0)" class="play">play</a>
    <a href="javascript:void(0)" class="pause">pause</a>
    <a href="javascript:void(0)" class="next">next</a>
</div>
```
`button` 은 prev, play, pause, next 이렇게 4개의 버튼을 만들었고,  
play, pause 는 실행되는 이벤트에 맞춰서 서로 바뀌도록 만들었습니다.

```css
.visual_wrap {margin: 0 auto 60px;}
.slide_list {position: relative;}
.slide_conts {float: left; position: relative;
    img {width: 100%;}
    p{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); color: #fff; font-size: 5em; font-weight: 500;}
}

.btn_wrap {
    position: absolute; width: 300px; left: 50%; top: 60%; transform: translateX(-50%); z-index: 20;
    a{
        position: absolute; top: 0;
        color: #fff;
        font-size: 2em;
        &.prev {left: 0;}
        &.pause, &.play {left: 50%; transform: translateX(-50%);}
        &.pause{display: none;}
        &.next {right: 0;}
    }
}
```
css 는 간단하게 문구와 버튼의 위치만 잡아주었습니다. 
그리고 `.slide_conts` 는 `float:left` 로 왼쪽으로 위치시켰습니다.
```js
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
```
먼저 `prevEvent, nextEvent function` 을 만들어서  
버튼을 클릭할 때 이벤트 함수가 실행 되도록 만들었습니다.  

play, pause 버튼은 `setInterval, clearInterval` 을 활용하여 만들었습니다.

```js
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
let contsWidth = (Math.round((slideWidth / (slideLen + 2)) * 100) / 100);

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
```
일단 먼저 태그들을 변수에 담았고,  
`slideWidth` 를 100 으로 설정하고 % 로 `width` 를 설정했습니다.
`carIndex` 는 `slide_conts` 의 인덱스를 선택하기 위한 변수이고,  
`carSlide` 는 선택된 인덱스의 `slide_conts` 를 담기 위해서 만들었습니다.  

그리고 무한루프처럼 슬라이드가 끊기지 않고 무한으로 반복될 수 있도록  
`cloneNode` 를 활용하여 `slide_list` 의 처음과 마지막에 각각  
첫번째 `slide_conts` 와 마지막 `slide_conts` 를 추가해줬습니다.

`slideList`의 `width`는 `(slideWidth * (slideLen + 2))%`값으로 설정해줍니다.
- `+` 2 를 해주는 이유는 아까 cloneNode 로 추가한 2개의 값을 더해준 것 입니다.

그리고 `slideList`는 초기값으로 `translate(-${contsWidth * (startNum + 1)}% , 0)` 값을 설정해줍니다.
- 이유는 cloneNode 로 `slide_conts`가 하나 추가 되어 있기 때문입니다.


`slide_cont`의 `width`는 `let contsWidth = (Math.round((slideWidth / (slideLen + 2)) * 100) / 100)`% 로  
변수 `contsWidth`에 할당하여 사용하였습니다.
- `Math.round`를 사용해서 소수점 2자리에서 반올림 한 이유는  
IE 에서 width 소수점이 2자리까지 밖에 설정이 안되는 것을 확인해서

```js
carIndex = startNum;
carSlide = slideConts[carIndex];
carSlide.classList.add(active);
```

그리고 초기값을 설정해주었습니다.
먼저 `carIndex`의 값을 `startNum` 으로 설정해주었습니다.  
그 뒤에 `carSlide`를 `slideConts[carIndex]`로 설정했습니다.  
그리고 `carSlide`에 `active` 값을 클래스에 추가시켰습니다.  

그럼 첫번째로 `slideConts[0]`클래스에 `active` 값이 추가 될것입니다.

```js
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

// next button
nextBtn.addEventListener('click', function(){
    nextEvent();
})
```
이제 함수를 만들어보겠습니다.
먼저 `function nextEvent()`를 만들었습니다.  
```js
if(carIndex <= slideLen - 1) {
        slideList.style.transition = `all 0.3s`;
        slideList.style.transform = `translate(-${contsWidth * (carIndex + 2)}%, 0)`;
    }
```
일단 `carIndex <= slideLen - 1` 일 때,  
자연스럽게 슬라이드 되도록  
`slideList`의 `transition`을 `all 0.3s` 를 설정해주고,  
`slideList`를 `translate(-${contsWidth * (carIndex + 2)}%, 0)` 만큼 이동시켜줍니다.
- carIndex 의 초기값이 0 이기 때문에 +2 를 해줘야 됩니다.

```js
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
```
그리고 `carIndex === slideLen - 1` 일 때(마지막 슬라이드),  
`setTimeout` 을 활용하여 자연스럽게 처음 값으로 추가했던 `cloneNode` 로 넘어가게 해줍니다.  
이때 `slideList`의 `transition = 0s`,  `transform = translate(-${contsWidth}%, 0)` 으로 설정해서  
아무런 변화 없이 바로 첫번째 슬라이드로 이동하도록 설정해줍니다.  

그리고 `click Event`가 실행 될 때 마다  
`carSlide` 클래스에서 `active`값을 지우고,  
`carSlide`값을 `slideConts[++carIndex]`로 변경해줍니다.  
그 뒤에 다시 `carSlide` 클래스에 `active`값을 추가해줘서  
`active`값이 `carIndex`값에 맞게 이동될 수 있도록 설정해줍니다.
```js
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

// prev button
prevBtn.addEventListener('click', function(){
    prevEvent();
})
```
`function prevEvent()` 도 비슷하게
```js
if(carIndex >= 0) {
        slideList.style.transition = `all 0.3s`;
        slideList.style.transform = `translate(-${contsWidth * carIndex}%, 0)`;
    }
```
`carIndex >= 0` 일 때,  
자연스럽게 슬라이드 되도록  
`slideList`의 `transition`을 `all 0.3s` 를 설정해주고,  
`slideList`를 `translate(-${contsWidth * carIndex}%, 0)` 만큼 이동시켜줍니다.
- 이 때는 +2를 하지 않습니다.
```js
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
```
그리고 `carIndex === 0` 일 때(첫번째 슬라이드),  
`setTimeout` 을 활용하여 자연스럽게 마지막 값으로 추가했던 `cloneNode` 로 넘어가게 해줍니다.  
이때 `slideList`의 `transition = 0s`,  `translate(-${contsWidth * slideLen}%, 0)` 으로 설정해서  
아무런 변화 없이 바로 마지막 슬라이드로 이동하도록 설정해줍니다.  

그리고 `click Event`가 실행 될 때 마다  
`carSlide` 클래스에서 `active`값을 지우고,  
`carSlide`값을 `slideConts[--carIndex]`로 변경해줍니다.  
그 뒤에 다시 `carSlide` 클래스에 `active`값을 추가해줘서  
`active`값이 `carIndex`값에 맞게 이동될 수 있도록 설정해줍니다.

```js
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
```
마지막으로 `paly, pause` 버튼 이벤트입니다.  
먼저 값을 변경할 수 있는 `let`으로 `play`변수를 하나 만들어줍니다.  
그리고 `play, pause`버튼에 각각 `click event`를 만들어서  
`play` 버튼을 클릭하면 `play`에 `setInterval`값을 할당한 뒤,  
`play` 버튼을 숨기고 `pause`버튼을 보여줍니다.  

그리고 `pause`버튼을 클릭하면 `clearInterval(play)`를 실행한 뒤,  
`pause` 버튼을 숨기고 `play`버튼을 보여줍니다.
