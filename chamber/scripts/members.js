const url = 'data/members.json';
const cards = document.querySelector('#business');

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.members);
    displayMembers(data.members); //feito até aqui
    }

    getMembersData();

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('member-card');
        let name = document.createElement('h3');
        let email = document.createElement('p');
        let phone = document.createElement('p');
        let address = document.createElement('p');
        let website = document.createElement('a');
        let portrait = document.createElement('img');

        name.textContent = `${member.name}`
        email.textContent = `EMAIL: ${member.email}`
        phone.textContent = `PHONE: ${member.phoneNumber}`
        website.textContent = `URL: ${member.websiteUrl}`
        address.textContent = `${member.address}`

        portrait.setAttribute('src', member.image);
        portrait.setAttribute('alt', `Portrait of ${member.name}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '50');
        portrait.setAttribute('height', '50');

        card.appendChild(name);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(portrait);
        card.appendChild(website);
        card.appendChild(address);

        cards.appendChild(card);
    });
}

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#business");

gridbutton.addEventListener("click", () => {

	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}