// Ensure the DOM is fully loaded before running the script
window.onload = function() {
    // Get the main list container element
    const ftList = document.getElementById('ft_list');
    // Get the "New" button element
    const newTodoButton = document.getElementById('new-todo-button');

    // Function to set a cookie
    // name: name of the cookie
    // value: value to store in the cookie
    // days: number of days until the cookie expires
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Function to get a cookie by its name
    // name: name of the cookie to retrieve
    function getCookie(name) {
        const nameEQ = name + "=";
        // Split all cookies into an array
        const ca = document.cookie.split(';');
        // Loop through the array to find the desired cookie
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            // Remove leading spaces
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            // If the cookie name matches, return its value
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to save the current To-Do list to a cookie
    function saveTodos() {
        const todos = [];
        // Iterate through all child elements (To-Do items) in ftList
        ftList.querySelectorAll('.todo-item').forEach(item => {
            todos.push(item.textContent); // Add each item's text content to the array
        });
        // Convert the array of To-Do items to a JSON string and save it as a cookie
        setCookie("todoList", JSON.stringify(todos), 365); // Save for 365 days
    }

    // Function to add a new To-Do item to the list
    // text: the text content of the new To-Do item
    // save: boolean indicating whether to save to cookie after adding (default true)
    function addTodo(text, save = true) {
        if (!text) { // If text is empty, do not create an item
            return;
        }

        // Create a new div element for the To-Do item
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item'); // Add a class for styling
        todoItem.textContent = text; // Set the text content

        // Add a click event listener to the To-Do item for removal confirmation
        todoItem.addEventListener('click', function() {
            // Use window.confirm for removal confirmation as per requirements
            const confirmDelete = window.confirm(`Do you want to remove "${text}"?`);
            if (confirmDelete) {
                ftList.removeChild(todoItem); // Remove the item from the DOM
                saveTodos(); // Save the updated list to the cookie
            }
        });

        // Add the new To-Do item to the top of the list (prepend)
        if (ftList.firstChild) {
            ftList.prepend(todoItem);
        } else {
            ftList.appendChild(todoItem);
        }

        // If 'save' is true, save the updated list to the cookie
        if (save) {
            saveTodos();
        }
    }

    // Function to load To-Do items from the cookie when the page loads
    function loadTodos() {
        const todoCookie = getCookie("todoList"); // Get the To-Do list cookie
        if (todoCookie) {
            try {
                // Parse the JSON string from the cookie into an array
                const todos = JSON.parse(todoCookie);
                // Iterate through the loaded To-Do items and add them to the DOM
                // We add them in reverse order because addTodo prepends, ensuring original order is maintained
                for (let i = todos.length - 1; i >= 0; i--) {
                    addTodo(todos[i], false); // Don't save individually during initial load
                }
            } catch (e) {
                console.error("Error parsing To-Do list cookie:", e);
                // If parsing fails, clear the corrupted cookie
                setCookie("todoList", "", -1);
            }
        }
    }

    // Add event listener to the "New" button
    newTodoButton.addEventListener('click', function() {
        // Use window.prompt to get input from the user as per requirements
        const newTodoText = window.prompt("Enter a new TO DO:");
        // Check if the input is not null (user didn't click cancel) and not empty
        if (newTodoText !== null && newTodoText.trim() !== "") {
            addTodo(newTodoText.trim()); // Add the new To-Do item
        }
    });

    // Load existing To-Do items from the cookie when the script initializes
    loadTodos();
};
