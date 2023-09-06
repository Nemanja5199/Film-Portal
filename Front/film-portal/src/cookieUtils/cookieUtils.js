export const checkUsernameCookie = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('username=')) {
        return true; // 'username' cookie exists
      }
    }
    return false; // 'username' cookie doesn't exist
  };