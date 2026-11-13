'use strict';
const houses = {
  ignaria: {name:'Ignaria', element:'IL FUOCO DI', alt:'Illustrazione della casata Ignaria: una fenice di fuoco'},
  idralis: {name:'Idralis', element:'L’ACQUA DI', alt:'Illustrazione della casata Idralis, associata all’acqua'},
  terralith: {name:'Terralith', element:'LA TERRA DI', alt:'Illustrazione della casata Terralith, associata alla terra'},
  fulgor: {name:'Fulgor', element:'L’ELETTRICITÀ DI', alt:'Illustrazione della casata Fulgor, associata all’elettricità'}
};
const tabs = [...document.querySelectorAll('[data-house]')];
function selectHouse(tab, moveFocus = false) {
  const key = tab.dataset.house;
  const house = houses[key];
  if (!house) return;
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  const panel = document.querySelector('#house-panel');
  panel.dataset.active = key;
  panel.setAttribute('aria-labelledby', tab.id);
  const image = document.querySelector('#house-image');
  image.src = `assets/${key}.webp`;
  image.alt = house.alt;
  document.querySelector('#house-name').textContent = house.name;
  document.querySelector('#house-element').textContent = house.element;
  if (moveFocus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectHouse(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectHouse(tabs[next], true); }
  });
});
