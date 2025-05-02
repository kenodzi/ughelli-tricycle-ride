
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Users,
  Settings,
  LogOut,
  UserCog,
  Activity,
  Server,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SuperAdminHeader from '@/components/SuperAdmin/SuperAdminHeader';
import SuperAdminSidebar from '@/components/SuperAdmin/SuperAdminSidebar';
import SuperAdminAdminsList from '@/components/SuperAdmin/SuperAdminAdminsList';
import SuperAdminSystemSettings from '@/components/SuperAdmin/SuperAdminSystemSettings';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="h-screen flex flex-col">
      <SuperAdminHeader />
      
      <div className="flex-1 flex overflow-hidden">
        <SuperAdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 overflow-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="dashboard">
              <h1 className="text-2xl font-bold mb-6">Super Admin Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Good</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">573</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">System Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>System Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center text-gray-400">
                      System activity chart would go here
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Admin Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">Admin John</p>
                        <p className="text-sm text-gray-500">Modified fare settings</p>
                        <p className="text-xs text-gray-400">1 hour ago</p>
                      </div>
                      <div>
                        <p className="font-medium">Admin Sarah</p>
                        <p className="text-sm text-gray-500">Approved 3 drivers</p>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                      </div>
                      <div>
                        <p className="font-medium">Admin Mike</p>
                        <p className="text-sm text-gray-500">Generated monthly report</p>
                        <p className="text-xs text-gray-400">Yesterday</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="admins">
              <SuperAdminAdminsList />
            </TabsContent>
            
            <TabsContent value="settings">
              <SuperAdminSystemSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
