import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

function MyActivity(){
    const [activities,setActivities] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserActivities = async () => {
            try{
                if(!userId) return;

                const response = await fetch(`http://127.0.0.1:7001/api/activity/user/${userId}`);
                const result = await response.json();
                if(!response.ok||result.code !== 200){
                    toast.error('获取用户参与活动失败');
                    setError(result.message||'获取用户参与活动失败');
                }else{
                    setActivities(result.data);
                }
            }catch(error){
                console.log(error);
                setError('网络请求失败，请稍后重试');

            }finally{
                setLoading(false);
            }
        };
        fetchUserActivities();
    },[userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }


    if (activities.length === 0) {
        return (
            <div className="text-center py-12">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">暂无参与的活动</h3>
                <p className="mt-1 text-sm text-gray-500">快去参加一些活动吧！</p>
                <div className="mt-6">
                    <Link
                        to="/activitylist"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        浏览活动
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">我参与的活动</h1>
                    <p className="mt-1 text-sm text-gray-500">共 {activities.length} 个活动</p>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {activities.map((activity) => (
                            <li key={activity.id}>
                                <Link
                                    to={`/activity/${activity.id}`}
                                    className="block hover:bg-gray-50"
                                >
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-blue-600 truncate">
                                                {activity.name}
                                            </p>
                                            <div className="ml-2 flex-shrink-0 flex">
                                                <p
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        activity.status === 'recruiting'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {activity.status === 'recruiting' ? '招募中' : '已结束'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:flex sm:justify-between">
                                            <div className="sm:flex">
                                                <p className="flex items-center text-sm text-gray-500">
                                                    <svg
                                                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    {dayjs(activity.startTime).format('YYYY-MM-DD HH:mm')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MyActivity;
