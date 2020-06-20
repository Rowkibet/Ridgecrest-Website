// Caching the DOM
const trackContainer = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');// ul
const slides = track.children;// li items
const prevButton = document.querySelector('.previous-btn');
const nextButton = document.querySelector('.next-btn');
const dotsNav = document.querySelector('.carousel-slider-nav');
const dots = dotsNav.children;

let pointerOnCarousel = false;
let timerID = null;
let timeoutID = null;

// Arrange the slides next to one another
function setLeftProperty() {
    // width of individual slide
    const slideWidth = slides[0].getBoundingClientRect().width;

    //Insert a left property to the three image slides
    Array.from(slides).forEach(function(slide, index) {
        slide.style.left = `${slideWidth * index}px`; 
        //console.log("element left: " +  slideWidth*index + "px")
    });
}

setLeftProperty();

// Autoplay carousel, and stop on hover
timerID = setInterval(changeSlides, 3000); 

function changeSlides() {
    const currentSlide = document.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = document.querySelector('.current-dot');
    const nextDot = currentDot.nextElementSibling;
    const currentIndex = Array.from(slides).findIndex(slide => slide === currentSlide);

    //Remove first slide and place after last slide
    if(currentIndex === slides.length-1) {
        var firstSlide = track.removeChild(slides[0]);
        track.appendChild(firstSlide);
        const newTrack = document.querySelector('.carousel-track');
        //console.log("new track " + newTrack)
        const newSlides = newTrack.children; // undefined
        //console.log("The new items repositioned" + newSlides)

        const currentSlide = document.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;

        //console.log("setting left property")
        setLeftProperty();
        moveToSlide(newTrack, currentSlide, nextSlide);
        //changeDot(currentDot, nextDot);
    }
    //When the first slide is now 'current-slide', reposition last and second slide
    else if(currentIndex === slides.length-1 && currentSlide === firstSlide) {
        const secondSlide = track.removeChild(slides[0]);
        track.appendChild(secondSlide);
        const lastSlide = track.removeChild(slides[0]);
        track.appendChild(lastSlide);
        const newTrack = document.querySelector('.carousel-track');
        const newSlides = newTrack.children;
        console.log("At first slide" + newSlides);
        console.log(slides);

        setLeftProperty();
        moveToSlide(newTrack, currentSlide, nextSlide);
        changeDot(currentDot, nextDot);
    } else {
        moveToSlide(track, currentSlide, nextSlide);
        changeDot(currentDot, nextDot);
    }

};


// Reposition slides when last and first slide is the 'current-slide'
function repositionSlides() {
    const currentSlide = document.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = document.querySelector('.current-dot');
    const nextDot = currentDot.nextElementSibling;
    const currentIndex = Array.from(slides).findIndex(slide => slide === currentSlide); 

        //Remove first slide and place after last slide
        if(currentIndex === slides.length-1) {
            //const lastSlide = slides[slides.length-1];
            var firstSlide = Array.from(slides).shift();
            Array.from(slides).push(firstSlide);

            setLeftProperty();
            moveToSlide(track, currentSlide, nextSlide);
            changeDot(currentDot, nextDot);
        }
        //When the first slide is now 'current-slide', reposition last and second slide
        else if(currentIndex === slides.length-1 && currentSlide === firstSlide) {
            const secondSlide = Array.from(slides).shift();
            Array.from(slides).push(secondSlide);
            const lastSlide = Array.from(slides).shift();
            Array.from(slides).push(lastSlide);

            setLeftProperty();
            moveToSlide(track, currentSlide, nextSlide);
            changeDot(currentDot, nextDot);
        } else {
            moveToSlide(track, currentSlide, nextSlide);
            changeDot(currentDot, nextDot);
        }
}

// Display the arrows and nav indicators only when pointer hovers on carousel
timeoutID = setTimeout(showOnHover, 1000);

function showOnHover(pointerOnCarousel) {
    if(pointerOnCarousel) {
        const currentSlide = document.querySelector('.current-slide');
        const currentIndex = Array.from(slides).findIndex(slide => slide === currentSlide);
        
        hideAndShowArrows(prevButton, nextButton, currentIndex, slides);
    } else {
        prevButton.style.left = '-45px';
        nextButton.style.right = '-45px';
    }
}

trackContainer.addEventListener('mouseover', () => {
    pointerOnCarousel = true;
    console.log(pointerOnCarousel);
    //showOnHover(pointerOnCarousel);
    clearInterval(timerID);
});
trackContainer.addEventListener('mouseleave', () => {
    pointerOnCarousel = false;
    console.log(pointerOnCarousel);
    //showOnHover(pointerOnCarousel);
    timerID = setInterval(changeSlides, 3000);
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
    changeDot(currentDot, prevDot);

    // Hide and Show arrow buttons
    hideAndShowArrows(prevButton, nextButton, prevIndex, slides);
    
});

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
    changeDot(currentDot, nextDot);

    // Hide and Show arrow buttons
    hideAndShowArrows(prevButton, nextButton, nextIndex, slides);

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
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

function hideAndShowArrows(prevButton, nextButton, targetIndex, slides) {
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
}

function changeDot(currentDot, targetDot) {
    currentDot.classList.remove('current-dot');
    targetDot.classList.add('current-dot');
}

