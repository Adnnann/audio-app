import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const createUser = createAsyncThunk('meditation/userProfile', async(user)=>{
  return await axios.post('api/users/', user, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const loginUser = createAsyncThunk('meditation/userLoginData', async(user)=>{
  return await axios.post('/auth/signin', user, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const fetchUserProfile = createAsyncThunk('meditation/userProfile', async(param)=>{
    return await axios.get(`/api/users/${param}`, {
      header:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.data)
    .catch(error=>error)
  })

export const editUserData = createAsyncThunk('meditation/editedUserData', async(editedUser)=>{
  return await axios.put(`api/users/${editedUser.param}`, editedUser.data, {
    header:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
  .then(response=>response.data)
  .catch(error=>error)
})

export const updateFavoriteList = createAsyncThunk('meditation/editedUserData', async(editedUser)=>{
    return await axios.put(`/api/users/updateFavorite/${editedUser.param}`, editedUser.data, {
      header:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.data)
    .catch(error=>error)
  })
  export const updateSessions = createAsyncThunk('meditation/editedUserData', async(editedUser)=>{
    return await axios.put(`/api/users/updateSessions/${editedUser.param}`, editedUser.data, {
      header:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.data)
    .catch(error=>error)
  })
  export const userToken = createAsyncThunk('users/token', async()=>{
    return await axios.get('/protected', { 
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response=>response.data)
    .catch(error=>error.message)
  })
  
  export const signoutUser = createAsyncThunk('users/user', async()=>{
    const response = await axios.post('/auth/signout')
    return response.data
  })

  export const fetchFiles = createAsyncThunk('meditation/allFiles', async()=>{
    return axios.get('/api/files',{
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.data)
    .catch(error=>error)
  })

const initialState = {
 
    //user data
    createdUser:{},
    userSigninData:{},
    signedInUser: false,
    userData:{},
    token:{},
    signedOut:{},
    editedUserData:{},
    userProfile:{},
    //audio files
    file:'',
    allFiles:{},
    updatedFavorite:{},
    sessions:{}
    
}

export const meditationSlice = createSlice({
    name:'meditation',
    initialState,
    reducers:{
        setFile:(state, action) => {
            state.file = action.payload
        },   
        setUserSiginStatus: (state, action) => {
            state.signedInUser = action.payload
        },
        setRecipeToEdit:(state, action) => {
            state.recipeToEdit = action.payload
        },
        clearEditUserMessageStatus: (state, action) => {
            state.editedUserData = {}
        },
        clearUsingLoginStatus: (state, action) => {
            state.userSigninData = {}
        },
        clearUserFavoriteList: (state, action) => {
            state.updatedFavorite = {}
        },
        clearUserSessions: (state, action) => {
            state.sessions = {}
        },
        resetStore:()=> initialState
    },
    //fetching from server
    extraReducers: {
        [createUser.fulfilled]:(state, {payload})=>{
            return {...state, createdUser:payload}
        },
        [loginUser.fulfilled]:(state, {payload})=>{
            return {...state, userSigninData:payload}
        },
        [fetchFiles.fulfilled]:(state, {payload})=>{
            return {...state, allFiles:payload}
        },
        [userToken.fulfilled]:(state,{payload})=>{
            return {...state, token:payload}
        },
        [signoutUser.fulfilled]: (state, {payload}) => {
            return {...state, signedOut:payload}
        },
        [editUserData.fulfilled]: (state, {payload}) => {
            return {...state, editedUserData: payload}
        },
        [updateFavoriteList.fulfilled]: (state, {payload}) => {
            return {...state, updatedFavorite:payload}
        },
        [fetchUserProfile.fulfilled]: (state, {payload}) => {
            return {...state, userProfile:payload}
        },
        [updateSessions.fulfilled]: (state, {payload}) => {
            return {...state, sessions:payload}
        },
    }
})

export const {
    setFile,
    setUserSiginStatus, 
    resetStore,
    clearAddRecipeMessageStatus,
    clearEditRecipeMessageStatus,
    setUserProfileModalStatus,
    clearEditUserMessageStatus,
    clearUsingLoginStatus,
    setNewUserData,
    updateUserFavoriteList,
    clearUserFavoriteList,
    clearUserSessions
} = meditationSlice.actions

export const getSigninModal = (state) => state.meditation.signinModal
export const getSignupModal = (state) => state.meditation.signupModal
export const getCreatedUser = (state) => state.meditation.createdUser
export const getUserSigninData = (state) => state.meditation.userSigninData
export const getUserData = (state) => state.meditation.userData
export const getUserSigninStatus = (state) => state.meditation.signedInUser
export const getUserToken = (state) => state.meditation.token
export const getEditedUserStatus = (state) => state.meditation.editedUserData
export const getUserProfile = (state) => state.meditation.userProfile
//files
export const getFile = (state) => state.meditation.file
export const getUpdatedFavorite = (state) => state.meditation.updatedFavorite
export const getAllFiles = (state) => state.meditation.allFiles
export const getSessions = (state) => state.meditation.sessions

export default meditationSlice.reducer