import axios from 'axios';
import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_DETAILS_FAIL
} from '../constants/customerConstants';
import URL from '../config';

export const listCustomer = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOMER_LIST_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${URL}/users/all`, config);

    dispatch({
      type: CUSTOMER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const getCustomerDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOMER_DETAILS_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${URL}/users/${id}`, config);

    dispatch({
      type: CUSTOMER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
