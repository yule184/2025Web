import {Link,useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <header className="bg-white shadow-sm sticky top-0 x-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex justify-between h-16">
                    <div className="flelx items-center">
                        <Link to={'/dashboard'} >
                            dashboard
                        </Link>
                    </div>
                </div>

                {/* 右侧功能区 */}
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        登录
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar;