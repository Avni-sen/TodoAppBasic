//UI vars

const form = document.querySelector("form");

const input = document.querySelector("#txtTaskName");

const btnDeleteAll = document.querySelector("#btnDeleteAll");

const taskList = document.querySelector("#task-list");

let items;

//load items
loadItems();

//call eventListener
eventListeners();

function eventListeners() {
  //submit event
  form.addEventListener("submit", addNewItem);

  //delete an item
  taskList.addEventListener("click", deleteItem);

  //deleteall ıtem
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}

function deleteAllItems(e) {
  if (confirm("are you sure ?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  e.preventDefault();
}

function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("silmek istediğinizden emin misiniz?")) {
      e.target.parentElement.parentElement.remove();

      //delete item from LS
      deleteItemsFormLS(e.target.parentElement.parentElement.textContent);
    }
  }
  e.preventDefault();
}

function createItem(text) {
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.className = "delete-item float-right";
  a.innerHTML = '<i class="fas fa-times"></i>';

  li.appendChild(a);
  taskList.appendChild(li);
}

function addNewItem(e) {
  if (input.value === "") {
    alert("Listeye Boş Veri Girmeyiniz!");
  } else {
    //createıtem
    createItem(input.value);

    //save to localestroge
    setItemsFromLC(input.value);
  }

  input.value = "";
  e.preventDefault();
}

//getItem from localestorage
function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

//set ıtem to localestorage
function setItemsFromLC(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}

function deleteItemsFormLS(text) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}
