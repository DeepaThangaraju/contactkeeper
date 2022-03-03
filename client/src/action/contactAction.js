import axios from 'axios';
export const contactList = (contact) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CONTACT_LIST_REQUEST" });
  
      const {
        userLoginReducer: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/contact`, config);
      dispatch({
        type: "CONTACT_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "CONTACT_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const createContact = (contact) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CONTACT_CREATE_REQUEST" });
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      const config = {
        headers: {
            'Context-Type':'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/contact`, contact, config);
  
      dispatch({ type: "CONTACT_CREATE_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "CONTACT_CREATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  


  export const deleteContact = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CONTACT_DELETE_REQUEST" });
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/contact/${id}`, config);
  
      dispatch({ type: "CONTACT_DELETE_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "CONTACT_DELETE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const updateContact = (contact) => async (dispatch,getState) => {
    try {
      dispatch({ type: "CONTACT_UPDATE_REQUEST" });
  
      const {userLoginReducer:{userInfo}}=getState()
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${userInfo.token}`
        },
      };
      const { data } = await axios.put(
        `/api/contact/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: "CONTACT_UPDATE_SUCCESS",
        payload: data,
      });
     
    } catch (error) {
      dispatch({
        type: "CONTACT_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getContactById = (id) => async (dispatch,getState) => {
    try {
      dispatch({ type: "CONTACT_DETAIL_REQUEST" });
      const { data } = await axios.get(
        `/api/contact/${id}`
      );
      dispatch({
        type: "CONTACT_DETAIL_SUCCESS",
        payload: data,
      });
     
    } catch (error) {
      dispatch({
        type: "CONTACT_DETAIL_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };