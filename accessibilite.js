// ========== CONTRASTE ==========
const toggle1 = document.getElementById('toggleBtn1');
const status1 = document.getElementById('status1');

toggle1.addEventListener('click', () => {
  toggle1.classList.toggle('active');
  const isActive = toggle1.classList.contains('active');
  status1.textContent = `État : ${isActive ? 'ON' : 'OFF'}`;
  document.body.classList.toggle('contraste', isActive);
  localStorage.setItem('modeContraste', isActive ? 'on' : 'off');
});

// ========== DYSLEXIQUE ==========
const toggle2 = document.getElementById('toggleBtn2');
const status2 = document.getElementById('status2');

toggle2.addEventListener('click', () => {
  toggle2.classList.toggle('active');
  const isActive = toggle2.classList.contains('active');
  status2.textContent = `État : ${isActive ? 'ON' : 'OFF'}`;
  document.body.classList.toggle('dyslexique', isActive);
  localStorage.setItem('modeDyslexique', isActive ? 'on' : 'off');
});

// ========== TAILLE DU TEXTE ==========
const slider = document.getElementById('slider');
const valueDisplay = document.getElementById('value');
const textDemo = document.getElementById('text');

function applyGlobalFontSize(size) {
  document.documentElement.style.fontSize = `${size}px`;
  localStorage.setItem('fontSize', size);
}

// Met à jour la couleur de fond du slider
function updateSliderBackground(value) {
  const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, orange ${percent}%, #ccc ${percent}%)`;
}

// Appliquer les préférences enregistrées au chargement
window.addEventListener('DOMContentLoaded', () => {
  const savedSize = localStorage.getItem('fontSize') || 16;
  const contraste = localStorage.getItem('modeContraste');
  const dyslexique = localStorage.getItem('modeDyslexique');

  slider.value = savedSize;
  valueDisplay.textContent = `${savedSize} px`;
  updateSliderBackground(savedSize);
  applyGlobalFontSize(savedSize);
  textDemo.style.fontSize = `${savedSize}px`;

  if (contraste === 'on') {
    toggle1.classList.add('active');
    status1.textContent = 'État : ON';
    document.body.classList.add('contraste');
  }

  if (dyslexique === 'on') {
    toggle2.classList.add('active');
    status2.textContent = 'État : ON';
    document.body.classList.add('dyslexique');
  }
});

// Debounce pour éviter les ralentissements
let debounceTimer;

slider.addEventListener('input', () => {
  const size = slider.value;
  valueDisplay.textContent = `${size} px`;
  updateSliderBackground(size);
  textDemo.style.fontSize = `${size}px`;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    applyGlobalFontSize(size);
  }, 300);
});

// ========== RÉINITIALISATION ==========
document.querySelector('.clear-container')?.addEventListener('click', () => {
  localStorage.removeItem('fontSize');
  localStorage.removeItem('modeContraste');
  localStorage.removeItem('modeDyslexique');
  location.reload();
});