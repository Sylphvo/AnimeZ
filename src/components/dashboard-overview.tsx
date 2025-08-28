"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statisticsData = [
  {
    title: "Customers",
    value: "3,782",
    change: "+11.01%",
    changeType: "positive" as const,
    icon: "👥",
  },
  {
    title: "Orders",
    value: "5,359",
    change: "-9.05%",
    changeType: "negative" as const,
    icon: "📦",
  },
];

const monthlyData = [
  { month: "Jan", value: 150 },
  { month: "Feb", value: 380 },
  { month: "Mar", value: 200 },
  { month: "Apr", value: 280 },
  { month: "May", value: 180 },
  { month: "Jun", value: 190 },
  { month: "Jul", value: 250 },
  { month: "Aug", value: 100 },
  { month: "Sep", value: 200 },
  { month: "Oct", value: 350 },
  { month: "Nov", value: 280 },
  { month: "Dec", value: 100 },
];

const maxValue = Math.max(...monthlyData.map(d => d.value));

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statisticsData.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Monthly Target Card */}
        <Card className="md:col-span-2 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Monthly Target</CardTitle>
            <p className="text-sm text-gray-600">Target you've set for each month</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${75.55 * 3.14159} ${(100 - 75.55) * 3.14159}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">75.55%</div>
                    <div className="text-xs text-green-600 font-medium">+10%</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mb-4">
              You earn $3287 today, it's higher than last month.<br />
              Keep up your good work!
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 mb-1">Target</p>
                <p className="font-semibold text-red-600">$20K ↓</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Revenue</p>
                <p className="font-semibold text-green-600">$20K ↑</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Today</p>
                <p className="font-semibold text-green-600">$20K ↑</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Sales Chart */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Monthly Sales</CardTitle>
            <Button variant="ghost" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>400</span>
                <span>300</span>
                <span>200</span>
                <span>100</span>
                <span>0</span>
              </div>
            </div>
            <div className="flex items-end justify-between h-48 space-x-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                    style={{ 
                      height: `${(data.value / maxValue) * 100}%`,
                      minHeight: '8px'
                    }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics Chart */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Statistics</CardTitle>
              <p className="text-sm text-gray-600">Target you've set for each month</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                  Overview
                </Button>
                <Button variant="ghost" size="sm">
                  Sales
                </Button>
                <Button variant="ghost" size="sm">
                  Revenue
                </Button>
              </div>
              <Select defaultValue="aug2025">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aug2025">Aug 20, 2025 - Aug 26, 2025</SelectItem>
                  <SelectItem value="sep2025">Sep 20, 2025 - Sep 26, 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>250</span>
                <span>200</span>
                <span>150</span>
                <span>100</span>
              </div>
            </div>
            <div className="relative h-48">
              {/* Area Chart Simulation */}
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <path
                  d="M 0 150 Q 50 120 100 130 T 200 110 T 300 120 T 400 100 L 400 200 L 0 200 Z"
                  fill="url(#areaGradient)"
                />
                <path
                  d="M 0 150 Q 50 120 100 130 T 200 110 T 300 120 T 400 100"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 0 170 Q 50 160 100 165 T 200 150 T 300 155 T 400 140"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
