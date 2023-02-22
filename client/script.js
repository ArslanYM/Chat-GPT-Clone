import bot from './assets/bot.svg';
import user from './assets/user.svg';


const form =document.querySelector('form')
const chatContainer = document.querySelector('#chat_container');


let loadInterval;

function loader(element) {
    element.textContent= '';

    loadInterval = setInterval(()=>{
       //keep adding dots while loading every 300ms
       element.textContent += '.';
       
       //reset loading back to empty after three dots
       if(element.textContent==='....') {
        element.textContent='';
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
        } else{
            clearInterval(interval);
        }
    },20)
}

function generateUniqueId() {
    const timestamp  = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString();

    return `id-${timestamp}-${hexadecimalString}`;
}
 
function chatStripe(isAi, value , uniqueId) {
   return(
    `
    <div class="wrapper ${isAi && 'ai'}>
      <div class="chat">
        <div className="profile">
        <img
        src="${isAi? bot : user}"
        alt="${isAi? 'bot' : 'user'}"
        />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
    `
   )
}


const handleSubmit = async(e)=>{
    e.preventDefault();

    const data = new FormData(form);

    //users chatstripe 
    chatContainer.innerHTML+= chatStripe(false, data.get('prompt'));
    form.reset();

    //bots chatstripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML+= chatStripe(true, "" , uniqueId);
    

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);

    loader(messageDiv);

}


form.addEventListener('submit', handleSubmit);

form.addEventListener('keyup', (e)=> {
    if(e.keyCode===13){
        handleSubmit(e);
    }
})