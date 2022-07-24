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

const Btn = document.querySelector('#shorten-btn');
const userLink = document.querySelector('#input-link');
Btn.addEventListener('click', ()=>{
    if(userLink.value) {

        validUrl = userLink.value;
        shortenLink(validUrl);
    }
})


async function shortenLink(validUrl) {
    let apiCall = await fetch(`https://api.shrtco.de/v2/shorten?url=${validUrl}`);
    let response = await apiCall.json();
    let shortLink1 = response.result.short_link;
    let shortLink2 = response.result.full_short_link;
    let shortLink3 = response.result.short_link2;
    let shortLink4 = response.result.full_short_link2;

    let Links = [shortLink1, shortLink2, shortLink3, shortLink4];
    // if(JSON.parse(localStorage.getItem('SavedLinks'))){
    //     localStorage.removeItem("SavedLinks"); 
    // }
    localStorage.setItem('SavedLinks', JSON.stringify(Links))
    displayLink(Links);
}

const resultArea = document.querySelector('.short-link-results');
function displayLink (Links){
    resultArea.style.opacity = 1;
    Links.map(shortLink => {
        let field = document.createElement('div');
        field.setAttribute('class', 'link-field');
        let linkText = document.createElement('p');
        let icon = document.createElement('i');
        linkText.textContent = shortLink;
        icon.setAttribute('class', 'fa-regular fa-clipboard');
        linkText.setAttribute('name', 'link');
        field.appendChild(linkText);
        field.appendChild(icon);
        resultArea.appendChild(field);

    })
    let clickField = document.querySelectorAll('.link-field')
    clickField.forEach(linkArea => linkArea.addEventListener('click', (e) => copyLink(e)))
}



function copyLink(e){
    var clicked = e.target;
    var child = clicked.firstChild;
    var range = document.createRange();
    range.selectNode(child);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
    if(clicked.querySelector('.fa-clipboard')){
        clicked.querySelector('.fa-clipboard').remove();
    }
    var msg = document.createElement('span');
    msg.textContent = 'copied to clipboard';
    clicked.appendChild(msg);
}

// Persist links in local storage
// if(JSON.parse(localStorage.getItem('SavedLinks'))){
//     SavedLinks = JSON.parse(localStorage.getItem('SavedLinks'));
//     resultArea.style.opacity = 1;
//     displayLink(SavedLinks);
// }