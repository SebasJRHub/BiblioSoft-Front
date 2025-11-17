export function saveAuthData(token, role) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserRole() {
  return localStorage.getItem("role");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}
