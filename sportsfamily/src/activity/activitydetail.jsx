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

    // 修改评论相关状态
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(3);
    const [commentLoading, setCommentLoading] = useState(false);



    useEffect(() => {
        const fetchActivityData = async () => {
            try{
                const response = await fetch(`http://127.0.0.1:7001/api/activity/${id}`);
                const result = await response.json();
                if(!response.ok||result.code !== 200){
                    throw new Error(result.message || '获取活动数据失败')
                }
                setActivity(result.data);

                // 获取评论列表
                const commentsRes = await fetch(`http://127.0.0.1:7001/api/activitycomment/byid?activityId=${id}`);
                const commentsData = await commentsRes.json();
                if(!commentsRes.ok||commentsData.code !== 200){
                    throw new Error(commentsRes.message || '获取活动评论失败');
                }
                setComments(commentsData.data);

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

    // 新增：处理评论提交
    const handleSubmitComment =async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            toast.error('评论内容不能为空');
            return;
        }
        try{
            setCommentLoading(true);
            const userId = sessionStorage.getItem('userId');
            if(!userId){
                throw new Error('请先登录');
            }
            const response = await fetch('http://127.0.0.1:7001/api/activitycomment/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content:newComment,
                    rating:newRating,
                    activityId:parseInt(id),
                    userId:parseInt(userId),
                })
            });
            const result = await response.json();
            if(!response.ok||result.code !== 200){
                throw new Error(result.message||'评论提交失败');
            }

            setComments([...comments,result.data]);
            setNewComment('');
            setNewRating(3);
            toast.success('评论提交成功');
        }catch (e){
            toast.error(e.message);
        }finally {
            setCommentLoading(false);
        }

    };


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
                            {activity.description ? (
                                <p>{activity.description}</p>
                            ) : (
                                <>
                                    <p>这是一个{activity.stadium.name}的{activity.name}活动，欢迎各位爱好者参加！</p>
                                    <p>活动要求：</p>
                                    <ul>
                                        <li>请自备运动装备</li>
                                        <li>提前10分钟到场签到</li>
                                        <li>遵守场馆规定</li>
                                    </ul>
                                </>
                            )}
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


            {/* 更新后的评论区 */}
            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    用户评价 ({comments.length})
                </h2>

                {/* 评论列表部分 */}
                <div className="space-y-6 mb-8">
                    {comments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <span className="text-indigo-600 font-medium text-sm">
                            {comment.user?.username?.charAt(0) || 'U'}
                        </span>
                                    </div>
                                    <span className="font-medium text-gray-700">
                        {comment.user?.username || '匿名用户'}
                    </span>
                                </div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 pl-11">{comment.content}</p>

                        </div>
                    ))}
                </div>

                {/* 更新后的评论表单（增加评分选择） */}
                <form onSubmit={handleSubmitComment}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">您的评分</label>
                        <div className="flex items-center mb-4 space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewRating(star)}
                                    className="focus:outline-none"
                                >
                                    <svg
                                        className={`w-8 h-8 ${star <= newRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            ))}
                            <span className="ml-2 text-gray-600">{newRating}.0</span>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                                发表评论
                            </label>
                            <textarea
                                id="comment"
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="分享您的体验..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={commentLoading}
                            className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                                commentLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {commentLoading ? '提交中...' : '提交评论'}
                        </button>

                    </div>
                </form>
            </div>



        </div>
    );
};

export default ActivityDetail;
