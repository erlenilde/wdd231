const menuButton = document.getElementById('menuButton');
const mainMenu = document.getElementById('mainMenu');

menuButton.addEventListener('click', () => {
    mainMenu.classList.toggle('show');
});