import Navbar from "../../../layouts/navBar";
import { Search } from "../../../layouts/search";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { ButtonGradient } from "../../../layouts/button";

function History() {
    const [historys, setHistory] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialSearchTerm = searchParams.get("search") || "";
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [historyError, setHistoryError] = useState(null);
    const [regions, setRegions] = useState([]);
    const navigate = useNavigate();

    // Fetch dữ liệu từ API
    const fetchHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8800/v1/history');
            setHistory(response.data);
            setHistoryError(null);
        } catch (err) {
            setHistoryError(err.response?.data?.message || err.message);
        }
    };
    // Fetch region data
    const fetchRegions = async () => {
        try {
            const response = await axios.get('http://localhost:8800/v1/region');
            setRegions(response.data);
        } catch (error) {
            console.error("Error fetching regions:", error);
        }
    };

    useEffect(() => {
        fetchHistory();
        fetchRegions();
    }, []);

    // Tìm kiếm
    const filteredHistory = historys.filter((history) =>
        history.region.name && history.region.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <div className="flex flex-1 mt-16">
                <main className="flex-1 p-6">
                    <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredHistory.map((local) => (
                                <div key={local._id || local.title} className="border rounded-lg overflow-hidden shadow-lg bg-white">
                                    <img
                                        src={`http://localhost:8800/v1/img/${local.imgHistory}`}
                                        alt={local.region.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <div className="flex justify-between items-center">
                                            <h2 className="font-semibold text-lg">{local.region.name}</h2>
                                            <ButtonGradient
                                                title="Chi tiết"
                                                onClick={() => navigate(`/history/${local._id}`)}
                                            />
                                        </div>
                                        <p className="text-gray-600 text-lg">{local.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default History;
