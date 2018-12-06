/* eslint-disable */
let table;
let categories;
let apparitions;
let createBtn;
let isCreating;

const setIsLoading = () => {
  document.querySelector('#spinner').style.display = 'flex';
};

const removeIsLoading = () => {
  document.querySelector('#spinner').style.display = 'none';
}

const getCategories = async () => await (await fetch('/api/category')).json();
const getApparitions = async () => await (await fetch('/api/apparition')).json();
const deleteApparition = async (id) => await (await fetch(`/api/apparition/${id}`, { method: 'DELETE'})).json();
const createApparition = async () => {
  setIsLoading();
  const title = document.querySelector('#title-create').value;
  const description = document.querySelector('#description-create').value;
  const date = document.querySelector('#data-create').value;
  const location = document.querySelector('#location-create').value;
  const category = document.querySelector('#category-create').value;
  const data = { title, description, date, location, category };
  const result = await fetch('/api/apparition', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const resultData = await result.json();
  cancelCreating();
  addRow({ ...data, id: resultData.id });
  removeIsLoading();
  return resultData;
};

const cancelCreating = () => {
  isCreating = false;
  console.log('oi');
  console.log(table.childNodes[table.childNodes.length - 1]);
  table.removeChild(table.childNodes[table.childNodes.length - 1]);
}

const deleteAp = async (id) => {
  setIsLoading();
  const result = await deleteApparition(id);
  if (result.ok) {
    const row = document.querySelector(`#row-${id}`);
    row.parentElement.removeChild(row);
  }
  removeIsLoading();
};

const create = () => {
  if (!isCreating) {
    isCreating = true;
    let categoryOptions = '';
    categories.forEach((e) => {
      categoryOptions += `<option value=${e.id}>${e.name}</option>`;
    })
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input id="title-create" class="input" type="text" placeholder="Título"></td>
      <td><input id="description-create" class="input" type="text" placeholder="Descrição"></td>
      <td><input id="data-create" class="input" type="text" placeholder="Data"></td>
      <td><input id="location-create" class="input" type="text" placeholder="Localização"></td>
      <td>
        <div class="select">
          <select id="category-create">
            ${categoryOptions}
          </select>
        </div>
      </td>
      <td onclick="createApparition()"><i class="fas fa-check"></i></td>
      <td onclick="cancelCreating()"><i class="fas fa-ban"></i></td>
    `;
    row.id = `row-create`;
    table.appendChild(row);
  }
}

const addRow = (apparition) => {
  const category = categories.find((e) => e.id == apparition.category);
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${apparition.title}</td>
    <td>${apparition.description}</td>
    <td>${apparition.date}</td>
    <td>${apparition.location}</td>
    <td>${category.name}</td>
    <td><i id="edit-${apparition.id}" class="far fa-edit"></i></td>
    <td onclick="deleteAp(${apparition.id})"><i id="delete-${apparition.id}" class="far fa-trash-alt"></i></td>
  `;
  row.id = `row-${apparition.id}`;
  table.appendChild(row);
};

window.onload = async () => {
  setIsLoading();
  table = document.querySelector('#main-table');
  createBtn = document.querySelector('#create-apparition');
  createBtn.onclick = create;
  const data = await Promise.all([getCategories(), getApparitions()]);
  categories = data[0].data;
  apparitions = data[1].data;
  apparitions.forEach((e) => {
    addRow(e);
  });
  removeIsLoading();
};
