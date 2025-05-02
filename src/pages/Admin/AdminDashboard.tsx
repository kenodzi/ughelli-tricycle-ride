
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Car,
  UserCheck,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import AdminHeader from '@/components/Admin/AdminHeader';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import AdminDriversList from '@/components/Admin/AdminDriversList';
import AdminRidesList from '@/components/Admin/AdminRidesList';
import AdminUsersList from '@/components/Admin/AdminUsersList';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="h-screen flex flex-col">
      <AdminHeader />
      
      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 overflow-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="dashboard">
              <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">124</div>
                    <p className="text-xs text-green-600 mt-1">↑ 14% from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32</div>
                    <p className="text-xs text-green-600 mt-1">↑ 5% from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">281</div>
                    <p className="text-xs text-green-600 mt-1">↑ 12% from last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₦56,420</div>
                    <p className="text-xs text-green-600 mt-1">↑ 18% from last week</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Rides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center text-gray-400">
                      Ride activity chart would go here
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Driver Approval Queue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">John Okoro</p>
                          <p className="text-sm text-gray-500">Applied: 2 hours ago</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">Action <ChevronDown className="ml-2 h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                            <DropdownMenuItem>Reject</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Michael Effiong</p>
                          <p className="text-sm text-gray-500">Applied: 5 hours ago</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">Action <ChevronDown className="ml-2 h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                            <DropdownMenuItem>Reject</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Emmanuel Oghene</p>
                          <p className="text-sm text-gray-500">Applied: Yesterday</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">Action <ChevronDown className="ml-2 h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Approve</DropdownMenuItem>
                            <DropdownMenuItem>Reject</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <AdminUsersList />
            </TabsContent>
            
            <TabsContent value="drivers">
              <AdminDriversList />
            </TabsContent>
            
            <TabsContent value="rides">
              <AdminRidesList />
            </TabsContent>
            
            <TabsContent value="settings">
              <h1 className="text-2xl font-bold mb-6">System Settings</h1>
              <Card>
                <CardHeader>
                  <CardTitle>Fee Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="baseFare" className="block text-sm font-medium mb-1">Base Fare (₦)</label>
                      <Input id="baseFare" type="number" defaultValue="200" className="max-w-xs" />
                    </div>
                    <div>
                      <label htmlFor="perKm" className="block text-sm font-medium mb-1">Per Kilometer Rate (₦)</label>
                      <Input id="perKm" type="number" defaultValue="50" className="max-w-xs" />
                    </div>
                    <div>
                      <label htmlFor="perMin" className="block text-sm font-medium mb-1">Per Minute Rate (₦)</label>
                      <Input id="perMin" type="number" defaultValue="5" className="max-w-xs" />
                    </div>
                    <div>
                      <label htmlFor="platformFee" className="block text-sm font-medium mb-1">Platform Fee (%)</label>
                      <Input id="platformFee" type="number" defaultValue="10" className="max-w-xs" />
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
