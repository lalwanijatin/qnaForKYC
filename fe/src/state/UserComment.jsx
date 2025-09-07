import { atom } from 'recoil';

export const UserCommentState = atom({
  key: 'UserCommentState', // unique ID (with respect to other atoms/selectors)
  default: ''
});