function authenticateUser() {
    // Get the values entered by the user
    const username = document.getElementById("input-username").value;
    const password = document.getElementById("input-password").value;
    const loginMessage = document.getElementById("loginMessage");

    // AJAX request to fetch the JSON data
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "js/login.json", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parse the JSON data
            const users = JSON.parse(xhr.responseText).users;

            // Check if user exists and if the password matches
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                window.location.href = 'Table.html';
            } else {
                document.getElementById('loginForm').classList.remove('mb-5');
                document.getElementById('loginForm').classList.add('mb-2');
                loginMessage.innerHTML = "<p class='text-danger'>Invalid username or password</p>";
            }
        }
    };
    
    xhr.send();
}
