import React from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {useState} from "react";


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

// 假评论数据
const initialComments = [
    { id: 1, username: '运动达人', content: '场地很棒，设施齐全！', rating: 5 },
    { id: 2, username: '篮球爱好者', content: '地板弹性很好，推荐~', rating: 4 },
    { id: 3, username: '新手小白', content: '第一次来，工作人员很耐心指导', rating: 3 }
];

function StadiumDetail() {
    const { id } = useParams();
    const stadium = stadiums.find((stadium) => stadium.id === parseInt(id));

    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(3); // 默认3星

    if(!stadium) {
        toast.error('场馆不存在')
        return <div className="text-center py-20">场馆不存在</div>
    }

    // 新增：处理评论提交
    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            toast.error('评论内容不能为空');
            return;
        }

        const comment = {
            id: Date.now(),
            username: '当前用户', // 实际项目中替换为登录用户
            content: newComment,
            rating: newRating // 新增评分

        };

        setComments([...comments, comment]);
        setNewComment('');
        setNewRating(3); // 重置评分
        toast.success('评论发布成功');
    };

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


            {/* 更新后的评论区 */}
            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    用户评价 ({comments.length})
                    <span className="ml-2 text-sm font-normal text-gray-500">
            平均评分: {(comments.reduce((a, c) => a + c.rating, 0) / comments.length).toFixed(1)}/5
          </span>
                </h2>

                {/* 评论列表（新增评分显示） */}
                <div className="space-y-6 mb-8">
                    {comments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-medium text-sm">
                      {comment.username.charAt(0)}
                    </span>
                                    </div>
                                    <span className="font-medium text-gray-700">{comment.username}</span>
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
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            提交评论
                        </button>
                    </div>
                </form>
            </div>


        </div>
    );

}

export default StadiumDetail;
