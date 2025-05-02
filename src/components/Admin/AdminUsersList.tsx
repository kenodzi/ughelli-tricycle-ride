
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Search, UserCheck, UserMinus } from 'lucide-react';

const AdminUsersList = () => {
  const users = [
    { id: 1, name: 'Esther Johnson', phone: '080-1234-5678', date: '2025-04-20', status: 'Active', rides: 15 },
    { id: 2, name: 'Michael Obi', phone: '080-2345-6789', date: '2025-04-18', status: 'Active', rides: 8 },
    { id: 3, name: 'Sarah Adamu', phone: '070-3456-7890', date: '2025-04-15', status: 'Inactive', rides: 3 },
    { id: 4, name: 'Daniel Ekpo', phone: '090-4567-8901', date: '2025-04-12', status: 'Active', rides: 21 },
    { id: 5, name: 'Grace Nnamdi', phone: '081-5678-9012', date: '2025-04-10', status: 'Active', rides: 12 },
    { id: 6, name: 'Tolu Ademola', phone: '070-6789-0123', date: '2025-04-08', status: 'Inactive', rides: 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search users..." 
            className="pl-8"
          />
        </div>
        
        <Button>
          <UserCheck className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Rides</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.rides}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {user.status === 'Active' ? (
                      <Button variant="outline" size="sm" className="text-red-500">
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="text-green-500">
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsersList;
