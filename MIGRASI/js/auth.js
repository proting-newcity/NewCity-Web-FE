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

// listener buat trigger login
document.getElementById("input-username").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      authenticateUser();
    }
  });

document.getElementById("input-password").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      authenticateUser();
    }
  });

function authenticateUser() {
  const username = $("#input-username").val();
  const password = $("#input-password").val();
  const loginMessage = $("#loginMessage");
  const alwaysSignedIn = document.getElementById("alwaysSignedIn").checked;

  // jQuery AJAX request
  $.ajax({
    url: "../js/auth.json",
    method: "GET",
    contentType: "application/json",
    success: function (data) {
      // Verif user
      const user = data.users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        if (alwaysSignedIn) {
          setCookie("username", username, 7); // Set cookie exp 7 hari
        }
        checkLogin();
      } else {
        $("#loginForm").removeClass("mb-5").addClass("mb-2");
        loginMessage.html(
          "<p class='text-danger'>Invalid username or password</p>"
        );
      }
    },
    error: function () {
      loginMessage.html("<p class='text-danger'>Error loading user data</p>");
    },
  });
}

// Cek login 
function checkLogin() {
  const user = getCookie("username");
  const username = $("#input-username").val();
  const password = $("#input-password").val();

  // cek pake cookie
  if (user) window.location.href = "listBerita.html";

  // AJAX request cek dari json
  $.ajax({
    url: "../js/auth.json",
    method: "GET",
    contentType: "application/json",
    success: function (data) {
      const userExists = data.users.some((user) => user.username === username);

      if (userExists) {
        window.location.href = "listBerita.html";
      }
    },
    error: function () {
      console.error("Error loading user data");
    },
  });
}


// Call checkLogin on page load
window.onload = checkLogin;
