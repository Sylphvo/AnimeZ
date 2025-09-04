"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { DashboardLayout } from "@/components/dashboard-layout";

export default function CalendarPage() {
  const { user } = useAuth();
  const [attendanceDates, setAttendanceDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Load attendance from localStorage on mount
  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`attendance_${user.id}`);
      if (stored) {
        const dates = JSON.parse(stored).map((dateStr: string) => new Date(dateStr));
        setAttendanceDates(dates);
      }
    }
  }, [user?.id]);

  // Save attendance to localStorage whenever it changes
  useEffect(() => {
    if (user?.id && attendanceDates.length > 0) {
      localStorage.setItem(`attendance_${user.id}`, JSON.stringify(attendanceDates.map(date => date.toISOString())));
    }
  }, [attendanceDates, user?.id]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const dateStr = date.toDateString();
    const isAlreadyMarked = attendanceDates.some(d => d.toDateString() === dateStr);

    if (isAlreadyMarked) {
      // Remove attendance
      setAttendanceDates(prev => prev.filter(d => d.toDateString() !== dateStr));
    } else {
      // Add attendance
      setAttendanceDates(prev => [...prev, date]);
    }
  };

  const getAttendanceStats = () => {
    const total = attendanceDates.length;
    const today = new Date().toDateString();
    const todayMarked = attendanceDates.some(d => d.toDateString() === today);

    // Calculate current streak
    let streak = 0;
    const sortedDates = attendanceDates.sort((a, b) => b.getTime() - a.getTime());
    const now = new Date();

    for (let i = 0; i < sortedDates.length; i++) {
      const date = sortedDates[i];
      const diffTime = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }

    return { total, todayMarked, streak };
  };

  const stats = getAttendanceStats();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Track your daily attendance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={{
                    attended: attendanceDates
                  }}
                  modifiersStyles={{
                    attended: {
                      backgroundColor: '#10b981',
                      color: 'white',
                      fontWeight: 'bold'
                    }
                  }}
                  className="rounded-md border"
                />
                <div className="mt-4 flex items-center justify-center">
                  <button
                    onClick={() => handleDateSelect(selectedDate)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {attendanceDates.some(d => d.toDateString() === selectedDate?.toDateString())
                      ? 'Remove Attendance'
                      : 'Mark Attendance'}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Days</span>
                  <Badge variant="secondary">{stats.total}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Current Streak</span>
                  <Badge variant="secondary">{stats.streak} days</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Today</span>
                  <Badge variant={stats.todayMarked ? "default" : "outline"}>
                    {stats.todayMarked ? "✓ Marked" : "Not marked"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {attendanceDates
                    .sort((a, b) => b.getTime() - a.getTime())
                    .slice(0, 5)
                    .map((date, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{date.toLocaleDateString()}</span>
                        <Badge variant="outline" className="text-xs">Attended</Badge>
                      </div>
                    ))}
                  {attendanceDates.length === 0 && (
                    <p className="text-sm text-gray-500">No attendance records yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
