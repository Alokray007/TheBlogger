import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {Header, Footer } from './components'
import {login, logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {console.error("An error occurred while fetching the current user:", error);})
    .finally(() => setLoading(false));
  }, [])

  return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400 text-bold text-6xl justify-center'>
    <div className='w-full block'>
      <Header />
      <main>
        TODO: <Outlet />
      </main>
      <Footer />
    </div>
  </div>) : (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400 text-bold text-6xl justify-center'>
      <div className='w-full block'>
        <div>Loading...</div> {/* Display a loading indicator */}
      </div>
    </div>
  )
}

export default App
