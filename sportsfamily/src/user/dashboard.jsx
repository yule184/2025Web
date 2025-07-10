import {useState} from "react";
import {Link} from "react-router-dom";

function Dashboard() {
    return (
        <div className="flex-1 flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">仪表盘</h1>
                <Link to={'/register'} className="text-blue-500 hover:underline">
                    还没有账号？去注册!
                </Link>
            </div>
        </div>

    )
}

export default Dashboard;