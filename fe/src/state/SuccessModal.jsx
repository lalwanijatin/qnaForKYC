import { atom } from 'recoil';

export const successModalOpen = atom({
  key: 'successModalOpen', // unique ID (with respect to other atoms/selectors)
  default: false
});

export const creatorInfoState = atom({
    key: 'creatorInfoState', // unique ID (with respect to other atoms/selectors)
    default: null
  });