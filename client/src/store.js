import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducers } from "./reducers/userReducers";
import { userRegisterReducers } from "./reducers/userReducers";
import { contactDeleteReducer, contactDetailReducers, contactListReducer, contactUpdateReducer } from "./reducers/contactReducer";
import { contactCreateReducer } from "./reducers/contactReducer";

const reducer = combineReducers({
userLoginReducer:userLoginReducers,
userRegister:userRegisterReducers,
contactList:contactListReducer,
contactCreate:contactCreateReducer,
contactDelete:contactDeleteReducer,
contactUpdate:contactUpdateReducer,
contactDetail:contactDetailReducers
})
const userInfoInStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLoginReducer: { userInfo: userInfoInStorage },
};

const middleware = [thunk];
export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );