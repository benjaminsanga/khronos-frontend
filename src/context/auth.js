import React, { createContext, useReducer, useContext } from 'react'
import jwtDecode from 'jwt-decode'

const AuthStateContext = createContext(null)
const AuthDispatchContext = createContext(null)

let user = null
const token = localStorage.getItem('ajokudi:token')
if (token) {
  const decodedToken = jwtDecode(token)
  const expiresAt = new Date(decodedToken.exp * 1000)

  if (new Date() > expiresAt) {
    localStorage.removeItem('ajokudi:token')
  } else {
    user = decodedToken
  }
} else console.log('No token found')

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('ajokudi:token', action.payload.token)
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      localStorage.removeItem('ajokudi:token')
      return {
        ...state,
        user: null,
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user })

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)