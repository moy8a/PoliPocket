const chatInput = document.getElementById('chatInput');
const suggestionChips = document.querySelectorAll('.chip');
const sendBtn = document.getElementById('sendBtn');

suggestionChips.forEach(chip => {
chip.addEventListener('click', () => {
const message = chip.getAttribute('data-message');
chatInput.value = message;
sendBtn.click();
});
});

sendBtn.addEventListener('click', () => {
const message = chatInput.value.trim();
if(message){
console.log('Mensaje enviado:',message);
chatInput.value='';
}
});

chatInput.addEventListener('keypress',(e)=>{
if(e.key==='Enter'){
sendBtn.click();
}
});