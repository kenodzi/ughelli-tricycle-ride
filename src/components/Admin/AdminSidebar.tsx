
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  Clock,
  Settings, 
  LogOut,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'drivers', label: 'Drivers', icon: Car },
    { id: 'rides', label: 'Rides', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r hidden md:block overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-center p-4 mb-6">
          <Shield className="h-10 w-10 text-keke-primary" />
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === item.id ? "bg-keke-primary text-white" : ""
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
      
      <div className="p-4 border-t mt-auto">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-red-500">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
