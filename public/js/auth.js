document.addEventListener("DOMContentLoaded", () => {
  const authFormsContainer = document.getElementById("auth-forms")

  const renderLoginForm = () => {
    authFormsContainer.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <div class="mx-auto mb-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                        <span class="text-white text-2xl">👨‍🍳</span>
                    </div>
                    <h2 class="card-title">Welcome Back</h2>
                    <p class="text-white/70">Sign in to your GlobalKitchen account</p>
                </div>
                <div class="card-content">
                    <form id="login-form" class="space-y-4">
                        <div>
                            <label for="username" class="label">Username or Email</label>
                            <input id="username" type="text" class="input" placeholder="Enter your username or email" required>
                        </div>
                        <div>
                            <label for="password" class="label">Password</label>
                            <div class="relative">
                                <input id="password" type="password" class="input pr-10" placeholder="Enter your password" required>
                                <button type="button" id="toggle-password-login" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white">
                                    👁️
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <label class="flex items-center space-x-2 text-white/80">
                                <input type="checkbox" class="rounded">
                                <span class="text-sm">Remember me</span>
                            </label>
                            <button type="button" class="text-orange-400 hover:text-orange-300 text-sm">
                                Forgot password?
                            </button>
                        </div>
                        <button type="submit" class="button w-full bg-orange-500 hover:bg-orange-600 text-white" id="login-button">
                            Sign In
                        </button>
                    </form>
                    <div class="mt-6 text-center">
                        <p class="text-white/80">
                            Don't have an account?
                            <button id="switch-to-signup" class="text-orange-400 hover:text-orange-300 underline">
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        `
    const loginForm = document.getElementById("login-form")
    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")
    const loginButton = document.getElementById("login-button")
    const togglePasswordButton = document.getElementById("toggle-password-login")
    const switchToSignupButton = document.getElementById("switch-to-signup")

    togglePasswordButton.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)
      togglePasswordButton.textContent = type === "password" ? "👁️" : "🙈"
    })

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      loginButton.disabled = true
      loginButton.textContent = "Signing in..."

      const username = usernameInput.value
      const password = passwordInput.value

      try {
        const response = await fetch("http://localhost:8000/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })
        const data = await response.json()

        if (response.ok) {
          localStorage.setItem("currentUser", JSON.stringify(data.user))
          window.location.href = "/main.html" // Redirect to main app
        } else {
          alert(data.message || "Login failed")
        }
      } catch (error) {
        console.error("Login error:", error)
        alert("Network error or server is down.")
      } finally {
        loginButton.disabled = false
        loginButton.textContent = "Sign In"
      }
    })

    switchToSignupButton.addEventListener("click", renderSignupForm)
  }

  const renderSignupForm = () => {
    authFormsContainer.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <div class="mx-auto mb-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                        <span class="text-white text-2xl">👨‍🍳</span>
                    </div>
                    <h2 class="card-title">Join GlobalKitchen</h2>
                    <p class="text-white/70">Create your culinary journey</p>
                </div>
                <div class="card-content">
                    <form id="signup-form" class="space-y-4">
                        <div>
                            <label for="displayName" class="label">Display Name</label>
                            <input id="displayName" type="text" class="input" placeholder="Your display name" required>
                        </div>
                        <div>
                            <label for="username" class="label">Username</label>
                            <input id="username" type="text" class="input" placeholder="@username" required>
                        </div>
                        <div>
                            <label for="email" class="label">Email</label>
                            <input id="email" type="email" class="input" placeholder="your@email.com" required>
                        </div>
                        <div>
                            <label for="password-signup" class="label">Password</label>
                            <div class="relative">
                                <input id="password-signup" type="password" class="input pr-10" placeholder="Create a password" required>
                                <button type="button" id="toggle-password-signup" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white">
                                    👁️
                                </button>
                            </div>
                            <div id="password-requirements" class="mt-2 space-y-1"></div>
                        </div>
                        <div>
                            <label for="confirmPassword" class="label">Confirm Password</label>
                            <div class="relative">
                                <input id="confirmPassword" type="password" class="input pr-10" placeholder="Confirm your password" required>
                                <button type="button" id="toggle-confirm-password" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white">
                                    👁️
                                </button>
                            </div>
                            <div id="password-match-status" class="mt-1 flex items-center space-x-2 text-xs"></div>
                        </div>
                        <div class="flex items-start space-x-2">
                            <input type="checkbox" id="terms-checkbox" required class="mt-1">
                            <span class="text-xs text-white/80">
                                I agree to the
                                <button type="button" class="text-orange-400 hover:text-orange-300 underline">Terms of Service</button>
                                and
                                <button type="button" class="text-orange-400 hover:text-orange-300 underline">Privacy Policy</button>
                            </span>
                        </div>
                        <button type="submit" class="button w-full bg-orange-500 hover:bg-orange-600 text-white" id="signup-button">
                            Create Account
                        </button>
                    </form>
                    <div class="mt-6 text-center">
                        <p class="text-white/80">
                            Already have an account?
                            <button id="switch-to-login" class="text-orange-400 hover:text-orange-300 underline">
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        `
    const signupForm = document.getElementById("signup-form")
    const displayNameInput = document.getElementById("displayName")
    const usernameInput = document.getElementById("username")
    const emailInput = document.getElementById("email")
    const passwordSignupInput = document.getElementById("password-signup")
    const confirmPasswordInput = document.getElementById("confirmPassword")
    const signupButton = document.getElementById("signup-button")
    const togglePasswordSignupButton = document.getElementById("toggle-password-signup")
    const toggleConfirmPasswordButton = document.getElementById("toggle-confirm-password")
    const passwordRequirementsDiv = document.getElementById("password-requirements")
    const passwordMatchStatusDiv = document.getElementById("password-match-status")
    const switchToLoginButton = document.getElementById("switch-to-login")

    const updatePasswordRequirements = () => {
      const password = passwordSignupInput.value
      const requirements = [
        { text: "At least 8 characters", met: password.length >= 8 },
        { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
        { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
        { text: "Contains number", met: /\d/.test(password) },
      ]
      passwordRequirementsDiv.innerHTML = requirements
        .map(
          (req) => `
                <div class="flex items-center space-x-2 text-xs">
                    <span class="${req.met ? "text-green-400" : "text-red-400"}">${req.met ? "✓" : "✗"}</span>
                    <span class="${req.met ? "text-green-400" : "text-red-400"}">${req.text}</span>
                </div>
            `,
        )
        .join("")
    }

    const updateConfirmPasswordStatus = () => {
      const password = passwordSignupInput.value
      const confirmPassword = confirmPasswordInput.value
      if (confirmPassword) {
        if (password === confirmPassword) {
          passwordMatchStatusDiv.innerHTML = `
                    <span class="text-green-400">✓</span>
                    <span class="text-green-400">Passwords match</span>
                `
        } else {
          passwordMatchStatusDiv.innerHTML = `
                    <span class="text-red-400">✗</span>
                    <span class="text-red-400">Passwords don't match</span>
                `
        }
      } else {
        passwordMatchStatusDiv.innerHTML = ""
      }
      signupButton.disabled = password !== confirmPassword || !passwordSignupInput.value || !confirmPasswordInput.value
    }

    passwordSignupInput.addEventListener("input", () => {
      updatePasswordRequirements()
      updateConfirmPasswordStatus()
    })
    confirmPasswordInput.addEventListener("input", updateConfirmPasswordStatus)

    togglePasswordSignupButton.addEventListener("click", () => {
      const type = passwordSignupInput.getAttribute("type") === "password" ? "text" : "password"
      passwordSignupInput.setAttribute("type", type)
      togglePasswordSignupButton.textContent = type === "password" ? "👁️" : "🙈"
    })

    toggleConfirmPasswordButton.addEventListener("click", () => {
      const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password"
      confirmPasswordInput.setAttribute("type", type)
      toggleConfirmPasswordButton.textContent = type === "password" ? "👁️" : "🙈"
    })

    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      signupButton.disabled = true
      signupButton.textContent = "Creating Account..."

      const displayName = displayNameInput.value
      const username = usernameInput.value
      const email = emailInput.value
      const password = passwordSignupInput.value

      try {
        const response = await fetch("http://localhost:8000/api/signup/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ displayName, username, email, password }),
        })
        const data = await response.json()

        if (response.ok) {
          localStorage.setItem("currentUser", JSON.stringify(data.user))
          window.location.href = "/main.html" // Redirect to main app
        } else {
          alert(data.message || "Signup failed")
        }
      } catch (error) {
        console.error("Signup error:", error)
        alert("Network error or server is down.")
      } finally {
        signupButton.disabled = false
        signupButton.textContent = "Create Account"
      }
    })

    switchToLoginButton.addEventListener("click", renderLoginForm)
  }

  // Initial render
  renderLoginForm()
})
