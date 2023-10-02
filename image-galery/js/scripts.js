document.addEventListener("DOMContentLoaded", () => {
  const MY_ID = 'NsQLHwviPP-8ud0MLQo1zpc3p676iOriY1yz4_8xZ6A';
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
        console.log(data)
        setImages();
      } else {
        imagesItem.innerHTML = `<h1 class="images__title">Oops! Nothing found</h1>`;
      }
    } catch (err) {
      console.log(err);
    }
  };

  getData();

  const inputImageItem = () => {
    return array.map(({ urls: { small_s3 }, user: { name, profile_image: { small }, location} }) => {
      return `<div class="images__item">
                <div class="images__item-img" style="background-image: url(${small_s3})"></div>
                <div class="images__item-info">
                  <div class="images__item-info__img-author" style="background-image: url(${small})"></div>
                  <div class="images__item-info__description">
                    <div class="images__item-info__description-title">${name}</div>
                    <div class="images__item-info__description-location">
                      <img src=" assets/images/location.png" alt="Location">
                      <span>${location}</span>
                    </div>
                  </div>
                </div>
                <div class="images__item-blackout"></div>
              </div>`;
    }).join("");
  };

  const setImages = () => {
    imagesItem.innerHTML = inputImageItem();
  };

  imagesItem.addEventListener("touchstart", function (event) {
    const target = event.target;
    if (target.classList.contains("images__item-img")) {
      const parentItem = target.closest(".images__item");
      parentItem.classList.add("active");
    }
  });

  imagesItem.addEventListener("touchend", function (event) {
    const target = event.target;
    if (target.classList.contains("images__item-img")) {
      const parentItem = target.closest(".images__item");
      parentItem.classList.remove("active");
    }
  });

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
  });
});

// Year
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer__year');
yearElement.textContent = currentYear.toString();