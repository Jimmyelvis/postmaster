import { FETCH_USER, FETCH_SURVEYS, FETCH_SURVEY, SORT_SURVEYS_TITLE_ASC, SORT_SURVEYS_TITLE_DESC, SORT_SURVEYS_DATE_ASC, SORT_SURVEYS_DATE_DESC } from '../actions/types';


const initialState = {
  surveyList: [],
  survey: {},
  loading: false,
}

export default function(state = initialState, action) {

  switch (action.type) {
      case FETCH_SURVEYS:
        return {
          ...state,
          surveyList: action.payload
        }
      case FETCH_SURVEY:
        return {
          ...state,
          survey: action.payload
        }
      case SORT_SURVEYS_TITLE_ASC:
        return {
          ...state,
          surveyList: state.surveyList.sort((a, b) => (a.title < b.title) ? 1 : -1)
        }
      case SORT_SURVEYS_TITLE_DESC:
        return {
          ...state,
          surveyList: state.surveyList.sort((a, b) => (a.title > b.title) ? 1 : -1)
        }
      case SORT_SURVEYS_DATE_ASC:
        return {
          ...state,
          surveyList: state.surveyList.sort((a, b) => (a.dateSent < b.dateSent) ? 1 : -1)
        }
      case SORT_SURVEYS_DATE_DESC:
        return {
          ...state,
          surveyList: state.surveyList.sort((a, b) => (a.dateSent > b.dateSent) ? 1 : -1)
        }
      default:
        return state;
    }
}

