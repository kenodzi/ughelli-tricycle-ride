
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
import { Eye, Search, UserCheck, UserMinus, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SuperAdminAdminsList = () => {
  const admins = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@kekeride.com', 
      role: 'Regional Admin', 
      region: 'Warri Central',
      status: 'Active', 
      lastLogin: '2025-05-01 09:23 AM'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@kekeride.com', 
      role: 'Customer Support', 
      region: 'All Regions',
      status: 'Active', 
      lastLogin: '2025-05-01 10:45 AM'
    },
    { 
      id: 3, 
      name: 'Michael Adu', 
      email: 'michael.a@kekeride.com', 
      role: 'Regional Admin', 
      region: 'Warri South',
      status: 'Inactive', 
      lastLogin: '2025-04-28 02:15 PM'
    },
    { 
      id: 4, 
      name: 'Grace Okonkwo', 
      email: 'grace.o@kekeride.com', 
      role: 'Finance Admin', 
      region: 'All Regions',
      status: 'Active', 
      lastLogin: '2025-05-01 08:30 AM'
    },
    { 
      id: 5, 
      name: 'Peter Nnamdi', 
      email: 'peter.n@kekeride.com', 
      role: 'Driver Support', 
      region: 'All Regions',
      status: 'Active', 
      lastLogin: '2025-04-30 04:50 PM'
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Admin
        </Button>
      </div>
      
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input 
          type="search" 
          placeholder="Search admins..." 
          className="pl-8"
        />
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="font-medium">{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.role}</TableCell>
                <TableCell>{admin.region}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {admin.status}
                  </Badge>
                </TableCell>
                <TableCell>{admin.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {admin.status === 'Active' ? (
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

export default SuperAdminAdminsList;
