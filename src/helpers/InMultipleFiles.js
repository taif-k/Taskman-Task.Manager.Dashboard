import { setTasksForUser } from "../store/slices/tasksSlice";


// onChange
export const handleInputChange = (e, setState) => {
  const { name, value, type, checked } = e.target;

  setState(prev => ({
    ...prev, [name]: type === "checkbox" ? checked : value,
  }));
};

// SignIn - onSubmit
export const handleSignIn = (e, dispatch, navigate) => {
  e.preventDefault();

  const { email, password, remember } = e.target;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.email === email.value && u.password === password.value
  );

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  const key = user.email;
  const columns =
    JSON.parse(localStorage.getItem(`tasks_${key}`)) || {
      newTask: [],
      inProgress: [],
      doneTask: [],
    };

  remember.checked
    ? localStorage.setItem("currentUser", JSON.stringify(user))
    : sessionStorage.setItem("currentUser", JSON.stringify(user));

  const recentActivity =
    JSON.parse(localStorage.getItem(`recentActivity_${key}`)) || [];

  dispatch(setTasksForUser({ columns, recentActivity }));
  navigate("/");
};

// SignUp - onSubmit
export const handleSignUp = (e, signUpData,navigate) => {
    e.preventDefault();

    if (!signUpData.termsChecked) {
      alert("You must accept the terms!");
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === signUpData.email)) {
      alert("Email already registered!");
      return;
    }

    users.push({
      fullName: signUpData.fullName,
      email: signUpData.email,
      password: signUpData.password,
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign up successful!");
    navigate("/auth/sign-in");
  };

