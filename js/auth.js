function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // set waktu exp
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookieArray = document.cookie.split("; ");
  for (let cookie of cookieArray) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) return cookieValue;
  }
  return null;
}

function authenticateUser() {
  const username = $("#input-username").val();
  const password = $("#input-password").val();
  const loginMessage = $("#loginMessage");

  // jQuery AJAX request
  $.ajax({
    url: "js/user.json",
    method: "GET",
    contentType: "application/json",
    success: function (data) {
      // Verif user
      const user = data.users.find(user => user.username === username && user.password === password);

      if (user) {
        setCookie("username", username, 7); // Set exp cookie 7 haru
        window.location.href = "Table.html";
      } else {
        $("#loginForm").removeClass("mb-5").addClass("mb-2");
        loginMessage.html("<p class='text-danger'>Invalid username or password</p>");
      }
    },
    error: function () {
      loginMessage.html("<p class='text-danger'>Error loading user data</p>");
    }
  });
}

// Cek login dari cookie
function checkLogin() {
  const username = getCookie("username");
  if (username) {
    window.location.href = "Table.html";
  }
}

// Call checkLogin on page load
window.onload = checkLogin;