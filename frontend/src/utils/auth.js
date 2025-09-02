export function login(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    localStorage.setItem("token", JSON.stringify({ email }));
    return true;
  }
  return false;
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}
