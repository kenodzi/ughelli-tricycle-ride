
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminRidesList = () => {
  const rides = [
    { 
      id: 'R-12345', 
      passenger: 'John Doe', 
      driver: 'Emmanuel Obi',
      from: 'Market Road',
      to: 'Airport Road',
      date: '2025-05-01',
      amount: '₦850',
      status: 'Completed'
    },
    { 
      id: 'R-12346', 
      passenger: 'Alice Smith', 
      driver: 'Francis Eze',
      from: 'Effurun Roundabout',
      to: 'PTI Road',
      date: '2025-05-01',
      amount: '₦600',
      status: 'Completed'
    },
    { 
      id: 'R-12347', 
      passenger: 'Mary Johnson', 
      driver: 'Victor Okonkwo',
      from: 'Ekpan',
      to: 'Jakpa Road',
      date: '2025-05-01',
      amount: '₦950',
      status: 'In Progress'
    },
    { 
      id: 'R-12348', 
      passenger: 'Peter Okoye', 
      driver: 'Emmanuel Obi',
      from: 'DSC Expressway',
      to: 'Refinery Road',
      date: '2025-05-01',
      amount: '₦750',
      status: 'Cancelled'
    },
    { 
      id: 'R-12349', 
      passenger: 'Sarah Adamu', 
      driver: 'Francis Eze',
      from: 'Enerhen Junction',
      to: 'Warri Main Market',
      date: '2025-05-01',
      amount: '₦500',
      status: 'Completed'
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Ride Management</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search rides..." 
            className="pl-8"
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Passenger</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides.map((ride) => (
              <TableRow key={ride.id}>
                <TableCell className="font-medium">{ride.id}</TableCell>
                <TableCell>{ride.passenger}</TableCell>
                <TableCell>{ride.driver}</TableCell>
                <TableCell>{ride.from}</TableCell>
                <TableCell>{ride.to}</TableCell>
                <TableCell>{ride.date}</TableCell>
                <TableCell>{ride.amount}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      ride.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      ride.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {ride.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminRidesList;
