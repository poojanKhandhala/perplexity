import { useDispatch } from "react-redux";
import { register , login , getMe } from "../services/auth.api";
import {setUser , setLoading , setError} from '../state/auth.slice'


export function useAuth(){
    const dispatch = useDispatch();

    async function handleRegister(){
        try{
            dispatch(setLoading(true))
            const data = await register({email , passowrd , username})
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Registration failed'))
        }finally{
            dispatch(setLoading(false));
        }
    }

     async function handleLogin(){
        try{
            dispatch(setLoading(true))
            const data = await register({email , passowrd})
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Login failed'))
        }finally{
            dispatch(setLoading(false));
        }
    }

     async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
        }catch(error){
            dispatch(setError(error.response?.data?.message || 'Failed to fetch user'))
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