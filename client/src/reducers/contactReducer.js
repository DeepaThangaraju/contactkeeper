export const contactListReducer = (
    state = {contacts:[]},
    action
  ) => {
    switch (action.type) {
      case "CONTACT_LIST_REQUEST":
        return {
          loading: true,
        };
      case "CONTACT_LIST_SUCCESS":
        return {
          loading: false,
          success:true,
         contacts:action.payload
        };
      case "CONTACT_LIST_FAIL":
        return {
          loading: false,
          error: action.payload,
        };
      
      default:
        return state;
    }
  };

  export const contactCreateReducer=(state={},action)=>{
    switch(action.type)
    {
        case 'CONTACT_CREATE_REQUEST':
            return{
                loading:true,
            }
         case 'CONTACT_CREATE_SUCCESS':
             return{
                 loading:false,
                 success:true,
                 contact:action.payload
             }
         case 'CONTACT_CREATE_FAIL':
             return{
                loading:false,
                error:action.payload
             }
             default: return state
    }
 }

 export const contactDeleteReducer=(state={},action)=>{
  switch(action.type)
  {
      case 'CONTACT_DELETE_REQUEST':
          return{
              loading:true,
          }
       case 'CONTACT_DELETE_SUCCESS':
           return{
               loading:false,
               success:true
           }
       case 'CONTACT_DELETE_FAIL':
           return{
              loading:false,
              error:action.payload
           }
           default: return state
  }
}

export const contactUpdateReducer = (state = {contact:{}  }, action) => {
  switch (action.type) {
    case "CONTACT_UPDATE_REQUEST":
      return {
        loading: true,
      };
    case "CONTACT_UPDATE_SUCCESS":
      return {
        loading: false,
        success: true,
        contact:action.payload
      };
    case "CONTACT_UPDATE_FAIL":
      return {
        loading: false,
        error: action.payload,
        
      };
      case "CONTACT_UPDATE_RESET":
         return {
          contact:{}
        }
    default:
      return state;
  }
};


export const contactDetailReducers = (state = { contact: {} }, action) => {
  switch (action.type) {
    case "CONTACT_DETAIL_REQUEST":
      return {
        
        loading: true,
        ...state
      };
    case "CONTACT_DETAIL_SUCCESS":
      return {
        loading: false,
        contact: action.payload,
      };
    case "CONTACT_DETAIL_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};