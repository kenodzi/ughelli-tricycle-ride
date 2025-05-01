
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import BookRide from "./pages/BookRide";
import RideStatus from "./pages/RideStatus";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyRides from "./pages/MyRides";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "@/App.css";

const queryClient = new QueryClient();

// Create a separate component for ViewportSetup
const ViewportSetup = () => {
  useEffect(() => {
    // Add viewport meta tag for mobile devices
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewportMeta);
    
    // Add status bar style meta tag for iOS
    const statusBarMeta = document.createElement('meta');
    statusBarMeta.name = 'apple-mobile-web-app-status-bar-style';
    statusBarMeta.content = 'black-translucent';
    document.head.appendChild(statusBarMeta);
    
    return () => {
      document.head.removeChild(viewportMeta);
      document.head.removeChild(statusBarMeta);
    };
  }, []);

  return null;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ViewportSetup />
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookRide />} />
            <Route path="/ride-status" element={<RideStatus />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/rides" element={<MyRides />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
