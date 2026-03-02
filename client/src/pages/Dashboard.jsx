import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex h-[calc(100-64px)]">
      {" "}
      {/* Adjust height based on navbar */}
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-white border-r hidden md:block p-6">
        <nav className="space-y-4">
          <div className="text-blue-600 font-bold p-2 bg-blue-50 rounded-lg cursor-pointer">
            🏠 Dashboard
          </div>
          <div className="text-gray-600 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            👥 My Team
          </div>
          <div className="text-gray-600 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            📁 Projects
          </div>
        </nav>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-500">
            Here's what's happening with your projects today.
          </p>
        </header>

        {/* Stats Grid Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm font-medium uppercase">
              Total Tasks
            </p>
            <h3 className="text-3xl font-bold mt-1">12</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm font-medium uppercase">
              In Progress
            </p>
            <h3 className="text-3xl font-bold mt-1 text-yellow-600">5</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-sm font-medium uppercase">
              Completed
            </p>
            <h3 className="text-3xl font-bold mt-1 text-green-600">7</h3>
          </div>
        </div>

        {/* Project/Board Placeholder */}
        <div className="bg-white h-96 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center border-dashed border-2">
          <p className="text-gray-400">Kanban Board will be rendered here...</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
