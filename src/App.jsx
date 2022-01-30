import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Main, News } from './pages'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './redux/actions/main'
import { fetchNews } from './redux/actions/news'
import Navbar from './components/Navbar'
import SignupPopup from './components/SignupPopup'
import Loading from './components/Loading'

function App() {
  const dispatch = useDispatch()
  const { users, isAuth, isAdmin, login, isOpenSignup } = useSelector(({ main }) => main)
  const { items, isLoaded } = useSelector(({ news }) => news)

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchNews())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      { !isLoaded && <Loading /> }
      { isLoaded &&
        <React.Fragment>
          <Navbar isAuth={ isAuth } isAdmin={ isAdmin } />
          <SignupPopup users={ users } isOpen={ isOpenSignup } />

          <Routes>
            <Route
              path='/'
              element={ <Main login={ login } exact /> }
            />
            <Route
              path='/news'
              element={ isLoaded && <News isAdmin={ isAdmin } isAuth={ isAuth } news={ items } exact /> } />
          </Routes>
        </React.Fragment>
      }
    </div>
  )
}

export default App
