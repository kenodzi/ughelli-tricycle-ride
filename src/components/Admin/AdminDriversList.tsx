
import React, { useState } from 'react';
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
import { Eye, Search, ThumbsDown, ThumbsUp, ImageIcon, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

interface Driver {
  id: number;
  name: string;
  phone: string;
  kekeId: string;
  status: 'Active' | 'Pending' | 'Inactive';
  verified: boolean;
  rating: number;
  rides: number;
  photoVerified?: boolean | null;
  photoUrl?: string;
}

const AdminDriversList = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { 
      id: 1, 
      name: 'Emmanuel Obi', 
      phone: '080-1234-5678', 
      kekeId: 'KK-1234', 
      status: 'Active', 
      verified: true, 
      rating: 4.8, 
      rides: 45,
      photoVerified: true,
      photoUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=faces'
    },
    { 
      id: 2, 
      name: 'Joseph Adewale', 
      phone: '080-2345-6789', 
      kekeId: 'KK-2345', 
      status: 'Pending', 
      verified: false, 
      rating: 0, 
      rides: 0,
      photoVerified: null,
      photoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=faces'
    },
    { 
      id: 3, 
      name: 'Francis Eze', 
      phone: '070-3456-7890', 
      kekeId: 'KK-3456', 
      status: 'Active', 
      verified: true, 
      rating: 4.6, 
      rides: 32,
      photoVerified: true,
      photoUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=faces'
    },
    { 
      id: 4, 
      name: 'Victor Okonkwo', 
      phone: '090-4567-8901', 
      kekeId: 'KK-4567', 
      status: 'Inactive', 
      verified: true, 
      rating: 3.9, 
      rides: 18,
      photoVerified: false,
      photoUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=faces'
    },
    { 
      id: 5, 
      name: 'Samuel Udoh', 
      phone: '081-5678-9012', 
      kekeId: 'KK-5678', 
      status: 'Pending', 
      verified: false, 
      rating: 0, 
      rides: 0,
      photoVerified: null,
      photoUrl: null
    },
  ]);
  
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const { toast } = useToast();

  const verifyDriverPhoto = (driverId: number, approved: boolean) => {
    setDrivers(drivers.map(driver => {
      if (driver.id === driverId) {
        return { 
          ...driver, 
          photoVerified: approved
        };
      }
      return driver;
    }));
    
    toast({
      title: approved ? "Photo Verified" : "Photo Rejected",
      description: `Driver photo has been ${approved ? 'approved' : 'rejected'}.`,
      variant: approved ? "default" : "destructive"
    });
    
    setPhotoDialogOpen(false);
  };

  const viewDriverPhoto = (driver: Driver) => {
    setSelectedDriver(driver);
    setPhotoDialogOpen(true);
  };

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
              <TableHead>Driver</TableHead>
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
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      {driver.photoUrl ? (
                        <AvatarImage src={driver.photoUrl} alt={driver.name} />
                      ) : null}
                      <AvatarFallback>{driver.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{driver.name}</div>
                      <div className="flex items-center text-xs mt-1">
                        {driver.photoVerified === true && (
                          <span className="text-green-600 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Photo Verified
                          </span>
                        )}
                        {driver.photoVerified === false && (
                          <span className="text-red-600 flex items-center">
                            <XCircle className="h-3 w-3 mr-1" />
                            Photo Rejected
                          </span>
                        )}
                        {driver.photoVerified === null && driver.photoUrl && (
                          <span className="text-yellow-600 flex items-center">
                            Photo Pending
                          </span>
                        )}
                        {driver.photoVerified === null && !driver.photoUrl && (
                          <span className="text-gray-500 flex items-center">
                            No Photo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
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
                    
                    {driver.photoUrl && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-blue-500"
                        onClick={() => viewDriverPhoto(driver)}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    )}
                    
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

      <Dialog open={photoDialogOpen} onOpenChange={setPhotoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Driver Photo Verification</DialogTitle>
            <DialogDescription>
              {selectedDriver?.photoVerified === null 
                ? "Verify this driver's photo for identification" 
                : selectedDriver?.photoVerified 
                  ? "This photo has been verified" 
                  : "This photo has been rejected"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            {selectedDriver?.photoUrl ? (
              <img 
                src={selectedDriver.photoUrl} 
                alt={selectedDriver.name} 
                className="w-full max-w-sm rounded-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md">
                <p className="text-gray-500">No photo available</p>
              </div>
            )}
            
            <div className="mt-6 flex space-x-4">
              <Button 
                variant="destructive"
                onClick={() => selectedDriver && verifyDriverPhoto(selectedDriver.id, false)}
                disabled={selectedDriver?.photoVerified === false || !selectedDriver?.photoUrl}
              >
                Reject Photo
              </Button>
              <Button
                variant="default"
                onClick={() => selectedDriver && verifyDriverPhoto(selectedDriver.id, true)}
                disabled={selectedDriver?.photoVerified === true || !selectedDriver?.photoUrl}
              >
                Verify Photo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDriversList;
