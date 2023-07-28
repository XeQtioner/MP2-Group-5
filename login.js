			window.addEventListener("load", function () {
					const loginForm = document.getElementById("loginForm");
					const loginFormWrapper = document.getElementById("loginFormWrapper");
					const avatar = document.getElementById("avatar");
					const dashboard = document.getElementById("dashboard");
					const logoutBtn = document.getElementById("logoutBtn");
					const logoutModal = document.getElementById("logoutModal");
					const logoutYesBtn = document.getElementById("logoutYesBtn");
					const logoutNoBtn = document.getElementById("logoutNoBtn");
					const closeModalBtn = document.getElementById("closeModalBtn");
					const loginStatusModal = document.getElementById("loginStatusModal");
					const registerForm = document.getElementById("registerForm");
					const registerFormWrapper = document.getElementById("registerFormWrapper");
					const rememberMeCheckbox = document.getElementById("rememberMe");
	
					function getUsers() {
							return JSON.parse(localStorage.getItem("users")) || [];
					}
	
					function saveUsers(users) {
							localStorage.setItem("users", JSON.stringify(users));
					}
	
					function simulateLogin(username, password) {
							const users = getUsers();
							const user = users.find((user) => user.username === username && user.password === password);
							return !!user;
					}
	
					function registerUser(username, password) {
							const users = getUsers();
							const user = users.find((user) => user.username === username);
							if (!user) {
									users.push({ username, password });
									saveUsers(users);
									return true;
							}
							return false;
					}
	
					function hideModal(modalElement) {
							modalElement.style.display = "none";
					}
	
					function showModal(title, message, modalElement) {
							document.getElementById("loginStatusTitle").textContent = title;
							document.getElementById("loginStatusMessage").textContent = message;
							modalElement.style.display = "block";
					}
	
					function loginSuccess() {
							dashboard.style.display = "block";
							loginFormWrapper.style.display = "none";
							registerFormWrapper.style.display = "none";
							avatar.style.display = "block";
							showModal("Login Successful", "You are now logged in.", loginStatusModal);
					}
	
					function loginFail() {
							showModal("Login Failed", "Invalid credentials. Please try again.", loginStatusModal);
					}
	
					function registerSuccess() {
							showModal("Registration Successful", "You can now log in.", loginStatusModal);
					}
	
					function registerFail() {
							showModal("Registration Failed", "Username already taken. Please choose a different one.", loginStatusModal);
					}
	
					function logout() {
							dashboard.style.display = "none";
							avatar.style.display = "none";
							loginFormWrapper.style.display = "block";
							registerFormWrapper.style.display = "block";
							localStorage.removeItem("loggedIn");
							// localStorage.removeItem("rememberMe");
							// loginForm.elements["username"].value = "";
							// loginForm.elements["password"].value = "";

							const isRememberMeChecked = localStorage.getItem("rememberMe") === "true";
							const rememberedUsername = localStorage.getItem("username");
							const rememberedPassword = localStorage.getItem("password");
	
							if (isRememberMeChecked && rememberedUsername && rememberedPassword) {
									rememberMeCheckbox.checked = true;
									loginForm.elements["username"].value = rememberedUsername;
									loginForm.elements["password"].value = rememberedPassword;
							}
							
					}
	
					closeModalBtn.addEventListener("click", function () {
							hideModal(loginStatusModal);
					});
	
					logoutBtn.addEventListener("click", function () {
							showModal("Logout Confirmation", "Are you sure you want to log out?", logoutModal);
					});
	
					logoutYesBtn.addEventListener("click", function () {
							logout();
							hideModal(logoutModal);
					});
	
					logoutNoBtn.addEventListener("click", function () {
							hideModal(logoutModal);
					});
	
					loginForm.addEventListener("submit", function (event) {
							event.preventDefault();
							const username = document.getElementById("username").value;
							const password = document.getElementById("password").value;
							const isRememberMeChecked = rememberMeCheckbox.checked;
	
							if (simulateLogin(username, password)) {
									loginSuccess();
									localStorage.setItem("loggedIn", true);
									localStorage.setItem("rememberMe", isRememberMeChecked);
									if (isRememberMeChecked) {
											// Save login credentials in LocalStorage
											localStorage.setItem("username", username);
											localStorage.setItem("password", password);
									}
							} else {
									loginFail();
									if (!isRememberMeChecked) {
											// Clear login credentials from LocalStorage if "Remember Me" is unchecked
											localStorage.removeItem("username");
											localStorage.removeItem("password");
									}
							}
					});
	
					registerForm.addEventListener("submit", function (event) {
							event.preventDefault();
							const newUsername = document.getElementById("newUsername").value;
							const newPassword = document.getElementById("newPassword").value;
	
							if (registerUser(newUsername, newPassword)) {
									registerSuccess();
							} else {
									registerFail();
							}
					});
	
					// Check if the user was logged in before and restore the state
					const isLoggedIn = localStorage.getItem("loggedIn");
					if (isLoggedIn === "true") {
						loginSuccess();
						hideModal(loginStatusModal);
					} else	{
							const isRememberMeChecked = localStorage.getItem("rememberMe") === "true";
							const rememberedUsername = localStorage.getItem("username");
							const rememberedPassword = localStorage.getItem("password");
	
							if (isRememberMeChecked && rememberedUsername && rememberedPassword) {
									rememberMeCheckbox.checked = true;
									loginForm.elements["username"].value = rememberedUsername;
									loginForm.elements["password"].value = rememberedPassword;
							}
	
					}
					

					
			});

			// See Password Button for Login Form
			const seeLoginPasswordBtn = document.getElementById("seeLoginPasswordBtn");
        const loginPasswordInput = document.getElementById("password");

        seeLoginPasswordBtn.addEventListener("click", function () {
            if (loginPasswordInput.type === "password") {
                loginPasswordInput.type = "text";
                seeLoginPasswordBtn.textContent = "Hide Password";
            } else {
                loginPasswordInput.type = "password";
                seeLoginPasswordBtn.textContent = "See Password";
            }
        });

        // See Password Button for Register Form
        const seeRegisterPasswordBtn = document.getElementById("seeRegisterPasswordBtn");
        const registerPasswordInput = document.getElementById("newPassword");

        seeRegisterPasswordBtn.addEventListener("click", function () {
            if (registerPasswordInput.type === "password") {
                registerPasswordInput.type = "text";
                seeRegisterPasswordBtn.textContent = "Hide Password";
            } else {
                registerPasswordInput.type = "password";
                seeRegisterPasswordBtn.textContent = "See Password";
            }
        });
