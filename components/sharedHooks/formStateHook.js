import { useReducer } from 'react';

const ACTIONS = {
  START_PROCESS: 'startProcess',
  START_DELETE_PROCESS: 'startDeleteProcess',
  SUCCESS: 'success',
  ERROR: 'error',
  CARD_WAITING_CLOSE: 'cardWaitingClose',
  CARD_QUESTION_CLOSE: 'cardQuestionClose',
  CARD_QUESTION_OPEN: 'cardQuestionOpen',
  CARD_ERROR_CLOSE: 'cardErrorClose',
  CARD_ERROR_OPEN: 'cardErrorOpen',
  BAR_SUCCESS_CLOSE: 'barSuccessClose',
  BAR_SUCCESS_OPEN: 'barSuccessOpen',
  BAR_ERROR_CLOSE: 'barErrorClose',
  BAR_ERROR_OPEN: 'barErrorOpen',
};

const reducerFn = (state, action) => {
  switch (action.type) {
    case ACTIONS.START_PROCESS:
      return { ...state, spinner: true, cardWaiting: true };
    case ACTIONS.START_DELETE_PROCESS:
      return { ...state, cardQuestion: false, cardWaiting: true };
    case ACTIONS.SUCCESS:
      return {
        ...state,
        spinner: false,
        cardWaiting: false,
        barSuccess: true,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        spinner: false,
        cardWaiting: false,
        cardErrorText: action.payload,
        cardError: true,
      };
    case ACTIONS.CARD_WAITING_CLOSE:
      return {
        ...state,
        cardWaiting: false,
      };
    case ACTIONS.CARD_QUESTION_OPEN:
      return {
        ...state,
        cardQuestion: true,
      };
    case ACTIONS.CARD_QUESTION_CLOSE:
      return {
        ...state,
        cardQuestion: false,
      };
    case ACTIONS.CARD_ERROR_CLOSE:
      return {
        ...state,
        cardError: false,
      };
    case ACTIONS.CARD_ERROR_OPEN:
      return {
        ...state,
        cardError: open,
      };
    case ACTIONS.BAR_SUCCESS_CLOSE:
      return {
        ...state,
        barSuccess: false,
      };
    case ACTIONS.BAR_SUCCESS_OPEN:
      return {
        ...state,
        barSuccess: true,
      };
    case ACTIONS.BAR_ERROR_CLOSE:
      return {
        ...state,
        barError: false,
      };
    case ACTIONS.BAR_ERROR_OPEN:
      return {
        ...state,
        barError: true,
      };
    default:
      throw new Error();
  }
};

const useFormState = () => {
  const initialFeedbackStates = {
    spinner: false,
    cardWaiting: false,
    cardError: false,
    cardErrorText: '',
    barSuccess: false,
    barError: false,
    cardQuestion: false,
  };
  const [feedbackState, dispatch] = useReducer(
    reducerFn,
    initialFeedbackStates
  );

  return [feedbackState, dispatch, ACTIONS];
};

export default useFormState;
