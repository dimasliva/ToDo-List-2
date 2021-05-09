let inputBox = document.querySelector(".inputfield input");
let addBtn = document.querySelector(".inputfield button");
let toDoList = document.querySelector(".todoList");
let clearBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if(userData.trim() != 0) {
        addBtn.classList.add('active');
    } else {
        addBtn.classList.remove('active');
    }
};
showTasks();

addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New ToDo");

    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTasks();
    addBtn.classList.remove('active');
};

function showTasks() {
    let getLocalStorage = localStorage.getItem("New ToDo");
    let newList = "";
    const pendingNumb = document.querySelector(".pendingNumb");

    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    };

    listArr.forEach((element, index) => {
        newList += `<li>${element}<span onclick="deleteTasks(${index})"><i class="fas fa-trash"></i></span></li>`;
    });

    pendingNumb.textContent = listArr.length;

    if(listArr.length > 0) {
        clearBtn.classList.add("active");
    } else {
        clearBtn.classList.remove("active");
    }

    toDoList.innerHTML = newList;
    inputBox.value = "";
};

function deleteTasks(index) {
    let getLocalStorage = localStorage.getItem("New ToDo");
    listArr = JSON.parse(getLocalStorage);

    listArr.splice(index, 1);
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTasks();
}

clearBtn.onclick = () => {
    listArr = [];

    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTasks();
}
