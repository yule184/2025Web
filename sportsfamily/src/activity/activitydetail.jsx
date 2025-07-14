import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import toast from "react-hot-toast";


const ActivityDetail = () => {
    const { id } = useParams();
    // const activity = activities.find(a => a.id === parseInt(id));
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivityData = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:7001/api/activity/${id}`);
                const result = await response.json();
                if(!response.ok||result.code !== 200){
                    throw new Error(result.message || '获取活动数据失败')
                }else{
                    setActivity(result.data);
                }
            }catch(error){
                toast.error(error.message);
                console.error('获取活动详情失败',error)
            }finally {
                setLoading(false);
            }
        };

        fetchActivityData();
    },[id]);

    if(loading){
        return <div className="text-center py-20">加载中...</div>
    }

    if (!activity) {
        return <div className="text-center py-20">活动不存在</div>;
    }

    // 格式化日期和时间
    const formattedDate = dayjs(activity.startTime).format('YYYY年MM月DD日');
    const formattedTime = dayjs(activity.startTime).format('HH:mm');


    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{activity.name}</h1>
                            <div className="mt-1 text-gray-600">{activity.stadium.name}</div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {activity.status === 'recruiting' ? '招募中' : '已结束'}
            </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">活动日期</div>
                            <div className="mt-1 font-medium">{formattedDate}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">活动开始时间</div>
                            <div className="mt-1 font-medium">{formattedTime}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">当前人数</div>
                            <div className="mt-1 font-medium">
                                {activity.currentParticipants}/{activity.targetParticipants}人
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">活动时长</div>
                            <div className="mt-1 font-medium">{activity.duration}小时</div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">活动详情</h2>
                        <div className="prose prose-sm text-gray-600">
                            <p>这是一个{activity.stadium.name}的{activity.name}活动，欢迎各位爱好者参加！</p>
                            <p>活动要求：</p>
                            <ul>
                                <li>请自备运动装备</li>
                                <li>提前10分钟到场签到</li>
                                <li>遵守场馆规定</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 flex space-x-4">
                        <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            参加活动
                        </button>
                        <button className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            联系组织者
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityDetail;
