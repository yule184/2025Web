import { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom'
import toast from "react-hot-toast";

function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit =async (e) => {
        e.preventDefault()
        console.log('user information:',{username,password})

        // TODO:后端通信
        const response = await fetch('http://127.0.0.1:7001/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username:username,
                password:password
            })
        });
        const result = await response.json();
        console.log(result)
        if(result.code===200){
            toast.success('登陆成功')
            console.log(result.data.userInfo)
            sessionStorage.setItem('username',result.data.userInfo.username)
            sessionStorage.setItem('role',result.data.userInfo.identity)

            navigate('/dashboard')
        }else{
            toast.error(result.message)
        }


        //navigate('/dashboard')
    }

    return(
        <div className="min-h-screen flex">
            {/* 左侧品牌区 */}
            <div className="hidden md:flex flex-1 bg-blue-600 items-center justify-center">
                <div className="max-w-md p-8 text-white">
                    <h1 className="text-4xl font-bold mb-4">动友之家</h1>
                    <p className="text-xl">即刻启动你的运动之旅</p>
                    {/* 可添加Logo或插图 */}
                </div>
            </div>

            {/* 右侧登录区 */}
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">登录</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                用户名
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                密码
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
                        >
                            登录
                        </button>
                    </form>
                    <div className="text-center">
                        <Link to={'/register'} className="text-blue-500 hover:underline ">
                            还没有账号？去注册!
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
