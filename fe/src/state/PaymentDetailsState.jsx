import { atom } from 'recoil';

export const PaymentDetailsState = atom({
  key: 'PaymentDetailsState', // unique ID (with respect to other atoms/selectors)
  default: {}
});