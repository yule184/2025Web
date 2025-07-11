import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import defaultAvatar from "../assets/image/default-avatar.png";
import toast from "react-hot-toast";


function Dashboard() {
    // 模拟用户数据（实际开发中可能来自API或状态管理）
    const [user, setUser] = useState({
        id:0,
        username: "",
        name: "",
        sex: "",
        age: 0,
        tel: "",
        identity: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const username = sessionStorage.getItem('username');
    const role = sessionStorage.getItem('role');
    console.log(username)

    useEffect(() => {
        const fetchUserData = async ()=>{
            try{

                if(!username){
                    toast.error('未登录')
                    throw new Error('未登录！')
                }

                const response = await fetch(`http://127.0.0.1:7001/api/user/info?username=${username}` );
                if(!response.ok){
                    throw new Error(`HTTP error!status:${response.status}`);
                }

                const result = await response.json();
                if(result.code === 200){
                    setUser(result.data);
                }else{
                    toast.error('获取用户信息失败')
                    throw new Error(result.message||'获取用户信息失败');
                }
            }catch(error){
                console.log(error)
                setError(error.message);
            }finally {
                setLoading(false);
            }
        };

        fetchUserData();
    },[]);

    if(loading){
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">加载用户信息中...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">加载失败</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <Link
                        to="/login"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        返回登录
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* 头部标题和操作区 */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">个人中心</h1>
                </div>

                {/* 用户信息卡片 */}
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-medium text-gray-900">基本信息</h2>
                    </div>

                    <div className="px-6 py-5">
                        {/* 头像区域 */}
                        <div className="flex items-center mb-6 space-x-4">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                                    src={defaultAvatar}
                                    alt="用户头像"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                                <p className="text-gray-500">@{user.username}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">真实姓名</label>
                                    <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">性别</label>
                                    <p className="mt-1 text-sm text-gray-900">{user.sex}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">年龄</label>
                                    <p className="mt-1 text-sm text-gray-900">{user.age}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">联系电话</label>
                                    <p className="mt-1 text-sm text-gray-900">{user.tel}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



}

export default Dashboard;
