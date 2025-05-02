
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          KeKeRide
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-600">
            About
          </Link>
          <Link to="/rides" className="hover:text-gray-600">
            My Rides
          </Link>
          <Link to="/login" className="hover:text-gray-600">
            Login
          </Link>
          <Link to="/signup" className="bg-keke-primary text-white rounded-md px-4 py-2 hover:bg-keke-primary/90">
            Sign Up
          </Link>
          <Link to="/driver" className="hover:text-gray-600">
            Driver App
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Shield className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Management Access</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/admin/login" className="w-full">Admin Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/superadmin/login" className="w-full">Super Admin</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explore KeKeRide
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link to="/" className="hover:text-gray-600 block py-2">
                Home
              </Link>
              <Link to="/about" className="hover:text-gray-600 block py-2">
                About
              </Link>
              <Link to="/rides" className="hover:text-gray-600 block py-2">
                My Rides
              </Link>
              <Link to="/login" className="hover:text-gray-600 block py-2">
                Login
              </Link>
              <Link to="/signup" className="bg-keke-primary text-white rounded-md px-4 py-2 hover:bg-keke-primary/90 block">
                Sign Up
              </Link>
              <Link to="/driver" className="hover:text-gray-600 block py-2">
                Driver App
              </Link>
              <Link to="/admin/login" className="hover:text-gray-600 block py-2">
                Admin Login
              </Link>
              <Link to="/superadmin/login" className="hover:text-gray-600 block py-2">
                Super Admin
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
