import axios from 'axios';
import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_STATUS_UPDATE_REQUEST,
  CUSTOMER_STATUS_UPDATE_SUCCESS,
  CUSTOMER_STATUS_UPDATE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DELETE_FAIL
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

export const updateCustomerStatus = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOMER_STATUS_UPDATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${URL}/users/status/${id}`, {}, config);

    dispatch({
      type: CUSTOMER_STATUS_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_STATUS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const updateCustomer = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`${URL}/users/${user._id}`, user, config);

    dispatch({ type: CUSTOMER_UPDATE_SUCCESS });

    dispatch({ type: CUSTOMER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CUSTOMER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const deleteCustomer = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_DELETE_REQUEST });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`${URL}/users/${id}`, config);

    dispatch({ type: CUSTOMER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: CUSTOMER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
