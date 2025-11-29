const houseData = {
    house1: {
        title: "Шикарный домик с мансардой",
        price: "7 000 ₽ / ночь",
        description: "Просторный и светлый дом с уютной мансардой. Идеально подходит для большой семьи или компании друзей. Включает полностью оборудованную кухню, камин и большую террасу с видом на лес. Мы предоставляем постельное белье, полотенца и всё для комфортного приготовления пищи. Насладитесь уединением!",
        photos: [
            'house1_1.jpg', 
            'house1_2.jpg',
            'house1_3.jpg',
            'house1_4.jpg'
        ]
    },
    house2: {
        title: "Уютный маленький домик",
        price: "4 000 ₽ / ночь",
        description: "Миниатюрный домик для романтического отдыха вдвоем. Оборудован всем необходимым для комфортного проживания. Рядом речка и место для барбекю. Настоящее уединение с природой! Дом оснащен теплым полом и панорамным окном, откуда открывается живописный вид.",
        photos: [
            'house2_1.jpg', 
            'house2_2.jpg',
            'house2_3.jpg'
        ]
    }
};

const modal = document.getElementById('house-modal');
const closeModal = document.querySelector('.close-button');
const houseCards = document.querySelectorAll('.house-card');
const mainImage = document.getElementById('modal-main-image');
const thumbnailsContainer = document.getElementById('modal-thumbnails');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalDescription = document.getElementById('modal-description');

// НОВЫЕ ПЕРЕМЕННЫЕ ДЛЯ ГАЛЕРЕИ
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentPhotos = []; // Массив фото текущего домика
let currentPhotoIndex = 0; // Индекс текущего отображаемого фото

// Функция для смены главного фото
function changePhoto(newIndex) {
    const totalPhotos = currentPhotos.length;
    
    // Вычисляем новый индекс с зацикливанием (кольцевое переключение)
    currentPhotoIndex = (newIndex + totalPhotos) % totalPhotos;
    
    // Обновляем главное фото
    mainImage.src = currentPhotos[currentPhotoIndex];

    // Обновляем активность миниатюр
    document.querySelectorAll('.thumbnails img').forEach((thumb, index) => {
        thumb.classList.remove('active');
        if (index === currentPhotoIndex) {
            thumb.classList.add('active');
        }
    });
}

// Добавляем обработчики для стрелок
prevBtn.onclick = () => changePhoto(currentPhotoIndex - 1);
nextBtn.onclick = () => changePhoto(currentPhotoIndex + 1);


// Функция для обновления галереи в модальном окне
function updateGallery(photos) {
    currentPhotos = photos; // Сохраняем массив фото для стрелок
    currentPhotoIndex = 0;   // Сбрасываем индекс
    
    thumbnailsContainer.innerHTML = ''; 

    photos.forEach((photoSrc, index) => {
        const img = document.createElement('img');
        img.src = photoSrc;
        img.alt = `Фото ${index + 1}`;
        
        // При клике на миниатюру меняем фото, используя новую функцию
        img.onclick = () => {
            changePhoto(index); 
        };
        
        if (index === 0) {
            img.classList.add('active');
        }

        thumbnailsContainer.appendChild(img);
    });
    
    // Устанавливаем основное фото
    mainImage.src = photos[0];
}


// Добавляем обработчик клика на каждую карточку домика
houseCards.forEach(card => {
    card.addEventListener('click', () => {
        const houseId = card.getAttribute('data-house');
        const data = houseData[houseId];

        // Заполняем модальное окно данными
        modalTitle.textContent = data.title;
        modalPrice.textContent = data.price;
        modalDescription.textContent = data.description;
        
        // Загружаем галерею и фото
        updateGallery(data.photos);

        // Показываем модальное окно
        modal.style.display = 'block';
        
        document.body.style.overflow = 'hidden';
    });
});

// Закрытие модального окна
function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeModal.onclick = closeModalHandler;

// Добавим закрытие по клавише ESC для удобства
document.addEventListener('keydown', (event) => {
    if (event.key === "Escape" && modal.style.display === 'block') {
        closeModalHandler();
    }
});