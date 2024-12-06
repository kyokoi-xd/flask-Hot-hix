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

if (typeof pdfjsLib === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js';
    document.body.appendChild(script);
}

// Функция для открытия PDF в модальном окне
function openPDF(url) {
    const viewer = document.getElementById('pdfViewer');
    const canvas = document.getElementById('pdfCanvas');
    viewer.style.display = 'flex';

    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
        pdf.getPage(1).then(function(page) {
            const scale = 1;
            const viewport = page.getViewport({ scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const context = canvas.getContext('2d');
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
}

// Закрыть модальное окно
function closeViewer() {
    const viewer = document.getElementById('pdfViewer');
    viewer.style.display = 'none';
}

// Закрытие через крестик
document.getElementById('closeButton').addEventListener('click', closeViewer);


document.querySelectorAll('.faq__item').forEach(item => {
    item.addEventListener('click', () => {
        // Закрыть все другие ответы
        document.querySelectorAll('.faq__item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('open');
            }
        });

        // Открыть/закрыть текущий
        item.classList.toggle('open');
    });
});


const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel__item');
const prevButton = document.querySelector('.carousel__btn.prev');
const nextButton = document.querySelector('.carousel__btn.next');

let currentIndex = 0;

function updateCarousel() {
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.style.display = 'block'; // Отображаем текущую карточку
        } else {
            item.style.display = 'none'; // Прячем остальные карточки
        }
    });
}

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
});
