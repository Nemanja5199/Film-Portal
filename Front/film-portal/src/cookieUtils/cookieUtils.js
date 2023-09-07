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




  export function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }




// Function to get the value of a cookie by its name
export function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return '';
}

// Function to check the user's role based on the role cookie
export function checkRoleCookie() {
  const role = getCookie('role'); // Modify 'role' to match the name of your role cookie
  return role || 'UnregUser'; // Default to 'UnregUser' if the role cookie is not set
}





  



