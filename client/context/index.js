'use client';
import { useReducer, createContext, useEffect } from "react";
import axios from 'axios'
import { resolve } from "styled-jsx/css";
import { useRouter } from "next/navigation";
const initialState = {
  user: null
};

const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: user
      });
    }
  }, []);


  axios.interceptors.response.use(
      function(response){
            return response
      },
      function(error){
            let res = error.response;
            if(res.status === 401 && res.config && !res.config.__isRetryRequest){
                  return new Promise((resolve,reject)=>{
                        axios.get(`${process.env.NEXT_PUBLIC_API}/logout`).then((data)=>{
                              console.log('/401 error');
                              dispatch({type : 'LOGOUT'})
                              window.localStorage.removeItem('user')
                              router.push('/login')
                        }).catch((err)=>{
                              console.log("AXIOS INTERCEPTION ERROR",err);
                              reject(err)
                        })
                  });
                  return Promise.reject(error)
            }
      }
)
return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
