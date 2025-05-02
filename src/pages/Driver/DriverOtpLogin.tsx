
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';

const DriverOtpLogin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      console.log('Driver OTP sent to', phone);
      toast.success('OTP sent successfully', {
        description: `A 6-digit code has been sent to ${phone}`
      });
      setOtpSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      console.log('Driver OTP verification attempt', { phone, otp });
      // In a real app, we would verify with a backend
      if (otp.length === 6) {
        toast.success('Login successful');
        navigate('/driver');
      } else {
        toast.error('Invalid OTP', {
          description: 'Please enter all 6 digits'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Driver Login with OTP</h1>
            <p className="text-gray-600 mt-2">Quick access to KeKeRide driver platform</p>
          </div>
          
          <Card>
            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Enter Phone Number</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                    <Input 
                      id="phone"
                      type="tel" 
                      placeholder="Enter your phone number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="keke-input"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button 
                    type="submit" 
                    className="w-full bg-keke-primary hover:bg-keke-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                  
                  <p className="text-center text-gray-600 mt-4">
                    Want to use password instead?{' '}
                    <Link to="/driver/login" className="text-keke-primary hover:underline">
                      Login with Password
                    </Link>
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-200 w-full text-center">
                    <Link to="/otp-login" className="text-keke-primary hover:underline">
                      Switch to Passenger OTP Login
                    </Link>
                  </div>
                </CardFooter>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Enter OTP</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium mb-1">
                      Enter the 6-digit code sent to {phone}
                    </label>
                    <div className="flex justify-center py-4">
                      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    
                    <div className="text-center mt-2">
                      <button 
                        type="button" 
                        className="text-keke-primary text-sm hover:underline"
                        onClick={() => setOtpSent(false)}
                      >
                        Change phone number
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button 
                    type="submit" 
                    className="w-full bg-keke-primary hover:bg-keke-primary/90"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                  </Button>
                  
                  <div className="text-center mt-4">
                    <button 
                      type="button" 
                      className="text-keke-primary text-sm hover:underline"
                      onClick={handleSendOtp}
                      disabled={isLoading}
                    >
                      Didn't receive the code? Resend
                    </button>
                  </div>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverOtpLogin;
