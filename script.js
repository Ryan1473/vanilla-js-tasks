(function() {
  const addTaskButton = document.getElementById('add-task-button');
  const clearTasksButton = document.getElementById('clear-storage');
  let taskListWrapper = document.getElementsByClassName('task-list')[0];
  let origTasksFromStorage = tempTasksFromStorage = getTasksFromStorage();

  init();

  function init()
  {
    initCheckTasks();
    addButtonListener();    
    clearButtonListener();
  }

  function initCheckTasks()
  {
    if (!tempTasksFromStorage) {
      setTasksStorage([]);
      tempTasksFromStorage = getTasksFromStorage();
    } else {
      tempTasksFromStorage.forEach(task => {
        renderTask(task);
      });
    }
  }

  function addButtonListener()
  {
    addTaskButton.addEventListener('click', function() {
      let content =  {
        id: tempTasksFromStorage.length + 1,
        content: document.getElementById('add-task').value,
        completed: false
      }
      addNewTask(content);
      renderTask(content);
    });
  }

  function clearButtonListener()
  {
    clearTasksButton.addEventListener('click', function() {
      tempTasksFromStorage = [];
      clearStorage();
      deleteAllTasks();
    });
  }

  function attachEventListenersToTasks()
  {
    [].forEach.call(taskListWrapper.children, function(task) {
      completeTask(task);
      deleteTask(task);
      moveUp(task);
      moveDown(task);
    });
  }

  function addNewTask(task)
  {
    tempTasksFromStorage.push({
      id: task.id,
      content: task.content,
      completed: false
    });
    setTasksStorage(tempTasksFromStorage);
  }

  function renderTask(task)
  {
    let html = `
      <div data-id='${task.id}' class='row task content-control ${task.completed.toString()}'>
        <div class='container'>
          <div class='content-outer'>
            <p class='content-inner'>${task.content}</p>
          </div>
          <div class="control">
            <i class="fas fa-caret-up fa-2x move-up"></i>
            <button type='button' class='btn btn-primary btn-sm edit-task-button'>Edit</button>
            <button type='button' class='btn btn-primary btn-sm mt-2 delete-task-button'>Delete</button>
            <i class="fas fa-caret-down fa-2x move-down"></i>
          </div> 
        </div> 
      </div>
    `;

    taskListWrapper.innerHTML = taskListWrapper.innerHTML + html;
    document.getElementById('add-task').value = '';
    attachEventListenersToTasks();
  }

  function deleteAllTasks()
  {
    taskListWrapper.innerHTML = '';
  }

  function deleteTask(currentTask)
  {
    let deleteButton = currentTask.getElementsByClassName("delete-task-button")[0];
    deleteButton.addEventListener('click', deleteItemAction);

    function deleteItemAction() {
      let arrayIndex = currentTask.dataset.id - 1;
      tempTasksFromStorage.splice(arrayIndex, 1);
      deleteAllTasks();
      tempTasksFromStorage.forEach(function(task, index) {
        task.id = index + 1;
        renderTask(task);
      });
      setTasksStorage(tempTasksFromStorage);
      currentTask.remove();
    }
  }

  function completeTask(currentTask)
  {
    let contentOuter = currentTask.getElementsByClassName("content-outer")[0];
    contentOuter.addEventListener('click', completeTaskAction);
    
    function completeTaskAction() {
      currentTask.classList.contains("completed") 
        ? currentTask.classList.remove("completed")
        : currentTask.classList.add("completed");
    }
  }

  function moveUp(currentTask)
  {
    let moveUpButton = currentTask.getElementsByClassName("move-up")[0];
    moveUpButton.addEventListener('click', moveUpAction);

    function moveUpAction() {
      let previousElement = currentTask.previousElementSibling;
      if (previousElement === null) return;
      currentTask.appendBefore(previousElement);
    }
  }

  function moveDown(currentTask)
  {
    let moveDownButton = currentTask.getElementsByClassName("move-down")[0];
    moveDownButton.addEventListener('click', moveDownAction);

    function moveDownAction() {
      let nextElement = currentTask.nextElementSibling;
      if (nextElement === null) return;
      currentTask.appendAfter(nextElement);
    }
  }

  function getTasksFromStorage()
  {
    return JSON.parse(localStorage.getItem('tasks'));
  }

  function setTasksStorage(tasks)
  {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function clearStorage()
  {
    localStorage.clear();
  }
})();