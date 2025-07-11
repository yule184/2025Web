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
    const handleSubmit = async (e) => {
        e.preventDefault();



        console.log('user information:',{username,password,sex,tel,age,identity});

        try{
            // 发起HTTP post请求
            const response = await fetch('http://127.0.0.1:7001/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    name: name,
                    age: age,
                    identity: identity,
                    sex:sex,
                    tel:tel,
                })
            });

            // 检查HTTP状态码
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态: ${response.status}`);
            }

            const result = await response.json();
            if(result.code===200){
                console.log('注册成功',result.data);
                toast.success('注册成功');
                navigate('/login');
            }else{
                console.log('注册失败',result.message);
                toast.error(result.message);
            }

        }catch(e){
            console.error('请求失败:', e);
            alert('网络错误，请稍后重试');
        }

    }

    return (
        <div className="min-h-screen flex">

            {/* 左侧品牌区 */}
            <div className="hidden md:flex flex-1 bg-blue-600 items-center justify-center">
                <div className="max-w-md p-8 text-white">
                    <h1 className="text-4xl font-bold mb-4">动友之家</h1>
                    <p className="text-xl">即刻启动你的运动之旅</p>
                    {/* 可添加Logo或插图 */}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center bg-gray-100">
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
        </div>

    )
}

export default Register;
