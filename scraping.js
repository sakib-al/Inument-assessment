// Fetch Category

const categoryNames = [];
const categoryContainer = document.querySelectorAll(
  '#navigation ul[data-automation="level-1-menu-list"] li[data-automation="nav-menu-item"] button'
);

categoryContainer.forEach((button) => {
  const span = button.querySelector("span");
  if (span) {
    const categoryName = span.textContent.trim();
    categoryNames.push(categoryName);
  }
});

// Get Product Details

function getTextValue(value) {
  const element = document.querySelector(`[data-automation="${value}"]`);

  if (element) {
    return element.textContent.trim();
  } else {
    return null;
  }
}

const sizes = [];
let images = [];
let variants = [];


const description = document.querySelector('[data-automation="product-description-description"]').innerHTML.trim();
const sizeContainer = document.querySelector('[data-automation="select-size"]');
const variantContainer = document.querySelector('[data-automation="pdp-colour-container-desktop"]')
const getVariants = variantContainer.querySelectorAll('a')
const getSizes = sizeContainer.querySelectorAll("span");
const productImageContainer = document.querySelectorAll(
  '[data-automation="product-image"].css-18jj8gr'
);

getVariants.forEach((variant) => {
  variants.push(variant.getAttribute('value'))
})

productImageContainer.forEach((image) => {
  images.push(image.getAttribute("src"));
});

images = [...new Set(images)];

var div = document.createElement("div");
div.innerHTML = description;
const descriptionText = div.textContent;

getSizes.forEach((size) => {
  sizes.push(size.textContent.trim());
});

var productObj = {
  "product-title": getTextValue("product-title"),
  brand: getTextValue("product-brand-name"),
  collection: getTextValue("brand-collection"),
  price: getTextValue("product-price-was"),
  variants: variants,
  size: sizes,
  description: description,
  "description-text": descriptionText,
  image: images,
};

// Pass to End point

const url = "http://ischool-backend.test/api/user-inqueries";
const data = {
  category: categoryNames,
  "product-details": productObj,
};

fetch(url, {
  method: "POST",

  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
