import React from "react";
import {Link} from "react-router-dom";
import {useState,useEffect} from "react";
import toast from "react-hot-toast";

// 定义一组漂亮的纯色背景
const bgColors = [
    'bg-blue-100',
    'bg-green-100',
    'bg-amber-100',
    'bg-purple-100',
    'bg-cyan-100',
    'bg-rose-100'
];

// 评分星星组件
const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-5 h-5 ${i < fullStars ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="ml-1 text-gray-600">{rating.toFixed(1)}</span>
        </div>
    );
};




function Stadiumlist(){

    const [stadiums, setStadiums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {

        // 检查用户角色
        const role = sessionStorage.getItem("role");
        //console.log(role)
        setIsAdmin(role === "ADMIN");

        const fetchStadiums = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:7001/api/stadium/`);
                if(!response.ok){
                    throw new Error(`HTTP error!status:${response.status}`);
                }
                const result = await response.json();

                if(result.code === 200){
                    setStadiums(result.data);
                }else{
                    toast.error('获取场馆信息失败')
                    throw new Error(result.message||'获取场馆数据失败');
                }
            }catch (e){
                console.log(e);
                setError(e.message);
            }finally {
                setLoading(false);
            }
        };

        fetchStadiums();

    },[])

    if(loading){
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">加载场馆数据中...</p>
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
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        重新加载
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">热门场馆</h1>
                    {isAdmin && (
                        <Link
                            to="/stadium/create"
                            className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                            增加新的场馆
                        </Link>
                    )}
                </div>


                {stadiums.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">暂无场馆数据</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {stadiums.map((stadium, index) => {
                            // 循环使用背景色
                            const bgColor = bgColors[index % bgColors.length];
                            return (
                                <Link
                                    to={`/stadium/${stadium.id}`}
                                    key={stadium.id}
                                    className="group"
                                >
                                    <div className={`${bgColor} rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col`}>
                                        <div className="p-6 flex-grow">
                                            <div className="flex justify-between items-start">
                                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{stadium.name}</h2>
                                                <span className="font-medium text-indigo-600">¥{stadium.pricePerHour}/小时</span>
                                            </div>
                                            <RatingStars rating={stadium.rating} />
                                        </div>
                                        <div className="px-6 pb-4">
                                            <div className="text-gray-600 text-sm">{stadium.address}</div>
                                            <div className="mt-3 text-right">
                                                <span className="inline-block px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
                                                    查看详情 →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Stadiumlist;
