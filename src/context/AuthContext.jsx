import { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext()

// Demo user
const DEMO_USER = {
  id: 'demo-001',
  name: 'Alex Johnson',
  email: 'alex@mindguard.ai',
  avatar: null,
  joinedAt: '2024-01-15',
}

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

function authReducer(state, action) {
  switch (action.type) {
    case 'LOADING': return { ...state, isLoading: true, error: null }
    case 'LOGIN_SUCCESS': return { ...state, user: action.payload, isAuthenticated: true, isLoading: false, error: null }
    case 'LOGIN_ERROR': return { ...state, isLoading: false, error: action.payload }
    case 'LOGOUT': return { ...initialState }
    default: return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const stored = localStorage.getItem('mindguard-user')
    if (stored) {
      try {
        dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(stored) })
      } catch {
        localStorage.removeItem('mindguard-user')
      }
    }
  }, [])

  const login = async (email, password) => {
    dispatch({ type: 'LOADING' })
    await new Promise(r => setTimeout(r, 900))
    if (email && password.length >= 6) {
      const user = { ...DEMO_USER, email }
      localStorage.setItem('mindguard-user', JSON.stringify(user))
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      return { success: true }
    }
    dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid credentials. Try any email + 6+ char password.' })
    return { success: false }
  }

  const logout = () => {
    localStorage.removeItem('mindguard-user')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
