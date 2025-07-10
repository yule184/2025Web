import {Link,useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 h-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full bg-gray-100">



                {/* 桌面导航菜单 */}
                <nav className="hidden md:flex space-x-8 h-full items-center ">

                    <div className="text-2xl font-medium text-black dark:text-white">动友之家</div>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    >
                        首页
                    </Link>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    >
                        关于我们
                    </Link>

                </nav>


            </div>
        </header>
    )
}

export default Navbar;