let today = new Date();
const date = today.getTime()
var time = document.querySelectorAll('.time');
const oneDay = 24 * 60 * 60 * 1000;
const yesterday = new Date(date - oneDay);
const tomorrow = new Date(date + oneDay);
const afterTomo = new Date(date + (oneDay * 2));
const threeDay = new Date(date + (oneDay * 3));
console.log(time.length);

const tomo = new Date(today.setDate(today.getDate()+1));
const after = new Date(today.setDate(today.getDate() + 1));
const three = new Date(today.setDate(today.getDate()+ 1));

function getTime(day) {
    
    this.day = day;
    
    if(day === "tomo") {
        day = tomo;
    } else if(day === "after") {
        day = after;
    } else if(day === "three") {
        day = three;
    } else {
        day = new Date();
    }
    const text = day.getFullYear() + "-" + ('00' + (day.getMonth() + 1)).slice(-2) + "-" + ('00' + day.getDate()).slice(-2);
    return text;
}
time[0].textContent = getTime("today");
time[1].textContent = getTime("tomo");
time[2].textContent = getTime("after");
time[3].textContent = getTime("three");


// time.textContent = `${date.setDate(date.getMonth())}-${date.setDate(date.getDate() + 1)}`
