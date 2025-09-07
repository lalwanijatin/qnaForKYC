import { atom } from 'recoil';

export const LoginState = atom({
  key: 'LoginState', // unique ID (with respect to other atoms/selectors)
  default: localStorage.getItem('login') ? localStorage.getItem('login') : false
});