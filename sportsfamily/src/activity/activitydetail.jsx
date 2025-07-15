import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import toast from "react-hot-toast";


const ActivityDetail = () => {
    const { id } = useParams();
    // const activity = activities.find(a => a.id === parseInt(id));
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    // 用户id
    const userId = sessionStorage.getItem('userId'); // 获取当前用户ID
    const [isJoining, setIsJoining] = useState(false);



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

    // 检查当前用户是否已参加活动
    const isParticipant = activity.participants?.some(p => p.id === parseInt(userId));

    const handleJoinActivity = async () => {
        if(!userId){
            toast.error('获取用户失败');
            return;
        }
        if(activity.status !=='recruiting'){
            toast.error('该活动不在招募状态');
            return;
        }
        setIsJoining(true);
        try{
            const response = await fetch(`http://127.0.0.1:7001/api/activity/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activityId: activity.id,
                    userId:parseInt(userId),
                })
            });
            const result = await response.json();
            if(!response.ok||result.code !== 200){
                throw new Error(result.message||'参加活动失败');
            }
            toast.success(result.message);
            const refreshResponse = await fetch(`http://127.0.0.1:7001/api/activity/${id}`);
            const refreshResult = await refreshResponse.json();
            setActivity(refreshResult.data);
        }catch (e) {
            toast.error(e.message);
        }finally {
            setIsJoining(false);
        }
    }

    // 计算每人应支付金额
    const calculatePaymentPerPerson = () => {
        if (!activity || activity.status !== 'completed') return null;

        const stadium = activity.stadium;
        if (!stadium?.pricePerHour) return null;

        const totalCost = stadium.pricePerHour * activity.duration;
        const participantsCount = activity.currentParticipants || 1; // 避免除以0
        return (totalCost / participantsCount).toFixed(2);
    };

    const paymentPerPerson = calculatePaymentPerPerson();


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
                        {/* 如果是已完成活动，添加支付信息卡片 */}
                        {activity.status === 'completed' && paymentPerPerson && (
                            <div className="col-span-2 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <div className="text-sm text-yellow-800">每人应支付金额</div>
                                <div className="mt-1 font-medium text-yellow-900">
                                    ¥{paymentPerPerson}
                                    <span className="text-sm text-yellow-600 ml-2">
                                        (场馆费: ¥{activity.stadium.pricePerHour}/小时 × {activity.duration}小时 ÷ {activity.currentParticipants}人)
                                    </span>
                                </div>
                            </div>
                        )}
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
                        <button
                        onClick={handleJoinActivity}
                        disabled={isJoining || isParticipant || activity.status !== 'recruiting'}
                        className={`flex-1 py-3 rounded-lg transition-colors ${
                        isParticipant
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : activity.status !== 'recruiting'
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                        >
                        {isJoining ? '处理中...' :
                            isParticipant ? '已参加' :
                                activity.status === 'recruiting' ? '参加活动' : '活动已结束'}
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
