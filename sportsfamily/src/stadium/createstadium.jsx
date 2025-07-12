import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

function CreateStadium() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        pricePerHour: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if(errors[name]){
            setErrors({
                ...errors,
                [name]:"",
            });
        }
    };

    const validateForm = ()=>{
        const newErrors = {};
        if(!formData.name.trim()){
            newErrors.name = "场馆名称不能为空";
        }
        if(!formData.address.trim()){
            newErrors.address = "场馆地址不能为空";
        }
        if(!formData.pricePerHour || isNaN(formData.pricePerHour)||formData.pricePerHour < 1){
            newErrors.pricePerHour = "请输入有效的价格";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        if(!validateForm()){
            toast.error("表单数据不合法");
            return;
        }

        setIsSubmitting(true);

        try{
            const response = await fetch('http://127.0.0.1:7001/api/stadium/create',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    name: formData.name,
                    address: formData.address,
                    pricePerHour:parseFloat(formData.pricePerHour),
                }),
            });

            if(!response.ok){
                throw new Error(`HTTP error!status:${response.status}`);
            }

            const result = await response.json();
            if(result.code === 200){
                toast.success('场馆创建成功')
                navigate("/stadiumlist");
            }else{
                toast.error('场馆创建失败')
                console.log(result.message)
            }
        }catch(error){
            console.log(error);
            setSubmitError(error.message);
        }finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">创建新场馆</h1>
                    <p className="text-gray-600 mt-2">填写场馆基本信息</p>
                </div>

                {submitError && (
                    <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
                        {submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            场馆名称 *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                errors.name ? "border-red-500" : "border"
                            }`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            场馆地址 *
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                errors.address ? "border-red-500" : "border"
                            }`}
                        />
                        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>

                    <div>
                        <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700">
                            每小时价格 (元) *
                        </label>
                        <input
                            type="number"
                            id="pricePerHour"
                            name="pricePerHour"
                            min="0"
                            step="0.01"
                            value={formData.pricePerHour}
                            onChange={handleChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                errors.pricePerHour ? "border-red-500" : "border"
                            }`}
                        />
                        {errors.pricePerHour && (
                            <p className="mt-1 text-sm text-red-600">{errors.pricePerHour}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/stadiums")}
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    创建中...
                                </>
                            ) : (
                                "创建场馆"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateStadium ;
