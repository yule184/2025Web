import { useState } from 'react';
import {useNavigate,Link} from "react-router-dom";
import toast from 'react-hot-toast';


function Register() {
    const [username, setUsername] = useState("");
    const [name,setName] = useState("");
    const [password, setPassword] = useState("");
    const [sex,setSex] = useState('男');
    const [tel, setTel] = useState("");
    const [age, setAge] = useState(0);

    const [identity, setIdentity] = useState("CUSTOMER");

    const navigate = useNavigate();



    // 注册触发函数
    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO:完善后端注册逻辑

        console.log('user information:',{username,password,sex,tel,age,identity});
        toast.success('注册成功！');

        navigate('/login');
    }

    return (

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">注册</h1>

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

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                真实姓名
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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

                        {/*年龄*/}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                                年龄
                            </label>
                            <input
                                id="age"
                                type="number"
                                min="0"
                                max="120"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required/>
                        </div>

                        {/* 性别选择 */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                性别
                            </label>
                            <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="sex"
                                            value="男"
                                            checked={sex === '男'}
                                            onChange={() => setSex('男')}
                                            className="text-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="ml-2">男</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="sex"
                                            value="女"
                                            checked={sex === '女'}
                                            onChange={() => setSex('女')}
                                            className="text-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="ml-2">女</span>
                                    </label>
                            </div>
                        </div>

                        {/* 电话字段 */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">
                                电话
                            </label>
                            <input
                                id="tel"
                                type="tel"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                pattern="[0-9]{11}" // 简单验证11位数字
                                title="请输入11位手机号码"

                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            注册
                        </button>

                    </form>
                </div>
            </div>


    )
}

export default Register;
