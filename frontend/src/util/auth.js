import { redirect } from 'react-router-dom';

export function getTokenDuration() {
  const sotredExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(sotredExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  const tokenDruation = getTokenDuration();
  if (tokenDruation < 0) {
    return 'EXPIRED';
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/auth');
  }
  return null;
}