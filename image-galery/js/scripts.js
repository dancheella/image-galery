async function fetchImages(apiQuery) {
  const MY_ID = 'GLBIlelbHI8Lv8IbtMlcmJsxY6_GIa3BM95CjGdc708';
  const url = `https://api.unsplash.com/photos/random?client_id=${MY_ID}&count=30&query=${apiQuery}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok && data.length) {
      return data;
    }
  } catch (err) {
    alert('Токен сломался или запрос неверный!');
  }
  return [];
}

function displayImages(imagesData) {
  const imagesItem = document.getElementById('images__item');
  imagesItem.innerHTML = imagesData.map(({urls: {regular}}) => {
    return `<img class="images__item-img" src="${regular}" alt="Random photo">`;
  }).join("");
}

function generateRandomQuery() {
  const keywords = ['nature', 'animals', 'food'];
  const randomIndex = Math.floor(Math.random() * keywords.length);
  return keywords[randomIndex];
}

// Обработчик события при загрузке страницы
document.addEventListener("DOMContentLoaded", async () => {
  const randomQuery = generateRandomQuery();
  const imagesData = await fetchImages(randomQuery);
  displayImages(imagesData);

  const searchForm = document.querySelector('.header__search');
  const searchInput = document.querySelector('.header__search-input');
  const clearButton = document.querySelector('.header__search-clear');
  const searchButton = document.querySelector('.header__search-btn');

  // Обработчик события для формы поиска
  searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    if (searchQuery !== '') {
      const imagesData = await fetchImages(searchQuery);
      displayImages(imagesData);
    }
  });

  async function handleSearch() {
    const searchQuery = searchInput.value.trim();
    if (searchQuery !== '') {
      const imagesData = await fetchImages(searchQuery);
      displayImages(imagesData);
    }
  }

  // для кнопки поиска
  searchButton.addEventListener('click', async function () {
    await handleSearch();
  });

  // для поля ввода
  searchInput.addEventListener('keydown', async function (event) {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  });

  clearButton.addEventListener('click', function () {
    searchInput.value = '';
    searchInput.placeholder = 'Search...';
  });
});

// Year
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer__year');
yearElement.textContent = currentYear.toString();