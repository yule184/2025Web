import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'; // 用于日期格式化
import ActivityCard from '../components/ActivityCard.jsx'; // 导入组件
import {useState,useEffect} from "react";
import toast from "react-hot-toast";



function Activitylist(){

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:7001/api/activity/`);
                const result = await response.json();
                if(!response.ok||result.code !== 200){
                    throw new Error(result.message || '获取活动列表数据失败');
                }else if(result.code===200){
                    setActivities(result.data);
                }
            }catch(error){
                console.error('获取活动列表失败',error);
                toast.error('获取活动列表失败');
            }finally {
                setLoading(false);
            }
        };

        fetchActivities();
    },[])

    if(loading){
        return <div className="text-center py-20">加载中...</div>;
    }


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">活动广场</h1>
                    <Link

                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        发布活动
                    </Link>
                </div>

                {activities.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities.map(activity => (
                            <ActivityCard
                                key={activity.id}
                                activity={{
                                    id: activity.id,
                                    title: activity.name,
                                    currentParticipants: activity.currentParticipants,
                                    maxParticipants: activity.targetParticipants,
                                    status: activity.status
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500">暂无招募中的活动</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Activitylist;
