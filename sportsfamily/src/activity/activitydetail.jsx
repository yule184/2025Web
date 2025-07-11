import React from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

// 假数据 - 应与activitylist.jsx中的数据一致
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

const ActivityDetail = () => {
    const { id } = useParams();
    const activity = activities.find(a => a.id === parseInt(id));

    if (!activity) {
        return <div className="text-center py-20">活动不存在</div>;
    }

    // 格式化日期和时间
    const formattedDate = dayjs(activity.startTime).format('YYYY年MM月DD日');
    const formattedTime = dayjs(activity.startTime).format('HH:mm');
    const endTime = dayjs(activity.startTime)
        .add(activity.durationHours, 'hour')
        .format('HH:mm');

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{activity.title}</h1>
                            <div className="mt-1 text-gray-600">{activity.stadium}</div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              招募中
            </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">活动日期</div>
                            <div className="mt-1 font-medium">{formattedDate}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">活动时间</div>
                            <div className="mt-1 font-medium">{formattedTime} - {endTime}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">当前人数</div>
                            <div className="mt-1 font-medium">
                                {activity.currentParticipants}/{activity.maxParticipants}人
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">活动时长</div>
                            <div className="mt-1 font-medium">{activity.durationHours}小时</div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">活动详情</h2>
                        <div className="prose prose-sm text-gray-600">
                            <p>这是一个{activity.stadium}的{activity.title}活动，欢迎各位爱好者参加！</p>
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
