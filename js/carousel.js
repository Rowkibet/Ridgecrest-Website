// Caching the DOM
const trackContainer = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');
let slides = track.children;
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

// Change slides after every 3 seconds
function changeSlides() {
    timerID = setInterval(() => {
        const currentSlide = document.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = document.querySelector('.current-dot');
        const nextDot = currentDot.nextElementSibling;
        const currentIndex = Array.from(slides).findIndex(slide => slide === currentSlide);

        moveToSlide(track, currentSlide, nextSlide);

        //When moving to first slide from last slide
        if(currentIndex === slides.length-2) {
            currentDot.classList.remove('current-dot');
            dots[0].classList.add('current-dot');  
        } else {  
            //move to next dot  
            changeDot(currentDot, nextDot);
        }
    }, 3000)
}

changeSlides();

// Make the changes of slides in both directions infinite
track.addEventListener('transitionend', () => {
    const currentSlide = document.querySelector('.current-slide');

    if(currentSlide.className === firstClone.className) {
        track.style.transition = 'none';
        track.style.transform = `translateX(-${firstSlide.style.left})`;
        currentSlide.classList.remove('current-slide');
        slides[1].classList.add('current-slide');
    } 
    else if(currentSlide.className === lastClone.className) {
        const lastSlide = slides[slides.length - 2];

        track.style.transition = 'none';
        track.style.transform = `translateX(-${lastSlide.style.left})`;
        currentSlide.classList.remove('current-slide');
        lastSlide.classList.add('current-slide');
    }
});

// Display the arrows only when pointer hovers on carousel
timeoutID = setTimeout(showOnHover, 1000);

function showOnHover(pointerOnCarousel) {
    if(pointerOnCarousel) {     
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

// Buttons and Nav Indicators
//When I click left, move the slide to the left
prevButton.addEventListener('click', () => {
    const currentSlide = document.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = document.querySelector('.current-dot');
    const prevDot = currentDot.previousElementSibling;
    const currentIndex = Array.from(slides).findIndex(slide => slide === currentSlide);

    // Move to previous slide
    moveToSlide(track, currentSlide, prevSlide);

    //when moving back to last slide
    if(currentIndex === 1) {
        currentDot.classList.remove('current-dot');
        dots[dots.length-1].classList.add('current-dot'); 
    } else {
        // Move to previous dot
        changeDot(currentDot, prevDot);
    }
});

//When I click right, move the slide to the right
nextButton.addEventListener('click', () => {
    const currentSlide = document.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = document.querySelector('.current-dot');
    const nextDot = currentDot.nextElementSibling;
    const currentIndex = Array.from(slides).findIndex(slide => slide === currentSlide);

    // Move to next slide
    moveToSlide(track, currentSlide, nextSlide);

    //When reached last original slide
    if(currentIndex === slides.length-2) {
        currentDot.classList.remove('current-dot');
        dots[0].classList.add('current-dot');  
    } else {    
        // Move to next dot
        changeDot(currentDot, nextDot, currentIndex);
    }

});

//When I click a slider indicator, move to the image slide matching the indicator
dotsNav.addEventListener('click', event => {
    const currentSlide = document.querySelector('.current-slide');
    const currentDot = document.querySelector('.current-dot');
    const targetDot = event.target.closest('button');

    if(!targetDot) return;

    //Move indicator to the clicked dot
    changeDot(currentDot, targetDot);

    // Move to matching slide when indicator clicked
        //Get index of of the dot clicked
        const targetIndex = Array.from(dots).findIndex(dot => dot === targetDot);

        //Move to slide
        targetSlide = slides[targetIndex+1];
        moveToSlide(track, currentSlide, targetSlide);
});

//Function definitions
function moveToSlide(track, currentSlide, targetSlide) {
    track.style.transition = 'transform 300ms ease-in-out';
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

function changeDot(currentDot, targetDot) { 
    currentDot.classList.remove('current-dot');
    targetDot.classList.add('current-dot');
}
