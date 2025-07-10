import Navbar from "../components/navbar.jsx";
import { Outlet } from "react-router-dom";

function MyNavbar() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 p-4">
                <Outlet />
            </main>
        </div>
    )
}

export default MyNavbar;