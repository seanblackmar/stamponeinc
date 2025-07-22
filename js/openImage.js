const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    lightbox.classList.add('show');
    lightboxImg.src = thumbnail.src;
    lightboxImg.alt = thumbnail.alt;
    resetZoom();
  });
});


lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === closeBtn) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.remove('show');

  // Delay resetZoom until after fade-out (300ms match your CSS transition)
  setTimeout(() => {
    resetZoom();
  }, 300);
}

// Escape key closes lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('show')) {
    closeLightbox();
  }
});

// --- Zoom functionality ---
let scale = 1;

function resetZoom() {
  scale = 1;
  lightboxImg.style.transform = 'scale(1)';
}

lightboxImg.addEventListener('wheel', (e) => {
  e.preventDefault();
  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(.5, scale), 3);
  lightboxImg.style.transform = `scale(${scale})`;
});

// --- Touch pinch-to-zoom ---
let startDist = 0;

lightboxImg.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    startDist = getDistance(e.touches[0], e.touches[1]);
  }
}, { passive: false });

lightboxImg.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const currentDist = getDistance(e.touches[0], e.touches[1]);
    const delta = currentDist - startDist;
    scale += delta * 0.005;
    scale = Math.min(Math.max(.5, scale), 3);
    lightboxImg.style.transform = `scale(${scale})`;
    startDist = currentDist;
  }
}, { passive: false });

function getDistance(touch1, touch2) {
  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
