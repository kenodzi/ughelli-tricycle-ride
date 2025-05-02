
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const SuperAdminSystemSettings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="appName" className="text-base">Application Name</Label>
                <Input id="appName" defaultValue="KeKeRide" className="max-w-md mt-1" />
              </div>
              
              <div>
                <Label htmlFor="contactEmail" className="text-base">Support Email</Label>
                <Input id="contactEmail" defaultValue="support@kekeride.com" className="max-w-md mt-1" />
              </div>
              
              <div>
                <Label htmlFor="currency" className="text-base">Currency</Label>
                <Input id="currency" defaultValue="NGN (₦)" className="max-w-md mt-1" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="maintenanceMode" />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch id="twoFactorAuth" defaultChecked />
                <Label htmlFor="twoFactorAuth">Enforce Two-Factor Authentication for Admins</Label>
              </div>
              
              <div>
                <Label htmlFor="passwordPolicy" className="text-base">Password Policy</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="requireUppercase" defaultChecked />
                    <Label htmlFor="requireUppercase">Require Uppercase</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="requireNumber" defaultChecked />
                    <Label htmlFor="requireNumber">Require Number</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="requireSymbol" defaultChecked />
                    <Label htmlFor="requireSymbol">Require Symbol</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="requireMinLength" defaultChecked />
                    <Label htmlFor="requireMinLength">Minimum 8 Characters</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="sessionTimeout" className="text-base">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="30" className="max-w-xs mt-1" />
              </div>
              
              <Button>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>System Maintenance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Database Backup</h3>
                <div className="flex space-x-4">
                  <Button variant="outline">Manual Backup</Button>
                  <Button variant="outline">Restore from Backup</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Cache Management</h3>
                <Button variant="outline">Clear System Cache</Button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">System Logs</h3>
                <Button variant="outline">View Error Logs</Button>
                <p className="text-sm text-gray-500 mt-2">Last log check: 2025-05-01 08:30 AM</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border border-red-200 rounded-md bg-red-50">
                    <div>
                      <p className="font-medium">Reset System</p>
                      <p className="text-sm text-gray-500">This will reset all configurations to default</p>
                    </div>
                    <Button variant="destructive">Reset</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="mapsApiKey" className="text-base">Maps API Key</Label>
                <Input id="mapsApiKey" defaultValue="••••••••••••••••••••••••••••••" className="max-w-md mt-1" />
              </div>
              
              <div>
                <Label htmlFor="smsApiKey" className="text-base">SMS Gateway API Key</Label>
                <Input id="smsApiKey" defaultValue="••••••••••••••••••••••••••••••" className="max-w-md mt-1" />
              </div>
              
              <div>
                <Label htmlFor="paymentApiKey" className="text-base">Payment Gateway API Key</Label>
                <Input id="paymentApiKey" defaultValue="••••••••••••••••••••••••••••••" className="max-w-md mt-1" />
              </div>
              
              <Button>Update API Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminSystemSettings;
