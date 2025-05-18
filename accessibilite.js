const toggle1 = document.getElementById('toggleBtn1');
const status1 = document.getElementById('status1');

toggle1.addEventListener('click', () => {
  toggle1.classList.toggle('active');

  if (toggle1.classList.contains('active')) {
    status1.textContent = 'État : ON';
  } else {
    status1.textContent = 'État : OFF';
  }
});


const toggle2 = document.getElementById('toggleBtn2');
const status2 = document.getElementById('status2');

toggle2.addEventListener('click', () => {
  toggle2.classList.toggle('active');

  if (toggle2.classList.contains('active')) {
    status2.textContent = 'État : ON';
  } else {
    status2.textContent = 'État : OFF';
  }
});





const slider = document.getElementById('slider');
const text = document.getElementById('text');
const valueDisplay = document.getElementById('value');

// Met à jour le fond du slider selon la valeur
function updateSliderBackground(value) {
  const min = slider.min;
  const max = slider.max;
  const percent = ((value - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(to right, orange ${percent}%, #ccc ${percent}%)`;
}

// Charger la valeur sauvegardée
const savedFontSize = localStorage.getItem('fontSize');
if (savedFontSize) {
  slider.value = savedFontSize;
  text.style.fontSize = savedFontSize + 'px';
  valueDisplay.textContent = savedFontSize + ' px';
  updateSliderBackground(savedFontSize);
} else {
  updateSliderBackground(slider.value);
}

// Écouteur
slider.addEventListener('input', () => {
  const fontSize = slider.value;
  text.style.fontSize = fontSize + 'px';
  valueDisplay.textContent = fontSize + ' px';
  localStorage.setItem('fontSize', fontSize);
  updateSliderBackground(fontSize);
});
