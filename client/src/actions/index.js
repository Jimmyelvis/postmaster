import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, FETCH_SURVEY, SORT_SURVEYS_TITLE_ASC, SORT_SURVEYS_TITLE_DESC, SORT_SURVEYS_DATE_ASC, SORT_SURVEYS_DATE_DESC } from './types';


// export const fetchUser = () => {

//     return function(dispatch) {
//       axios
//         .get('/api/current_user')
//         .then(res => dispatch({type: FETCH_USER, payload: res.data}))
//     };

// };


export const fetchUser = () => async dispatch => {
  
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {

  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {

  const res = await axios.post('/api/surveys', values);

  history.push('/surveylist');

  dispatch({ type: FETCH_USER, payload: res.data });


};

export const fetchSurveys = () => async dispatch => {

 

  const res = await axios.get('/api/surveys');

  console.log('======export const fetchSurveys===========');
  console.log('surveys fetched');
  console.log('====================================');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
}

export const fetchSurvey = (surveyId) => async dispatch => {

  const res = await axios.get(`/api/surveys/${surveyId}`)

  console.log('======export const fetchSurvey ===========');
  console.log('a survey is fetched');
  console.log('====================================');
  dispatch({
    type: FETCH_SURVEY,
    payload: res.data,
  })

}

export const sortSurveysTitleAsc = () => async dispatch => {

  const res = await axios.get('/api/surveys');
  dispatch({ type: SORT_SURVEYS_TITLE_ASC, payload: res.data });
}

export const sortSurveysTitleDesc = () => async dispatch => {

  const res = await axios.get('/api/surveys');
  dispatch({ type: SORT_SURVEYS_TITLE_DESC, payload: res.data });
}

export const sortSurveysDateAsc = () => async dispatch => {

  const res = await axios.get('/api/surveys');
  dispatch({ type: SORT_SURVEYS_DATE_ASC, payload: res.data });
}

export const sortSurveysDateDesc = () => async dispatch => {

  const res = await axios.get('/api/surveys');
  dispatch({ type: SORT_SURVEYS_DATE_DESC, payload: res.data });
}






export const deleteSurvey = (id) => async dispatch => {
  let { data } = await axios.delete(`/api/surveys/delete/${id}`);
  dispatch({ type: FETCH_SURVEYS, payload: data });
}

