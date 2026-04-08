
const tarjetas=document.querySelectorAll('.tarjeta');
tarjetas.forEach(t=>{
t.addEventListener('click',()=>{
t.classList.toggle('flip');
});
});