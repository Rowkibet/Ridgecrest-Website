// Caching the DOM
const trackContainer = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');// ul
let slides = track.children;// li items
const prevButton = document.querySelector('.previous-btn');
const nextButton = document.querySelector('.next-btn');
const dotsNav = document.querySelector('.carousel-slider-nav');
const dots = dotsNav.children;

let pointerOnCarousel = false;
let timerID = null;
let timeoutID = null;

// Arrange the slides next to one another
    function arrangeSlides() {
        // width of individual slide
        const slideWidth = slides[0].getBoundingClientRect().width;

        //Insert a left property to the three image slides
        Array.from(slides).forEach(function(slide, index) {
            slide.style.left = `${slideWidth * index}px`; 
        });
    }
    arrangeSlides();

// Autoplay carousel
// Create clones of the first and last slides
const firstClone = slides[0].cloneNode(true);
firstClone.className = "carousel-slide first-clone";
const lastClone = slides[slides.length - 1].cloneNode(true);
lastClone.className = "carousel-slide last-clone"

track.append(firstClone);
track.prepend(lastClone);

arrangeSlides();
slides = track.children;

const firstSlide = document.querySelector('.current-slide');
track.style.transform = `translateX(-${firstSlide.style.left})`;

function changeSlides() {
    timerID = setInterval(() => {
        const currentSlide = document.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = document.querySelector('.current-dot');
        const nextDot = currentDot.nextElementSibling;

        moveToSlide(track, currentSlide, nextSlide);
        //changeDot(currentDot, nextDot);
    }, 3000)
}

changeSlides();

track.addEventListener('transitionend', () => {
    const currentSlide = document.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = document.querySelector('.current-dot');
    const nextDot = currentDot.nextElementSibling;

    //check if reached the firstClone
    if(currentSlide.className === firstClone.className) {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${firstSlide.style.left})`;
        currentSlide.classList.remove('current-slide');
        slides[1].classList.add('current-slide');

        currentDot.classList.remove('current-dot');
        dots[0].classList.add('current-dot');
    } 
    else if(currentSlide.className === lastClone.className) {
        const lastSlide = slides[slides.length - 2];

        track.style.transition = 'none';
        track.style.transform = `translateX(-${lastSlide.style.left})`;
        currentSlide.classList.remove('current-slide');
        lastSlide.classList.add('current-slide');

        currentDot.classList.remove('current-dot');
        dots[0].classList.add('current-dot');
    }
});

// Display the arrows and nav indicators only when pointer hovers on carousel
timeoutID = setTimeout(showOnHover, 1000);

function showOnHover(pointerOnCarousel) {
    if(pointerOnCarousel) {
        const currentSlide = document.querySelector('.current-slide');
        const currentIndex = Array.from(slides).findIndex(slide => slide === currentSlide);
        
        //hideAndShowArrows(prevButton, nextButton, currentIndex, slides);
        prevButton.style.left = '0px';
        nextButton.style.right = '0px';
    } else {
        prevButton.style.left = '-45px';
        nextButton.style.right = '-45px';
    }
}

//Stop changing of slides when mouse hovers
trackContainer.addEventListener('mouseover', () => {
    pointerOnCarousel = true;
    showOnHover(pointerOnCarousel);
    clearInterval(timerID);
});
trackContainer.addEventListener('mouseleave', () => {
    pointerOnCarousel = false;
    showOnHover(pointerOnCarousel);
    changeSlides();
});

//When I click left, move the slide to the left
prevButton.addEventListener('click', function(eventObject){
    const currentSlide = document.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = document.querySelector('.current-dot');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = Array.from(slides).findIndex(slide => slide === prevSlide);

    // Move to previous slide
    moveToSlide(track, currentSlide, prevSlide);

    // Move to previous dot
    //changeDot(currentDot, prevDot);
    
});

// Buttons and Nav Indicators
//When I click right, move the slide to the right
nextButton.addEventListener('click', function(eventObject){
    const currentSlide = document.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = document.querySelector('.current-dot');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = Array.from(slides).findIndex(slide => slide === nextSlide);

    // Move to next slide
    moveToSlide(track, currentSlide, nextSlide);

    // Move to next dot
    //changeDot(currentDot, nextDot);

});

//When I click a slider indicator, move to the image slide matching the indicator
dotsNav.addEventListener('click', function(eventObject) {
    const currentSlide = document.querySelector('.current-slide');
    const currentDot = document.querySelector('.current-dot');
    const targetDot = eventObject.target.closest('button');

    if(!targetDot) return;

    //Move indicator to the clicked dot
    changeDot(currentDot, targetDot);

    // Move to matching slide when indicator clicked
        //Get index of of the dot clicked
        const targetIndex = Array.from(dots).findIndex(dot => dot === targetDot);

        //Move to slide
        targetSlide = slides[targetIndex];
        moveToSlide(track, currentSlide, targetSlide);

    // Hide and Show arrow buttons
    hideAndShowArrows(prevButton, nextButton, targetIndex, slides);

});

//Function definitions
function moveToSlide(track, currentSlide, targetSlide) {
    track.style.transition = 'transform 250ms ease-in-out';
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

/*function hideAndShowArrows(prevButton, nextButton, targetIndex, slides) {
    if(targetIndex === 0){
        prevButton.style.left = '-45px';
        nextButton.style.right = '0px';
    } else if(targetIndex === slides.length-1){
        prevButton.style.left = '0px';
        nextButton.style.right = '-45px';
    } else {
        prevButton.style.left = '0px';
        nextButton.style.right = '0px';
    }
} */

function changeDot(currentDot, targetDot) {
    currentDot.classList.remove('current-dot');
    targetDot.classList.add('current-dot');
}

function showDots() {
    dotsNav.classList.add('is-hidden');
}
