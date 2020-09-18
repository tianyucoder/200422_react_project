import {SAVE_SUBJECT_INFO} from './constants'

const initSubjectInfo = {total:0,items:[]}
export default function (preState=initSubjectInfo,action) {
	const {type,data} = action
	switch (type) {
		case SAVE_SUBJECT_INFO:
			const {total,items} = data
			return {total,items}
		default:
			return preState
	}
}