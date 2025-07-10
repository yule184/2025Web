import React from "react";
import {Link} from "react-router-dom";

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
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">体育场馆</h1>

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
            </div>
        </div>

    )
}

export default Stadiumlist;
