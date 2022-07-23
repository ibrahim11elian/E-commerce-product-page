

// get the elements that controle the counter 
let counterMinus = document.querySelectorAll(".counter img")[0];
let counterPlus = document.querySelectorAll(".counter img")[1];

counterPlus.addEventListener("click", () => {
    // get the pruduct counter
    let counterElement = document.querySelector(".counter span");
    let counterNumber = parseInt(counterElement.textContent);
    counterElement.textContent = ++counterNumber;
});

counterMinus.addEventListener("click", () => {
    // get the pruduct counter
    let counterElement = document.querySelector(".counter span");
    let counterNumber = parseInt(counterElement.textContent);
    counterElement.textContent = counterNumber === 0 ? counterNumber : counterNumber - 1;
});

// get the product price
let productPrice = document.querySelector(".price .final-price").textContent.slice(1);

function calculateOrderPrice(price, number) {
    return price * number;
}

// get add to cart button and add Event Listener to update the cart content.

let addToCartButton = document.querySelector("#add-cart-button");
addToCartButton.addEventListener('click', () => updateCart());

// update the cart content based on the number of products selected and update the final price.

function updateCart() {

    // get the pruduct counter
    let counterElement = document.querySelector(".counter span");
    let counterNumber = parseInt(counterElement.textContent);

    let cartContent = document.querySelector(".cart-content");
    let counterOnCart = document.querySelector(".counter-num");

    if (counterNumber === 0) {
        cartContent.innerHTML = `<div class="empty-content"> Your cart is empty. </div>`;
        counterOnCart.style.display = `none`;
    } else {
        cartContent.innerHTML = `<section class="filled-content">
              <img id="order-photo" src="images/image-product-1-thumbnail.jpg" alt="">
              <div class="order-content">
                Fall Limited Edition Sneakers
                $${productPrice} x ${counterNumber} <span>$${calculateOrderPrice(productPrice, counterNumber)}</span>
              </div>
              <img id="delete" src="images/icon-delete.svg" alt="">
              <button class="checkout">Checkout</button>
            </section>`;
        counterOnCart.style.display = 'block';
        counterOnCart.textContent = counterNumber;

        let deleteOrder = document.querySelector("#delete");
        deleteOrder.addEventListener('click', () => {
            cartContent.innerHTML = `<div class="empty-content center-element"> Your cart is empty. </div>`;
            counterOnCart.style.display = `none`;
        });
    }
}

// get all thumnails, product images to change the product preview based on clicking on thumnails

let prodcutThumnail = document.querySelectorAll(".product-thumnail");
let prodcutImage = document.querySelectorAll('.product');

// adding event listner to all tumnails to change the product image

prodcutThumnail.forEach((ele, index) => {
    ele.addEventListener('click', () => {
        prodcutThumnail.forEach((el) => {
            if (el.classList.contains("active")) {
                el.classList.remove('active');
            }
        });
        prodcutImage.forEach((el) => {
            if (el.classList.contains("product-image")) {
                el.classList.remove('product-image');
            }
        });
        ele.classList.add('active');
        prodcutImage[index].classList.add("product-image");
    });
});

// open navigation menu on mobile screen 

let mobMenu = document.querySelector(".menu");
let navBar = document.querySelector('#navigations');
let backgroundOpacity = document.createElement('div');
backgroundOpacity.classList.add('background-opacity');
mobMenu.addEventListener('click', () => {
    navBar.style.display = 'flex';
    navBar.style.height = document.querySelector('body').clientHeight + 'px';
    document.body.appendChild(backgroundOpacity);
});

// close navigation menu

let closeMenu = document.querySelector('ul li.close');
closeMenu.addEventListener('click', () => {
    navBar.style.display = 'none';
    backgroundOpacity.remove();
});

// function for changing the product images in mobile screen and lightbox

let currentIndex = 1;
function displaySlides(product, thum, num) {
    if (num > product.length) { currentIndex = 1; }
    if (num < 1) { currentIndex = product.length; }
    for (let i = 0; i < product.length; i++) {
        product[i].classList.remove('product-image');
        thum[i].classList.remove('active');
    }
    product[currentIndex - 1].classList.add("product-image");
    thum[currentIndex - 1].classList.add("active");
}

// event listner on image swich bottuns 

let next = document.querySelector('#swich-next');
next.addEventListener('click', () => {
    displaySlides(prodcutImage, prodcutThumnail, currentIndex += 1);
});
let prev = document.querySelector('#swich-prev');
prev.addEventListener('click', () => {
    displaySlides(prodcutImage, prodcutThumnail, currentIndex -= 1);
});

// event listening on image product to open the lightbox.

let activeImage = document.querySelectorAll('.main-content .preview .product');

activeImage.forEach((ele) => {
    ele.addEventListener('click', () => {

        // checking if window width is large or not as the lightbox is for large screen only

        if (window.innerWidth > 767.98 && ele.classList.contains('product-image')) {
            let preview = document.querySelector('.preview');

            // coping the preview product structure as it's the same for lightbox

            let clonedPreview = preview.cloneNode(true);
            let leightBox = document.createElement('div');
            leightBox.setAttribute('id', 'leightBox');
            leightBox.appendChild(clonedPreview);
            document.body.appendChild(leightBox);

            // get all thumnails, product images in lightbox to change the product preview based on clicking on thumnails.

            let thumnail = document.querySelectorAll("#leightBox .preview .product-thumnail");
            let image = document.querySelectorAll('#leightBox .preview .product');

            // adding event listner to all tumnails to change the product image

            thumnail.forEach((ele, index) => {
                ele.addEventListener('click', () => {
                    thumnail.forEach((el) => {
                        if (el.classList.contains("active")) {
                            el.classList.remove('active');
                        }
                    });
                    image.forEach((el) => {
                        if (el.classList.contains("product-image")) {
                            el.classList.remove('product-image');
                        }
                    });
                    ele.classList.add('active');
                    image[index].classList.add("product-image");
                });
            });

            // switching between product images in lightbox
            let swich = document.querySelectorAll('#leightBox .preview .swich');
            swich.forEach((ele) => {
                ele.style.cssText = 'display: block; top: 40%; width: 40px; height: 40px';
            });

            next = document.querySelector('#leightBox .preview #swich-next');
            next.style.right = '-38px';

            prev = document.querySelector('#leightBox .preview #swich-prev');
            prev.style.left = '0%';

            next.addEventListener('click', () => {
                displaySlides(image, thumnail, currentIndex += 1);
            });

            prev.addEventListener('click', () => {
                displaySlides(image, thumnail, currentIndex -= 1);

            });

            // create and listening to the close bottun for lightbox

            let close = document.createElement('div');
            close.setAttribute('id', 'close-leightBox');
            clonedPreview.appendChild(close);

            close.addEventListener('click', () => {
                leightBox.remove();
            });
        }

    });
});

// slide show for mobile screens

let slideIndex = 0;
function showSlides() {
    setInterval(() => {
        let i;
        for (i = 0; i < 4; i++) {
            prodcutImage[i].classList.remove('product-image');
        }

        slideIndex++;
        if (slideIndex > 4) { slideIndex = 1; }
        prodcutImage[slideIndex - 1].classList.add("product-image");
    }, 3000);
}

window.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 767.98) {
        prodcutImage.forEach(img => {
            img.style.animationName = 'anima-next';
        });

        showSlides();
    }
});

