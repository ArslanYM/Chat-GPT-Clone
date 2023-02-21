import bot from './assets/bot.svg';
import user from './assets/user.svg';


const form =document.querySelector('form')
const chatContainer = document.querySelector('#chat_container');


let loadInterval;

function loader (element) {
    element.textcontent= "";

    loadInterval = setInterval(()=>{
       //keep adding dots while loading every 300ms
       element.textcontent += '.';
       //reset loading back to empty after three dots
       if(element.textcontent==='....') {
        element.textcontent='';
       }
    },300)
}

function typeText(element,text) {
    let index = 0;
    //add text letter by letter while bot is typing

    let interval = setInterval(()=> {
        if(index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        }else{
            clearInterval(interval);
        }
    },20)
}


 
