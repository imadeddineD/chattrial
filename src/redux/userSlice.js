import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id : "",
  name : "",
  profilPic : "",
  token : "",
  onlineUser : [],
  socketConnection : null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser : (state,action)=>{
        state._id = action.payload._id
        state.name = action.payload.name 
        state.profilPic = action.payload.profilPic 
    },
    setToken : (state,action)=>{
        state.token = action.payload
    },
    logout : (state,action)=>{
        state._id = ""
        state.name = ""
        state.profilPic = ""
        state.token = ""
        state.socketConnection = null
    },
    setOnlineUser : (state,action)=>{
      state.onlineUser = action.payload
    },
    setSocketConnection : (state,action)=>{
      state.socketConnection = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken ,logout, setOnlineUser,setSocketConnection
 } = userSlice.actions

export default userSlice.reducer