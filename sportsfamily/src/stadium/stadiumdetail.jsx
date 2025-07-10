import React from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


// 假数据 - 场馆信息（去掉image字段）
const stadiums = [
    {
        id: 1,
        name: '篮球场',
        pricePerHour: 100,
        address: '体育馆A区',
        rating: 4.5
    },
    {
        id: 2,
        name: '足球场',
        pricePerHour: 150,
        address: '体育馆B区',
        rating: 4.2
    },
    {
        id: 3,
        name: '游泳馆',
        pricePerHour: 80,
        address: '体育馆C区',
        rating: 4.7
    },
    {
        id: 4,
        name: '羽毛球场',
        pricePerHour: 60,
        address: '体育馆D区',
        rating: 4.3
    },
];

// 背景色定义（与列表页一致）
const bgColors = [
    'bg-blue-100',
    'bg-green-100',
    'bg-amber-100',
    'bg-purple-100',
    'bg-cyan-100',
    'bg-rose-100'
];

function StadiumDetail() {
    const { id } = useParams();
    const stadium = stadiums.find((stadium) => stadium.id === parseInt(id));

    if(!stadium) {
        toast.error('场馆不存在')
        return <div className="text-center py-20">场馆不存在</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className={`${bgColors} md:w-1/3 flex items-center justify-center p-8`}>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-gray-700 mb-2">{stadium.name.charAt(0)}</div>
                            <div className="text-xl font-semibold text-gray-700">{stadium.name}</div>
                        </div>
                    </div>
                    <div className="p-8 md:w-2/3">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {stadium.address}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-6 h-6 ${i < Math.floor(stadium.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-2 text-gray-600">{stadium.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-xl font-bold text-indigo-600">
                ¥{stadium.pricePerHour}/小时
              </span>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">场馆介绍</h2>
                            <div className="space-y-4 text-gray-600">
                                <p>• 场地面积：标准{stadium.name.includes('篮球') ? '篮球' : stadium.name.includes('羽毛') ? '羽毛球' : stadium.name.includes('游泳') ? '游泳' : '足球'}场地</p>
                                <p>• 开放时间：每日8:00-22:00</p>
                                <p>• 配套设施：更衣室、淋浴间、休息区</p>
                                <p>• 预约要求：需提前24小时预约</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                预约场地
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default StadiumDetail;
