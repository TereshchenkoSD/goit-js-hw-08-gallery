import images from '../gallery-items.js';

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  modalRef: document.querySelector('.js-lightbox'),
  modalImgRef: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('.lightbox__button'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
};

const imagesMarkup = createGalleryList(images);

refs.galleryContainer.insertAdjacentHTML('afterbegin', imagesMarkup);

refs.galleryContainer.addEventListener('click', onModalOpen);

refs.modalCloseBtn.addEventListener('click', onModalClose);

refs.modalOverlay.addEventListener('click', onModalClose);

window.addEventListener('keydown', onModalClose);

function createGalleryList(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`;
    })
    .join('');
}

function onModalOpen(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  refs.modalRef.classList.add('is-open');

  setModalImageAttributes(e);
}

function onModalClose(e) {
  if (
    e.target.dataset.action !== 'close-lightbox' &&
    !e.target.classList.contains('lightbox__overlay') &&
    e.code !== 'Escape'
  ) {
    return;
  }

  refs.modalRef.classList.remove('is-open');

  setModalImageAttributes(e);
}

function setModalImageAttributes(e) {
  if (refs.modalRef.classList.contains('is-open')) {
    refs.modalImgRef.src = e.target.dataset.source;
    refs.modalImgRef.alt = e.target.alt;
  } else {
    refs.modalImgRef.src = '';
    refs.modalImgRef.alt = '';
  }
}
