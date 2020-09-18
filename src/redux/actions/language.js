import {CHANGE_LANGUAGE} from "../constants/language";

export const changeLanguage = lang => ({
  type: CHANGE_LANGUAGE,
  data: lang
});
