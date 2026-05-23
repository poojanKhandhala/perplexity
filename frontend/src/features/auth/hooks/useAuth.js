import { useDispatch } from "react-redux";
import { register , login , getMe } from "../services/auth.api";
import {setUser , setLoading , setError} from '../state/auth.slice'


export function useAuth(){
    const dispatch = useDispatch();

    async function handleRegister({email,username,password}){
        try{
            dispatch(setLoading(true))
            const data = await register({email , password , username})
            dispatch(setUser(data.user));
            return data ; 
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Registration failed'))

            throw error
        }finally{
            dispatch(setLoading(false));
        }
    }

     async function handleLogin({email,password}){
        try{
            dispatch(setLoading(true))
            const data = await login({email , password})
            dispatch(setUser(data.user))
            return data
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Login failed'))

            throw error
        }finally{
            dispatch(setLoading(false));
        }
    }

     async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
            return data
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Failed to fetch user'))
            throw error
        }finally{
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister , 
        handleLogin , 
        handleGetMe
    }
}