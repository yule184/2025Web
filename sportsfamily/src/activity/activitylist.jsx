import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'; // 用于日期格式化
import ActivityCard from '../components/ActivityCard'; // 导入组件


// 假数据 - 活动信息
const activities = [
    {
        id: 1,
        title: '周末篮球赛',
        stadium: '篮球场',
        startTime: '2023-06-10T14:00:00',
        durationHours: 2,
        currentParticipants: 3,
        maxParticipants: 10,
        status: 'recruiting'
    },
    {
        id: 2,
        title: '羽毛球友谊赛',
        stadium: '羽毛球场',
        startTime: '2023-06-11T10:00:00',
        durationHours: 1.5,
        currentParticipants: 5,
        maxParticipants: 8,
        status: 'recruiting'
    },
    {
        id: 3,
        title: '游泳训练营',
        stadium: '游泳馆',
        startTime: '2023-06-12T18:00:00',
        durationHours: 1,
        currentParticipants: 2,
        maxParticipants: 6,
        status: 'recruiting'
    },
    {
        id: 4,
        title: '足球联赛',
        stadium: '足球场',
        startTime: '2023-06-15T19:00:00',
        durationHours: 2,
        currentParticipants: 9,
        maxParticipants: 14,
        status: 'recruiting'
    },
];

function Activitylist(){
    const recruitingActivities = activities.filter(
        activity => activity.status === 'recruiting'
    );
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">活动广场</h1>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        发布活动
                    </button>
                </div>

                {recruitingActivities.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recruitingActivities.map(activity => (
                            <ActivityCard
                                key={activity.id}
                                activity={activity}
                                // 可以覆盖默认props:
                                // showButton={false}
                                // cardStyle="featured"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        {/* 空状态保持不变 */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Activitylist;
