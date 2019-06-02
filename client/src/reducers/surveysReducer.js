import { FETCH_SURVEYS, FETCH_SURVEY } from '../actions/types';


export default function(state = [], action) {

  switch (action.type) {
      case FETCH_SURVEYS:
        return action.payload
      case FETCH_SURVEY:
        return action.payload
      default:
        return state;
    }
}


// const initialState = {
//   surveyList: [],
//   survey: {},
//   loading: false,
// }

// export default function(state = initialState, action) {

//   switch (action.type) {
//       case FETCH_SURVEYS:
//         return {
//           ...state,
//           surveyList: action.payload
//         }
//       case FETCH_SURVEY:
//         return {
//           ...state,
//           survey: action.payload
//         }
//       default:
//         return state;
//     }
// }

// const initialState = {
//   surveyList: {},
//   survey: {},
//   loading: false,
// }

// export default function(state = initialState, action) {

//   switch (action.type) {
//       case FETCH_SURVEYS:
//       return {
//         ...state,
//         surveyList: action.payload,
//         loading: false,
//       }
//       case FETCH_SURVEY:
//       return {
//         ...state,
//         survey: action.payload,
//         loading: false,
//       }
//       default:
//         return state;
//     }
// }
