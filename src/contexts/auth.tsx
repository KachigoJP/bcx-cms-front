import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'

// app imports
import { COOKIES } from '../helpers/constants'
import { AuthUser } from '../helpers/types'
import { useApi } from '../helpers/api'
import { API } from '../helpers/constants'

type AuthProps = {
  isAuthenticated: boolean
  logged: Function
  logout: Function
  user: AuthUser
  fetchUser: Function
  setRole: Function
}

export const AuthContext = React.createContext<AuthProps>({
  isAuthenticated: false,
  logged: () => {},
  logout: () => {},
  user: null,
  fetchUser: () => {},
  setRole: (role: string) => {},
})

const checkAuthenticated = (cookies: any) => {
  return (
    cookies[COOKIES.AUTH_TOKEN] != null &&
    typeof cookies[COOKIES.AUTH_TOKEN] !== 'undefined'
  )
}

const AuthProvider = (props: any) => {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIES.AUTH_TOKEN])
  const [isAuthenticated, setAuthenticated] = React.useState(
    checkAuthenticated(cookies)
  )
  const [authUser, setAuthUser] = React.useState<AuthUser>(null)

  // APIs
  const { state, sendRequest } = useApi(API.USER_GET_INFORMATION)

  useEffect(() => {
    // Check Token
    if (cookies[COOKIES.AUTH_TOKEN]) {
      setAuthenticated(true)
      setAuthUser(cookies[COOKIES.AUTH_USER])
    }
    return () => {}
  }, [])

  React.useEffect(() => {
    const response = state.data
    if (response && response.status === 200) {
      const user = response.data.data
      setAuthUser(user)
      setCookie(COOKIES.AUTH_USER, user)
    }
    return () => {}
  }, [state])

  const logged = (data: any) => {
    // Call API login
    setCookie(COOKIES.AUTH_TOKEN, data.token)
    setCookie(COOKIES.AUTH_USER, data.user)
    setAuthenticated(true)

    setAuthUser(data.user)
  }

  const logout = () => {
    // Call API logout
    removeCookie(COOKIES.AUTH_TOKEN)
    removeCookie(COOKIES.AUTH_USER)
    setAuthUser(null)
    setAuthenticated(false)
  }

  const fetchUser = () => {
    // Call API get latest user info
    sendRequest({
      method: 'get',
    })
  }

  const setRole = (role: string) => {
    // Call API get latest user info
    const user = cookies[COOKIES.AUTH_USER]
    setAuthUser({ ...user, role })
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logged,
        logout,
        user: authUser,
        fetchUser,
        setRole,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  )
}

export default AuthProvider
