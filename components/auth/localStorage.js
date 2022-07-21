export function setUserData(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

export function getUserToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
}
