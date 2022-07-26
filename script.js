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
    else {
        userLink.setAttribute('class', 'error');
        document.querySelector('#error').setAttribute('class', 'show');
    }
})


async function shortenLink(validUrl) {
    try {
        let apiCall = await fetch(`https://api.shrtco.de/v2/shorten?url=${validUrl}`);
        let response = await apiCall.json();

        let originalLink = response.result.original_link;
        let shortLink1 = response.result.short_link;
        let shortLink2 = response.result.full_short_link;
        let shortLink3 = response.result.short_link2;
        let shortLink4 = response.result.full_short_link2;

        let Links = [originalLink, shortLink1, shortLink2, shortLink3, shortLink4];
        
        localStorage.setItem('SavedLinks', JSON.stringify(Links))
        displayLink(Links);

        const userLink = document.querySelector('#input-link');
        userLink.setAttribute('class', '');
        document.querySelector('#error').setAttribute('class', '');
    } 
    catch (error) {
        const userLink = document.querySelector('#input-link');
        userLink.setAttribute('class', 'error');
        document.querySelector('#error').setAttribute('class', 'show');
        document.querySelector('#error').textContent = "That is not a valid link address.."
    }
    
}

const resultArea = document.querySelector('.short-link-results');
function displayLink (Links){
    resultArea.style.opacity = 1;
    // if you want to display a new field for each of the shortened link variants....
    // Links.map(shortLink => { 
        let field = document.createElement('div');
        field.setAttribute('class', 'link-field');

        let originalLinkText = document.createElement('p');
        originalLinkText.setAttribute('name', 'link');
        originalLinkText.textContent = Links[0];

        let newLinkArea = document.createElement('div');
        newLinkArea.setAttribute('class', 'result');

        let newLink = document.createElement('a');
        newLink.setAttribute('href', Links[4]);
        newLink.textContent = Links[4];

        let copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.setAttribute('class', 'default');

        newLinkArea.appendChild(newLink);
        newLinkArea.appendChild(copyBtn);
        field.appendChild(originalLinkText);
        field.appendChild(newLinkArea);
        resultArea.appendChild(field);

    //})
    let click = document.querySelectorAll('.link-field button');
    click.forEach(button => {button.addEventListener('click', (e) => copyLink(e))});
}



function copyLink(e){
    var clickedBtn = e.target;
    var resultDiv = clickedBtn.parentElement;
    var link = resultDiv.firstChild;
    var range = document.createRange();
    range.selectNode(link);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect

    clickedBtn.classList.toggle('copied');

    let classname = clickedBtn.getAttribute('class');

    if(classname.includes('copied')){
        clickedBtn.textContent = "Copied!";
    }
    else {clickedBtn.textContent = 'Copy';}
}

//Persist links in local storage
if(JSON.parse(localStorage.getItem('SavedLinks'))){
    SavedLinks = JSON.parse(localStorage.getItem('SavedLinks'));
    resultArea.style.opacity = 1;
    displayLink(SavedLinks);
}