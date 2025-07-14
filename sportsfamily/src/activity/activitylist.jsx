import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'; // 用于日期格式化
import ActivityCard from '../components/activitycard.jsx'
import {useState,useEffect} from "react";
import toast from "react-hot-toast";



function Activitylist(){

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // 获取活动列表（带搜索功能）
    const fetchActivities = async (keyword = '') => {
        try {
            setIsSearching(!!keyword);
            setLoading(true);

            const url = keyword
                ? `http://127.0.0.1:7001/api/activity/search/${encodeURIComponent(keyword)}`
                : 'http://127.0.0.1:7001/api/activity/';

            const response = await fetch(url);
            const result = await response.json();

            if (!response.ok || result.code !== 200) {
                throw new Error(result.message || '获取活动列表数据失败');
            }

            setActivities(result.data);
        } catch (error) {
            console.error('获取活动列表失败', error);
            toast.error(error.message);
            setActivities([]);
        } finally {
            setLoading(false);
            setIsSearching(false);
        }
    };

    // 初始加载
    useEffect(() => {
        fetchActivities();
    }, []);

    // 处理搜索
    const handleSearch=(e)=>{
        e.preventDefault();
        fetchActivities(searchKeyword.trim());
    };

    // 重置搜索
    const handleResetSearch=()=>{
        setSearchKeyword('');
        fetchActivities();
    };




    if(loading && !isSearching){
        return <div className="text-center py-20">加载中...</div>;
    }


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative"> {/* 需要相对定位容器 */}
                    {/* 左侧标题组 */}
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">活动广场</h1>
                        <button
                            onClick={() => { /* 预留点击逻辑 */ }}
                            className="text-sm text-gray-600 hover:text-blue-600 hover:underline mt-1"
                        >
                            发布活动
                        </button>
                    </div>

                    {/* 右侧搜索框（固定到右侧） */}
                    <div className="absolute top-0 right-0"> {/* 绝对定位到右上角 */}
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <input
                                type="text"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                placeholder="搜索活动..."
                                className="w-48 px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                            >
                                {isSearching ? '搜索中...' : '搜索'}
                            </button>
                        </form>
                    </div>
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
                ) :(
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500">
                            {searchKeyword
                                ? `没有找到包含"${searchKeyword}"的活动`
                                : '暂无活动'}
                        </p>
                        {searchKeyword && (
                            <button
                                onClick={handleResetSearch}
                                className="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                                显示全部活动
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Activitylist;
