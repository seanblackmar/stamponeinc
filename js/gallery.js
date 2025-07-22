const thumbnails = document.querySelectorAll('.gallery-thumb');
const lightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('galleryLightboxImg');
const lightboxCaption = document.getElementById('galleryLightboxCaption');
const closeBtn = document.getElementById('galleryClose');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');

let currentIndex = 0;
const items = Array.from(thumbnails);

function openLightbox(index) {
  const img = items[index];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.dataset.caption;
  lightbox.classList.add('show');
  currentIndex = index;

  // Prevent accidental keyboard focus outline
  lightbox.focus();
}

function closeLightbox() {
  lightbox.classList.remove('show');
}

function showNext() {
  currentIndex = (currentIndex + 1) % items.length;
  openLightbox(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  openLightbox(currentIndex);
}

thumbnails.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

arrowRight.addEventListener('click', showNext);
arrowLeft.addEventListener('click', showPrev);

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('show')) return;

  // Prevent arrow keys from affecting text caret/focus
  e.preventDefault();

  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'Escape') closeLightbox();
});
