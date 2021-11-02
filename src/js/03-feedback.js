import { throttle } from 'lodash';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
console.log(form);
const formData = {};
initForm();
const throttledInput = throttle(onInput, 500);
function onInput(event) {
  //   console.log(event.target.name);
  //   console.log(event.target.value);
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}
form.addEventListener('input', throttledInput);
form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(formData);
  localStorage.removeItem(LOCALSTORAGE_KEY);
  form.reset();
});
function initForm() {
  let persistedValue = localStorage.getItem(LOCALSTORAGE_KEY);
  // console.log(persistedValue);
  if (persistedValue) {
    persistedValue = JSON.parse(persistedValue);
    // console.log(persistedValue);
    Object.entries(persistedValue).forEach(([name, value]) => {
      formData[name] = value;
      form.elements[name].value = value;
    });
  }
}
