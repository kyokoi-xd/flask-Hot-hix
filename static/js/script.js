document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.nav__menu__btn');
    const navLinks = document.querySelector('.nav__links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuBtn.innerHTML = navLinks.classList.contains('open')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });
});

