function clicarMenu() {
    const menu = document.getElementById('menuLateral');
    menu.classList.toggle('escondido');

    if (!menu.classList.contains('escondido')) {
        menu.style.width = '5%';
        menuEscondido.style.display = 'block';
        containerMenuLateral.style.display = 'none';
    }
    else {
        menu.style.width = '22%';
        menuEscondido.style.display = 'none'
        containerMenuLateral.style.display = 'flex'
    }
}