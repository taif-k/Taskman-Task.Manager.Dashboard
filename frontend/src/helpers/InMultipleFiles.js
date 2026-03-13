import { setTasksForUser } from "../store/slices/tasksSlice";


// onChange
export const handleInputChange = (e, setState) => {
  const { name, value, type, checked } = e.target;

  setState(prev => ({
    ...prev, [name]: type === "checkbox" ? checked : value,
  }));
};

export const handleSignIn = async (e, dispatch, navigate) => {
  e.preventDefault();

  const { email, password, remember } = e.target;

  try {
    const response = await fetch("https://taskman-api-0nvd.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Invalid email or password");
      return;
    }

    const user = data.user;
    const key = user.email;

    const columns =
      JSON.parse(localStorage.getItem(`tasks_${key}`)) || {
        newTask: [],
        inProgress: [],
        doneTask: [],
      };

    const recentActivity =
      JSON.parse(localStorage.getItem(`recentActivity_${key}`)) || [];

    if (remember.checked) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    }

    dispatch(setTasksForUser({ columns, recentActivity }));

    navigate("/");
  } catch (error) {
    console.error("Login error:", error);
    alert("Server error");
  }
};

// SignUp - onSubmit
export const handleSignUp = async (e, signUpData, navigate) => {
  e.preventDefault();

  if (!signUpData.termsChecked) {
    alert("You must accept the terms!");
    return;
  }

  if (signUpData.password !== signUpData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("https://taskman-api-0nvd.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: signUpData.fullName,
        email: signUpData.email,
        password: signUpData.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    alert("Sign up successful!");
    navigate("/auth/sign-in");

  } catch (error) {
    console.error("Signup error:", error);
    alert("Server error. Please try again.");
  }
};

