function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
  //Slider 1

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    slideToNext = document.querySelector(nextArrow),
    slideToPrev = document.querySelector(prevArrow),
    slideCurrent = document.querySelector(currentCounter),
    slideTotal = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(field);

  let slideIndex = 1;
  let offset = 0;
  let dots = [];

  if (slides.length < 10) {
    slideTotal.textContent = `0${slides.length}`;
    slideCurrent.textContent = `0${slideIndex}`;
  } else {
    slideTotal.textContent = slides.length;
    slideCurrent.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i === 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  slideToNext.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translate(-${offset}px)`;
    slideIndex == slides.length ? (slideIndex = 1) : slideIndex++;
    addZero(slideCurrent);
    changeDots(dots, slideIndex);
  });

  slideToPrev.addEventListener('click', () => {
    console.log('PREV');
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translate(-${offset}px)`;

    slideIndex == 1 ? (slideIndex = slides.length) : slideIndex--;

    addZero(slideCurrent);
    changeDots(dots, slideIndex);
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translate(-${offset}px)`;

      addZero(slideCurrent);
      changeDots(dots, slideIndex);
    });
  });

  function changeDots(dots, index) {
    dots.forEach((dot) => (dot.style.opacity = 0.5));
    dots[index - 1].style.opacity = 1;
  }

  function addZero(slide) {
    if (slides.length < 10) slide.textContent = `0${slideIndex}`;
    else slide.textContent = slideIndex;
  }
}

export default slider;
