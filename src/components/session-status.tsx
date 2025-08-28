"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function SessionStatus() {
  const { 
    session, 
    sessionTimeRemaining, 
    isSessionNearExpiry, 
    refreshSession, 
    logout 
  } = useAuth();
  
  const [timeDisplay, setTimeDisplay] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  // Format time remaining
  const formatTimeRemaining = (milliseconds: number): string => {
    if (milliseconds <= 0) return "Expired";
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Calculate session progress (how much time has passed)
  const getSessionProgress = (): number => {
    if (!session) return 0;
    
    const totalDuration = session.expiresAt - session.loginTime;
    const elapsed = Date.now() - session.loginTime;
    
    return Math.min(100, (elapsed / totalDuration) * 100);
  };

  useEffect(() => {
    const updateTimer = () => {
      setTimeDisplay(formatTimeRemaining(sessionTimeRemaining));
      setShowWarning(isSessionNearExpiry);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [sessionTimeRemaining, isSessionNearExpiry]);

  if (!session) {
    return null;
  }

  const sessionProgress = getSessionProgress();
  const loginTime = new Date(session.loginTime).toLocaleString();

  return (
    <Card className={`${showWarning ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Session Status</CardTitle>
          <Badge 
            variant={showWarning ? "destructive" : "secondary"}
            className="text-xs"
          >
            {session.rememberMe ? "Extended" : "Standard"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Session Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Session Progress</span>
            <span>{Math.round(sessionProgress)}%</span>
          </div>
          <Progress 
            value={sessionProgress} 
            className={`h-2 ${showWarning ? 'bg-orange-100' : ''}`}
          />
        </div>

        {/* Time Remaining */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Time Remaining:</span>
          <span className={`text-sm font-medium ${showWarning ? 'text-orange-600' : 'text-green-600'}`}>
            {timeDisplay}
          </span>
        </div>

        {/* Login Time */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Logged in:</span>
          <span className="text-sm text-gray-800">{loginTime}</span>
        </div>

        {/* Session Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshSession}
            className="flex-1 text-xs"
          >
            Extend Session
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="flex-1 text-xs text-red-600 hover:text-red-700"
          >
            Logout
          </Button>
        </div>

        {/* Warning Message */}
        {showWarning && (
          <div className="bg-orange-100 border border-orange-200 rounded-md p-3 mt-3">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-xs font-medium text-orange-800">Session Expiring Soon</p>
                <p className="text-xs text-orange-700">Your session will expire in {timeDisplay}. Click "Extend Session" to continue.</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
