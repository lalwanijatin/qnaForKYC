import { atom } from 'recoil';

export const failModalOpen = atom({
  key: 'failModalOpen', // unique ID (with respect to other atoms/selectors)
  default: false
});

export const failMessageState = atom({
    key: 'failMessageState', // unique ID (with respect to other atoms/selectors)
    default: 'Something went wrong!'
  });