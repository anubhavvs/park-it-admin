import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import {
  customerListReducer,
  customerDetailReducer,
  customerStatusUpdateReducer,
  customerUpdateReducer,
  customerDeleteReducer
} from './reducers/customerReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  customerList: customerListReducer,
  customerDetails: customerDetailReducer,
  customerStatusUpdate: customerStatusUpdateReducer,
  customerUpdate: customerUpdateReducer,
  customerDelete: customerDeleteReducer
});
const middleware = [thunk];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
