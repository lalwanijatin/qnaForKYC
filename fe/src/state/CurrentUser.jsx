import { atom } from 'recoil';

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const currentUserInfoState = atom({
  key: 'currentUserInfoState', // unique ID (with respect to other atoms/selectors)
  default: null,
  effects: [localStorageEffect('currentUserInfoState')]
});