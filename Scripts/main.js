const localKey = '_todo';
let editItemNow = false;
let dataTODO = [{
    'id': 1,
    'status': true,
    'todo': 'First Task'
}];

//Primary load|reload page
function loadPage() {
    let dataStor = JSON.parse(getStorage());

    if(dataStor) {
        dataTODO = dataStor;
    }
    setStorage(dataTODO);
    createItems(dataTODO);
}


//Listeners
let ul = document.querySelector("#list");
ul.addEventListener('click', (event) => {
    let target = event.target;

    switch(target.className) {
        case 'remove':
            deleteItem (target);
            break;
        case 'progress':
            !editItemNow ? statusItem(target) : '';
            break;
        case 'check':
            !editItemNow ? statusItem(target) : '';
            break;
        case 'text':
            !editItemNow ? statusItemText(target) : '';
            break;
        case 'text completed':
            !editItemNow ? statusItemText(target) : '';
            break;
    }
});

// Delete item
function deleteItem(target) {
    let index = target.parentElement.getAttribute("id-todo");

    for (let data in dataTODO) {

        if (dataTODO[data].id == index) {
            dataTODO.splice(data, 1);
        }
    }
    target.parentElement.classList.remove('fadeIn');
    target.parentElement.classList.add('fadeOut');
    setTimeout(() => {target.parentElement.remove()}, 400);
    setStorage(dataTODO);
}

// Functions switch status
function statusItem(target) {
    let status;

    if (target.classList.contains('progress')) {
        target.classList.remove("progress");
        target.classList.add("check");
        target.nextSibling.classList.add("completed");
        status = false;
    }
    else {
        target.classList.remove("check");
        target.classList.add("progress");
        target.nextSibling.classList.remove("completed");
        status = true;
    }
    statusItemToStorage(target, status);
}

function statusItemText(target) {
    let status;

    if(target.previousSibling.classList.contains('progress')){
        target.previousSibling.classList.remove("progress");
        target.previousSibling.classList.add("check");
        target.classList.add("completed");
        status = false;
    }
    else if (target.previousSibling.classList.contains('check')){
        target.previousSibling.classList.remove("check");
        target.previousSibling.classList.add("progress");
        target.classList.remove("completed");
        status = true;
    }
    statusItemToStorage(target, status);
}
//
function statusItemToStorage(target, status) {
    let index = target.parentElement.getAttribute("id-todo");

    for (let data in dataTODO) {

        if (dataTODO[data].id == index) {
            dataTODO[data].status = status;
        }
    }

    setStorage(dataTODO);
}

// Listeners. Add new item
let btn = document.querySelector('.btn');
btn.addEventListener('click',  addItem);

// Add item
function addItem() {
    let input = document.querySelector('input');

    if (input.value) {
        let curTime = new Date().getTime();
        let data = {'id': curTime, 'status': true, 'todo': input.value};

        dataTODO.push(data);

        setStorage(dataTODO);
        createItems([data]);

        input.value = '';
    }
}

//Create item in to-do list
function createItems(data) {


    for (let item of data) {
        let ul = document.getElementById('list');
        let li = document.createElement("li");

        if (item.status) {
            li.innerHTML = '<span class="progress"></span>';
            li.innerHTML += `<span class="text">${item.todo}</span>`;
            li.innerHTML += '<span class="remove"></span>';
        } else {
            li.innerHTML = '<span class="check"></span>';
            li.innerHTML += `<span class="text completed">${item.todo}</span>`;
            li.innerHTML += '<span class="remove"></span>';
        }

        li.setAttribute("id-todo", item.id);
        ul.appendChild(li);
    }
}

// Add array in storage
function setStorage(data){
    let value = JSON.stringify(data);

    localStorage.removeItem(localKey);
    localStorage.setItem(localKey, value);
}

//Get array from storage
function getStorage() {
    return localStorage.getItem(localKey);
}

loadPage();


