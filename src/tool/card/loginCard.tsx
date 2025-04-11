import React, { useState } from 'react'
import { Input } from '../input/input';
import Link from 'next/link';
import { Button } from '..//button/button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ApiLogin } from '@/api/client';
import store from '@/redux/store';
import { setRefresh } from '@/redux/reducer/RefreshReduce';


const LoginCard = () => {

    const [_username, set_username] = useState<string>("")
    const [_password, set_password] = useState<string>("")

    const [showPassword, setShowPassword] = useState<boolean>(false)


    const login = async (data: { username: string, password: string }) => {
        const result = await ApiLogin(data)
        if (result.success) {
            // store.dispatch(setNotice({ success: result.success, msg: result.msg, open: true }))
            setTimeout(() => {
                // store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
                store.dispatch(setRefresh())
            }, 3000)
        } else {
            // store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            // setTimeout(() => {
            //     store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            // }, 3000)
        }
    }
    return (
        <div className='bg-white m-auto w-11/12 max-w-[440px] text-center p-10 shadow-md grid gap-1 rounded '>
            <div className="h-12 flex flex-col justify-center text-2xl font-bold">
                <h2>Login</h2>
            </div>
            <Input name="Username" onChange={(v) => set_username(v)} value={_username} />
            <Input name="Password" type={showPassword ? 'text' : 'password'} onChange={(v) => set_password(v)} value={_password}
                icon1={showPassword ?
                    <RemoveRedEyeIcon className='w-6 h-6 my-auto mx-1 cursor-pointer hover:text-colormain' onClick={() => setShowPassword(false)} /> :
                    <VisibilityOffIcon className='w-6 h-6 my-auto mx-1 cursor-pointer hover:text-colormain' onClick={() => setShowPassword(true)} />} />
            <div className="h-12">
            </div>
            <div className="h-12 flex flex-col justify-center">
                <p className='opacity-50 hover:opacity-100 cursor-pointer hover:text-colormain flex w-max m-auto'>Log in by google</p>
            </div>
            <div className="h-12 flex flex-col justify-center">
                <p>You do not have an account</p>
                <Link className='opacity-50 hover:opacity-100 hover:text-colormain' href={"signup"}>Sign Up!</Link>
            </div>
            <div className="h-12">
            </div>
            <Button name="Log In" onClick={() => login({ username: _username, password: _password })} sx='!w-2/3 m-auto bg-slate-500' />

        </div>
    )
}

export default LoginCard

