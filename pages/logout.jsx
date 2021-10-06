import { useEffect } from 'react'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { UserLogoutAction } from '../reducers/user'

const logout = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
       
        dispatch(UserLogoutAction())
        setTimeout(()=>{
            Router.back()
        },1000) 
    },[])

    return (
        <>
            logout....
        </>
    )
}

export default logout