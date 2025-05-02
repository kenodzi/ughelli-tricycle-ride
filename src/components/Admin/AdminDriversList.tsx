
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
import { Eye, Search, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminDriversList = () => {
  const drivers = [
    { 
      id: 1, 
      name: 'Emmanuel Obi', 
      phone: '080-1234-5678', 
      kekeId: 'KK-1234', 
      status: 'Active', 
      verified: true, 
      rating: 4.8, 
      rides: 45 
    },
    { 
      id: 2, 
      name: 'Joseph Adewale', 
      phone: '080-2345-6789', 
      kekeId: 'KK-2345', 
      status: 'Pending', 
      verified: false, 
      rating: 0, 
      rides: 0 
    },
    { 
      id: 3, 
      name: 'Francis Eze', 
      phone: '070-3456-7890', 
      kekeId: 'KK-3456', 
      status: 'Active', 
      verified: true, 
      rating: 4.6, 
      rides: 32 
    },
    { 
      id: 4, 
      name: 'Victor Okonkwo', 
      phone: '090-4567-8901', 
      kekeId: 'KK-4567', 
      status: 'Inactive', 
      verified: true, 
      rating: 3.9, 
      rides: 18 
    },
    { 
      id: 5, 
      name: 'Samuel Udoh', 
      phone: '081-5678-9012', 
      kekeId: 'KK-5678', 
      status: 'Pending', 
      verified: false, 
      rating: 0, 
      rides: 0 
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Driver Management</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search drivers..." 
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Keke ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Rides</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell className="font-medium">{driver.name}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.kekeId}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      driver.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      driver.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell>{driver.rating > 0 ? driver.rating : 'N/A'}</TableCell>
                <TableCell>{driver.rides}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {driver.status === 'Pending' && (
                      <>
                        <Button variant="outline" size="sm" className="text-green-500">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    
                    {driver.status === 'Active' && (
                      <Button variant="outline" size="sm" className="text-red-500">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {driver.status === 'Inactive' && (
                      <Button variant="outline" size="sm" className="text-green-500">
                        <ThumbsUp className="h-4 w-4" />
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

export default AdminDriversList;
