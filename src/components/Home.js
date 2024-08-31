import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from './SideBar'
import logo from "../assets/logo.webp"
import io from "socket.io-client"

const Home = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log('redux user',user)

  const fetchUserDetails = async()=>{
    try {
      const URL = `https://chatapi-virid.vercel.app/api/userdetails`
        const response = await axios({
          url : URL,
          withCredentials : true
        })
        console.log("current user Details",response)

        dispatch(setUser(response.data.data))

        if(response.data.data.logout){
          dispatch(logout())
          navigate("/register")
      }
    } catch (error) {
      console.log("error",error)
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])

  useEffect(() => {
    const socketConnection = io("https://chatapi-virid.vercel.app",{
      auth : {
        token : localStorage.getItem('token')
      },
    })

    socketConnection.on('onlineUser',(data)=>{
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return ()=>{
      socketConnection.disconnect()
    }
  },[])

  const basePath = location.pathname === '/home'
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
    <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar/>
    </section>

        <section className={`${basePath && "hidden"}`} >
        <Outlet/>
        </section>

        <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
            <div>
              <img
                src={logo}
                width={250}
                alt='logo'
              />
            </div>
            <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
        </div>
    </div>
  )
}

export default Home