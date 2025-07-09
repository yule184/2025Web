import Navbar from "../components/navbar.jsx";

function MyNavbar({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    )
}

export default MyNavbar;