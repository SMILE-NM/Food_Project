function calc() {
  //Calculator

  const result = document.querySelector('.calculating__result span');

  let gender = localStorage.getItem('gender') || 'female',
    weight,
    height,
    age,
    ratio = localStorage.getItem('ratio') || 'ratio';

  function initLocalSettings(selector, activeClass) {
    // console.log(document.querySelector(selector));
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute('id') === localStorage.getItem('gender')) elem.classList.add(activeClass);

      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) elem.classList.add(activeClass);
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    // console.log('Gender:', gender, 'Weight:', weight, 'Height:', height, 'Age:', age, 'Ratio:', ratio);
    if (!gender || !weight || !height || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    if (gender === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  calcTotal();

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(`${selector}`);

    elements.forEach((elem) => {
      // console.log(gender, ratio);
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        } else {
          gender = e.target.getAttribute('id');
          localStorage.setItem('gender', gender);
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) input.style.border = '1.5px solid red';
      else input.style.border = 'none';

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
}

export default calc;
