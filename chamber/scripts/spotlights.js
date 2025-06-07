const spotlightSection = document.querySelector('#spotlights');
const membersUrl = 'data/members.json';

async function loadSpotlights() {
    const response = await fetch(membersUrl);
    const data = await response.json();
    let featured = data.members.filter(member =>
        member.membershipLevel === 'gold' || member.membershipLevel === 'silver'
    );

    featured = shuffleArray(featured);

    featured.slice(0, 3).forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        card.innerHTML = `
        <img src="${member.image}" alt="Logo of ${member.name}">
        <h3>${member.name}</h3>
        <p><strong>Endereço:</strong> ${member.address}</p>
        <p><strong>Telefone:</strong> ${member.phoneNumber}</p>
        <a href="https://${member.websiteUrl}" target="_blank">Visit website</a>
        <p class="membership ${member.membershipLevel}">${member.membershipLevel.charAt(0).toUpperCase() + member.membershipLevel.slice(1)} Member</p>
        `;
        spotlightSection.appendChild(card);
    });
}


function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = 
    [array[randomIndex], array[currentIndex]];
  }
  return array;
}

loadSpotlights();