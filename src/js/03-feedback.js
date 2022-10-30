import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
}

populateFormData();

refs.form.addEventListener("submit", throttle(onInputSubmit, 500));

refs.form.addEventListener("input", event => {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  console.log(formData);
})

function onInputSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateFormData() {
  const savedFormData = localStorage.getItem(STORAGE_KEY);
  const parsedFormData = JSON.parse(savedFormData);
  if (parsedFormData) {
    refs.input.value = parsedFormData.email || '';
    refs.textarea.value = parsedFormData.message || '';
    console.log(parsedFormData);
  }
}
