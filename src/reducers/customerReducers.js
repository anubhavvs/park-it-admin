import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_RESET,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DETAILS_RESET,
  CUSTOMER_STATUS_UPDATE_REQUEST,
  CUSTOMER_STATUS_UPDATE_SUCCESS,
  CUSTOMER_STATUS_UPDATE_FAIL,
  CUSTOMER_STATUS_UPDATE_RESET
} from '../constants/customerConstants';

export const customerListReducer = (state = { customers: [] }, action = {}) => {
  switch (action.type) {
    case CUSTOMER_LIST_REQUEST:
      return { loading: true };
    case CUSTOMER_LIST_SUCCESS:
      return { loading: false, customers: action.payload };
    case CUSTOMER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_LIST_RESET:
      return { customers: [] };
    default:
      return state;
  }
};

export const customerDetailReducer = (state = { customer: {} }, action = {}) => {
  switch (action.type) {
    case CUSTOMER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_DETAILS_SUCCESS:
      return { loading: false, customer: action.payload };
    case CUSTOMER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CUSTOMER_DETAILS_RESET:
      return { customer: {} };
    default:
      return state;
  }
};

export const customerStatusUpdateReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case CUSTOMER_STATUS_UPDATE_REQUEST:
      return {
        loading: true
      };
    case CUSTOMER_STATUS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        result: action.payload
      };
    case CUSTOMER_STATUS_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case CUSTOMER_STATUS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
