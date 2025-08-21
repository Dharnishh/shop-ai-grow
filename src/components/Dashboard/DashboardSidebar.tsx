
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  Image,
  Video,
  MessageCircle,
  Home,
  Facebook,
  Instagram,
  Twitter,
  User,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: <Home size={20} />,
    path: "/dashboard",
  },
  {
    title: "Auto Schedule",
    icon: <CalendarDays size={20} />,
    path: "/dashboard/schedule",
  },
  {
    title: "AI Tools",
    icon: <MessageCircle size={20} />,
    path: "/dashboard/ai-tools",
  },
  {
    title: "Photo Editing",
    icon: <Image size={20} />,
    path: "/dashboard/photo-editing",
  },
  {
    title: "Video Editing",
    icon: <Video size={20} />,
    path: "/dashboard/video-editing",
  },
];

const connectedAccounts = [
  {
    name: "Facebook",
    icon: <Facebook size={18} />,
    color: "text-blue-600",
  },
  {
    name: "Instagram",
    icon: <Instagram size={18} />,
    color: "text-pink-600",
  },
  {
    name: "Twitter",
    icon: <Twitter size={18} />,
    color: "text-blue-400",
  },
];

const DashboardSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="text-xl font-bold text-accent-purple flex items-center">
          <img src="/logo.svg" alt="ShopBoost AI" className="h-8 w-8 mr-2" />
          ShopBoost AI
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-accent-purple bg-opacity-10 text-accent-purple"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8">
          <h3 className="text-xs uppercase font-semibold text-gray-500 mb-3 px-3">
            Connected Accounts
          </h3>
          <div className="space-y-1">
            {connectedAccounts.map((account) => (
              <div
                key={account.name}
                className="flex items-center gap-3 px-3 py-2 text-gray-600"
              >
                <div className={account.color}>{account.icon}</div>
                <span>{account.name}</span>
              </div>
            ))}
            <Link
              to="/dashboard/manage-accounts"
              className="flex items-center gap-3 px-3 py-2 text-accent-purple hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User size={18} />
              <span>Manage Accounts</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <User size={16} className="text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium">John's Shop</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
