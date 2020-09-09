import { CHANGE_LANGUAGE } from "../constants/language";

const initLanguage = 'zh_CN';

export default function changeLanguage(prevState = initLanguage, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.data;
    default:
      return prevState;
  }
}
