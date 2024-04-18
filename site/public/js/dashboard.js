function clicarMenu() {
    const menu = document.getElementById('menuLateral');
    menu.classList.toggle('escondido');

    if (menu.classList.contains('escondido')) {
        menuEscondido.style.display = 'block'
        containerMenuLateral.style.display = 'none';
    }
    else {
        menuEscondido.style.display = 'none'
        containerMenuLateral.style.display = 'block'
    }
}