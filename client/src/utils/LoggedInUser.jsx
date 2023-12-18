
export default function LoggedInUser() {
  const loadedToken = localStorage.getItem('token');
  if (loadedToken === null || loadedToken === '') {
    return null;
  }

  const decoded = (loadedToken);

  return decoded;
}
