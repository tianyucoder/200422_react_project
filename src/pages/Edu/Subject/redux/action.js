import {SAVE_SUBJECT_INFO} from './constants'
export const saveSubject = (subjectInfo)=>{
	return {type:SAVE_SUBJECT_INFO,data:subjectInfo}
}