
import React from 'react';
import { 
  Activity, 
  Users, 
  Server, 
  Settings, 
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SuperAdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SuperAdminSidebar = ({ activeTab, setActiveTab }: SuperAdminSidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'admins', label: 'Admins', icon: Users },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white border-r border-gray-700 hidden md:block overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-center p-4 mb-6">
          <ShieldAlert className="h-10 w-10 text-red-500" />
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-gray-700 ${
                  activeTab === item.id ? "bg-gray-700" : ""
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-700 mt-auto">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:bg-gray-700">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
