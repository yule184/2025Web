import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

function CreateActivity(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:"",
        stadiumId:'',
        startTime:'',
        duration:2,
        targetParticipants:10,
        status:'recruiting',
    });
    const [stadiums,setStadiums] = useState([]);
    const [loading,setLoading] = useState(false);
    const [submitting,setSubmitting] = useState(false);
    const [errors,setErrors] = useState({});

    const userId = sessionStorage.getItem('userId');


    // 获取场馆列表
    useEffect(() => {
        const fetchStadiums = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://127.0.0.1:7001/api/stadium/simplelist');
                const data = await response.json();

                if (response.ok && data.code === 200) {
                    setStadiums(data.data);
                } else {
                    console.error('获取场馆列表失败:', data.message);
                    toast.error('获取场馆列表失败');
                }
            } catch (error) {
                console.error('请求出错:', error);
                toast.error('请求出错')
            } finally {
                setLoading(false);
            }
        };

        fetchStadiums();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'duration' || name === 'targetParticipants'
                ? Number(value)
                : value
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateTimeChange = (dateString) => {
        setFormData(prev => ({
            ...prev,
            startTime: dateString
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = '请输入活动名称';
        if (!formData.stadiumId) newErrors.stadiumId = '请选择场馆';
        if (!formData.startTime) newErrors.startTime = '请选择开始时间';
        if (formData.duration < 0.5 || formData.duration > 24) newErrors.duration = '持续时间应在0.5-24小时之间';
        if (formData.targetParticipants < 2 || formData.targetParticipants > 100) newErrors.targetParticipants = '人数应在2-100之间';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSubmitting(true);

        try {
            const payload = {
                ...formData,
                startTime: new Date(formData.startTime).toISOString(),
                creatorId: userId // 实际应从登录状态获取
            };

            const response = await fetch('http://127.0.0.1:7001/api/activity/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                toast.success('活动创建成功');
                navigate('/activitylist');
            } else {
                toast.error(`创建失败: ${data.message}`);
            }
        } catch (error) {
            console.error('创建活动出错:', error);
            toast.error('创建活动失败，请稍后重试');
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">创建新活动</h1>

            {loading ? (
                <div className="text-center py-8">加载中...</div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            活动名称 *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="例如：周末篮球友谊赛"
                            maxLength="50"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            活动场馆 *
                        </label>
                        <select
                            name="stadiumId"
                            value={formData.stadiumId}
                            onChange={(e) => handleSelectChange('stadiumId', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md ${errors.stadiumId ? 'border-red-500' : 'border-gray-300'}`}
                        >
                            <option value="">请选择场馆</option>
                            {stadiums.map(stadium => (
                                <option key={stadium.id} value={stadium.id}>
                                    {stadium.name} - {stadium.address} (¥{stadium.pricePerHour}/小时)
                                </option>
                            ))}
                        </select>
                        {errors.stadiumId && <p className="mt-1 text-sm text-red-600">{errors.stadiumId}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            开始时间 *
                        </label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={formData.startTime}
                            onChange={(e) => handleDateTimeChange(e.target.value)}
                            min={new Date().toISOString().slice(0, 16)}
                            className={`w-full px-3 py-2 border rounded-md ${errors.startTime ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            持续时间(小时) *
                        </label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            step="0.5"
                            min="0.5"
                            max="24"
                            className={`w-full px-3 py-2 border rounded-md ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            目标参与人数 *
                        </label>
                        <input
                            type="number"
                            name="targetParticipants"
                            value={formData.targetParticipants}
                            onChange={handleChange}
                            min="2"
                            max="100"
                            className={`w-full px-3 py-2 border rounded-md ${errors.targetParticipants ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.targetParticipants && <p className="mt-1 text-sm text-red-600">{errors.targetParticipants}</p>}
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {submitting ? '创建中...' : '创建活动'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        >
                            取消
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default CreateActivity;
