document.addEventListener("DOMContentLoaded", () => {
  const MY_ID = '7mnvKSFxX6NkopngV6z1ujnFjDMXwggj82cm9zmTv0k';
  const url = `https://api.unsplash.com/photos/random?client_id=${MY_ID}&count=30`;

  const imagesItem = document.getElementById('images__item');
  const searchForm = document.querySelector('.header__search');
  const searchInput = document.querySelector('.header__search-input');
  const clearButton = document.querySelector('.header__search-clear');
  const searchButton = document.querySelector('.header__search-btn');

  let array = [];

  const getData = async (searchQuery) => {
    try {
      const apiUrl = searchQuery ? `${url}&query=${searchQuery}` : url;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (res.ok && data.length) {
        array = data;
        setImages();
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  getData();

  const inputImageItem = () => {
    return array.map(({ urls: { small_s3 } }) => {
      return `<div class="images__item">
                <div class="images__item-img" style="background-image: url(${small_s3})"></div>
              </div>`;
    }).join("");
  };

  const setImages = () => {
    imagesItem.innerHTML = inputImageItem();
  };

  const handleSearch = async () => {
    const searchQuery = searchInput.value.trim();
    if (searchQuery !== '') {
      await getData(searchQuery);
    }
  };

  searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    await handleSearch();
  });

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