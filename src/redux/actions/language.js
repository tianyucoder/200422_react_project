import { CHANGE_LANGUAGE } from "../constants/language";

export const changeLanguage = language => ({
  type: CHANGE_LANGUAGE,
  data: language
});
