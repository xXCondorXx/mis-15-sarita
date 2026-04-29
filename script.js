// Initialize AOS Animation Library
AOS.init({
    once: true, // whether animation should happen only once - while scrolling down
    offset: 100, // offset (in px) from the original trigger point
    duration: 800, // values from 0 to 3000, with step 50ms
});

// Music Player Logic
const playBtn = document.getElementById('play-btn');
const playIcon = playBtn.querySelector('i');
let isPlaying = false;
let player;

// Cargar la API de YouTube de forma dinámica
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Inicializa el reproductor de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'qfCY6Lp4nko',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'qfCY6Lp4nko' // Necesario para que el loop funcione
        },
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
}

function onPlayerError(event) {
    console.log("Error en el reproductor de YouTube:", event.data);
    // Fallback if origin issue
    alert("Para reproducir la música, debes abrir la página en un servidor local en lugar de darle doble click, o subirla a un hosting, por seguridad de los navegadores web.");
}

function onPlayerReady(event) {
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            player.pauseVideo();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        } else {
            player.playVideo();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        }
        isPlaying = !isPlaying;
    });
}

// Countdown Timer Logic
// Set the date we're counting down to
const countDownDate = new Date("Jun 06, 2026 19:00:00").getTime();

const countdownFunction = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the count down date
    const distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display the result in the corresponding elements
    if (document.getElementById("days")) {
        document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;
    }
    
    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("timer").innerHTML = "<div class='time-box'><span style='font-size: 1.5rem;'>¡Llegó el día!</span></div>";
    }
}, 1000);

// Modal Logic
const modalBtns = document.querySelectorAll('.modal-btn');
const closeBtns = document.querySelectorAll('.close-btn');
const modals = document.querySelectorAll('.modal');

// Open modal
modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close modal (X button)
closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore background scrolling
        }
    });
});

// Close modal (Clicking outside content)
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

// Carousel Logic
const track = document.getElementById('gallery-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (track && prevBtn && nextBtn) {
    let currentIndex = 0;

    function updateCarousel() {
        const isMobile = window.innerWidth <= 768;
        const itemsVisible = isMobile ? 1 : 3;
        const totalItems = track.children.length;
        const maxIndex = totalItems - itemsVisible;
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        
        const itemWidth = track.children[0].getBoundingClientRect().width;
        const gap = 20; // 20px gap
        
        const moveDistance = currentIndex * (itemWidth + gap);
        track.style.transform = `translateX(-${moveDistance}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const isMobile = window.innerWidth <= 768;
        const itemsVisible = isMobile ? 1 : 3;
        const totalItems = track.children.length;
        const maxIndex = totalItems - itemsVisible;
        
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);
    // Initialize
    setTimeout(updateCarousel, 100);
}
