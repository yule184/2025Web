import {useState} from "react";
import {Link} from "react-router-dom";
import defaultAvatar from "../assets/image/default-avatar.png";


function Dashboard() {
    // 模拟用户数据（实际开发中可能来自API或状态管理）
    const [user, setUser] = useState({
        username: "john_doe",
        name: "John Doe",
        sex: "男",
        age: 28,
        tel: "13800138000",
        // avatar: "https://randomuser.me/api/portraits/men/1.jpg" // 头像占位图
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* 头部标题和操作区 */}
                <div className="flex justify-between items-center mb-8 ">
                    <h1 className="text-3xl font-bold text-gray-900">个人中心</h1>

                </div>

                {/* 用户信息卡片 */}
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-medium text-gray-900">基本信息</h2>
                    </div>

                    <div className="px-6 py-5">

                        {/* 修改后的头像区域 */}
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
