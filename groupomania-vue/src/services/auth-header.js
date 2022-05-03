export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
/*
  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
*/
  if (user && user.accessToken) {
    return 'Authorization ' + user.accessToken ;
  } else {
    return '';
  }
}
