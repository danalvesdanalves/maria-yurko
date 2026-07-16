const form = document.getElementById('capture');
const input = document.getElementById('email');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setState(state) {
  form.setAttribute('data-state', state);
}

function updateReadiness() {
  const value = input.value.trim();
  if (form.dataset.state === 'submitted') return;
  if (emailRegex.test(value)) {
    setState('ready');
  } else if (document.activeElement === input || value.length > 0) {
    setState('editing');
  } else {
    setState('idle');
  }
}

// Clicking the container focuses the input
form.addEventListener('click', (e) => {
  if (form.dataset.state === 'submitted') return;
  if (e.target.closest('.submit-btn')) return;
  input.focus();
});

input.addEventListener('focus', () => {
  if (form.dataset.state === 'idle') setState('editing');
});

input.addEventListener('blur', updateReadiness);
input.addEventListener('input', updateReadiness);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (form.dataset.state !== 'ready') return;
  setState('submitted');
  input.blur();
});
