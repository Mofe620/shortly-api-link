const toggler = document.querySelector('#navToggle');
const nav = document.querySelector('nav');
const overlay = document.querySelector('#overlay');
toggler.addEventListener('click', ()=>{
    nav.classList.toggle('show');
    toggler.classList.toggle('close');
    overlay.classList.toggle('show');
})
overlay.addEventListener('click', ()=>{
    nav.classList.remove('show');
    toggler.classList.remove('close');
    overlay.classList.remove('show');
})