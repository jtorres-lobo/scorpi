console.log('color-gallery.js');

class ColorGallery extends HTMLElement {
  constructor() {
    super();
    this.toggleBtn = this.querySelectorAll('.toggle-color-gallery');
    this.colorBtns = this.querySelectorAll('.color-gallery-item');
    this.widget = this.querySelector('#color-gallery-widget');
    this.screen = this.querySelector('.color-gallery-backdrop');
  }
  connectedCallback() {
    this.toggleBtn.forEach((button) => {
      button.addEventListener('click', this.toggleColorGallery.bind(this));
    });
    this.colorBtns.forEach((button) => {
      const color = button.getAttribute('data-color');
      button.addEventListener('click', this.selectColor.bind(this, color, button));
    });
  }
  updateGalleryScroll() {
   const screenWidth = window.innerWidth;
   if(this.colorBtns.length <= 10 || screenWidth < 1280) return;
   const gallery = this.querySelector('.color-gallery-content');
   gallery.style.maxHeight = 'calc(100vh - 220px)';
   gallery.style.overflowY = 'scroll';
  }
  toggleColorGallery() {
    this.updateGalleryScroll();
    this.screen.style.top = `${window.scrollY}px`;
    this.widget.classList.toggle('hidden');
    let isHidden = this.widget.classList.contains('hidden');
    document.body.style.overflow = isHidden ? 'auto' : 'hidden';
  }
  selectColor(color, button) {
   document.querySelector(`input[type="radio"][value="${color}"]`).click();
   setTimeout(() => {
    this.toggleColorGallery();
    this.colorBtns.forEach((btn) => {
      btn.classList.remove('color-selected');
    });
    button.classList.add('color-selected');
   }, 250);
  }

}

customElements.define('color-gallery', ColorGallery);