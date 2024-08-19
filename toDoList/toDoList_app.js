function addTask() {
    var taskInput = document.getElementById("tasksubmit");
    var taskValue = taskInput.value;
    var tasksList = document.getElementById("list-tasks");
    
    // Create a new list item element
    var newTask = document.createElement('li');
    
    // Set the text content for the new task
    newTask.textContent = taskValue;
    
    // Append the new task to the list
    tasksList.appendChild(newTask);
    
    // Clear the input field
    taskInput.value = '';

    // Prevent duplicate submission
    return false;
}