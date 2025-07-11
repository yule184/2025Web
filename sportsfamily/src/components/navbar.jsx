import {Link,useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 h-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full bg-blue-500">



                {/* 桌面导航菜单 */}
                <nav className="hidden md:flex space-x-8 h-full items-center ">

                    <div className="text-2xl font-medium text-white dark:text-white">动友之家</div>
                    <Link
                        to="/activitylist"
                        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-300 hover:text-gray-200 hover:border-gray-300"
                    >
                        活动广场
                    </Link>

                    <Link
                        to="/stadiumlist"
                        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-300 hover:text-gray-200 hover:border-gray-300"
                    >
                        热门场馆
                    </Link>

                    <Link
                        to="/myactivity"
                        className="ml-auto inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-300 hover:text-gray-200 hover:border-gray-300"
                    >
                        我的活动
                    </Link>

                    <Link
                        to="/dashboard"
                        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-300 hover:text-gray-200 hover:border-gray-300"
                    >
                        个人中心
                    </Link>

                </nav>


            </div>
        </header>
    )
}

export default Navbar;
