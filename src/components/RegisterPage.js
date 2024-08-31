import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';


const RegisterPage = () => {
  const [data,setData] = useState({
    name : "",
    profilPic : ""
  })
  const [uploadPhoto,setUploadPhoto] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)

    setUploadPhoto(file)

    setData((preve)=>{
      return{
        ...preve,
        profilPic : uploadPhoto?.url
      }
    })
  }

  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()
 
    const URL = `https://chatapi-virid.vercel.app/api/register`

    try {
      const response = await axios({
        method :'post',
        url : URL,
        data ,
        withCredentials : true
      })

        // console.log("response",response)

        toast.success(response.data.message)

        if(response.data.success){
          dispatch(setToken(response?.data?.token))
          localStorage.setItem('token',response?.data?.token)

            setData({
              name : "",
              profilPic : ""
            })

            navigate('/home') 

        }


        console.log("this is response " , response)
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
    console.log('data',data)
  }


  return (
    <div className='mt-5'>
        <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
          <h3>Welcome to Chat app!</h3>

          <form className='grid gap-4 mt-5' 
          onSubmit={handleSubmit}
          >
              <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name :</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='enter your name' 
                  className='bg-slate-100 px-2 py-1 focus:outline-blue-bg-blue-400'
                  value={data.name} //  ensures that the input field always displays the current state value.
                  onChange={handleOnChange} // ensuring that the state reflects the current value of the input.
                  required
                />
              </div>


              <div className='flex flex-col gap-1'>
                <label htmlFor='profilPic'>Photo :

                  <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-blue-bg-blue-400 cursor-pointer'>
                      <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                        }
                      </p>
                      {
                        uploadPhoto?.name && (
                          <button className='text-lg ml-2 hover:text-red-600' 
                          onClick={handleClearUploadPhoto}
                          >
                            <IoClose/>
                          </button>
                        )
                      }
                      
                  </div>
                
                </label>
                
                <input
                  type='file'
                  id='profilPic'
                  name='profilPic'
                  className='bg-slate-100 px-2 py-1 focus:outline-blue-bg-blue-400 hidden'
                  onChange={handleUploadPhoto}
                />
              </div>


              <button
               className='bg-blue-400 text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
              >
                Register
              </button>

          </form>

          {/* <p className='my-3 text-center'>Already have account ? <Link to={"/email"} className='hover:text-blue-bg-blue-400 font-semibold'>Login</Link></p> */}
        </div>
    </div>
  )
}

export default RegisterPage