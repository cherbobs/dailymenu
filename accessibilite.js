// ========== CONTRASTE ==========
const toggle1 = document.getElementById('toggleBtn1');
const status1 = document.getElementById('status1');

toggle1.addEventListener('click', () => {
  toggle1.classList.toggle('active');
  const isActive = toggle1.classList.contains('active');
  status1.textContent = isActive ? 'État : ON' : 'État : OFF';
  localStorage.setItem('modeContraste', isActive ? 'on' : 'off');
  document.body.classList.toggle('contraste', isActive);
});

// ========== DYSLEXIQUE ==========
const toggle2 = document.getElementById('toggleBtn2');
const status2 = document.getElementById('status2');

toggle2.addEventListener('click', () => {
  toggle2.classList.toggle('active');
  const isActive = toggle2.classList.contains('active');
  status2.textContent = isActive ? 'État : ON' : 'État : OFF';
  localStorage.setItem('modeDyslexique', isActive ? 'on' : 'off');
  document.body.classList.toggle('dyslexie', isActive);
});

// ========== SLIDER TAILLE DU TEXTE ==========
const slider = document.getElementById('slider');
const valueDisplay = document.getElementById('value');
const saveBtn = document.querySelector('.custom-button');

// Met à jour l’apparence du slider
function updateSliderBackground(value) {
  const min = slider.min;
  const max = slider.max;
  const percent = ((value - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(to right, orange ${percent}%, #ccc ${percent}%)`;
}

// Appliquer la taille à <html>
function applyGlobalFontSize(size) {
  document.documentElement.style.fontSize = `${size}px`;
}

// Charger les préférences existantes
document.addEventListener('DOMContentLoaded', () => {
  const savedSize = localStorage.getItem('fontSize');
  const sizeToApply = savedSize || 16;

  slider.value = sizeToApply;
  valueDisplay.textContent = `${sizeToApply} px`;
  applyGlobalFontSize(sizeToApply);
  updateSliderBackground(sizeToApply);

  if (localStorage.getItem('modeContraste') === 'on') {
    toggle1.classList.add('active');
    status1.textContent = 'État : ON';
    document.body.classList.add('contraste');
  }

  if (localStorage.getItem('modeDyslexique') === 'on') {
    toggle2.classList.add('active');
    status2.textContent = 'État : ON';
    document.body.classList.add('dyslexie');
  }
});

// Changement visuel en direct
slider.addEventListener('input', () => {
  const size = slider.value;
  valueDisplay.textContent = `${size} px`;
  applyGlobalFontSize(size);
  updateSliderBackground(size);
});

// Sauvegarde au clic
saveBtn.addEventListener('click', () => {
  localStorage.setItem('fontSize', slider.value);
  alert('Taille du texte enregistrée.');
});