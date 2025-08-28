"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  getUserStats, 
  getWalletStats, 
  getHealthStats, 
  getAttendanceStats, 
  getTaskStats,
  mockUsers 
} from "@/lib/mock-data";

export function EnhancedDashboard() {
  const [checkInTime, setCheckInTime] = useState<string>("");
  const userStats = getUserStats();
  const walletStats = getWalletStats();
  const healthStats = getHealthStats();
  const attendanceStats = getAttendanceStats();
  const taskStats = getTaskStats();

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString('vi-VN'));
    alert(`Điểm danh thành công lúc ${now.toLocaleTimeString('vi-VN')}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Tổng người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalUsers}</div>
            <p className="text-xs opacity-75 mt-1">{userStats.growthRate} so với tháng trước</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Điểm danh hôm nay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.presentToday}</div>
            <p className="text-xs opacity-75 mt-1">{attendanceStats.attendanceRate}% có mặt</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Nhiệm vụ hoàn thành</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskStats.completedTasks}/{taskStats.totalTasks}</div>
            <p className="text-xs opacity-75 mt-1">{taskStats.completionRate}% hoàn thành</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Điểm sức khỏe TB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthStats.avgHealthScore}/100</div>
            <p className="text-xs opacity-75 mt-1">{healthStats.healthyUsers} người khỏe mạnh</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="wallets" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="wallets">Thống kê ví</TabsTrigger>
          <TabsTrigger value="health">Sức khỏe</TabsTrigger>
          <TabsTrigger value="attendance">Điểm danh</TabsTrigger>
          <TabsTrigger value="tasks">Nhiệm vụ</TabsTrigger>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
        </TabsList>

        {/* Wallet Statistics */}
        <TabsContent value="wallets" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ví chính</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(walletStats.totalMainWallet)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Tổng số dư ví chính</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ví tạm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(walletStats.totalTempWallet)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Tổng số dư ví tạm</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tổng cộng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(walletStats.totalBalance)}
                </div>
                <p className="text-sm text-gray-600 mt-1">Tổng tất cả ví</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Chi tiết ví theo người dùng</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Ví chính</TableHead>
                    <TableHead>Ví tạm</TableHead>
                    <TableHead>Tổng cộng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.slice(0, 3).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{formatCurrency(user.wallet.mainWallet.balance)}</TableCell>
                      <TableCell>{formatCurrency(user.wallet.temporaryWallet.balance)}</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(user.wallet.mainWallet.balance + user.wallet.temporaryWallet.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Statistics */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">BMI trung bình</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{healthStats.avgBMI}</div>
                <Progress value={healthStats.avgBMI * 4} className="mt-2" />
                <p className="text-sm text-gray-600 mt-1">Chỉ số khối cơ thể</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Điểm sức khỏe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{healthStats.avgHealthScore}/100</div>
                <Progress value={healthStats.avgHealthScore} className="mt-2" />
                <p className="text-sm text-gray-600 mt-1">Điểm trung bình</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Người khỏe mạnh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{healthStats.healthyUsers}</div>
                <p className="text-sm text-gray-600 mt-1">{healthStats.healthyPercentage}% tổng số</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cần theo dõi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {userStats.totalUsers - healthStats.healthyUsers}
                </div>
                <p className="text-sm text-gray-600 mt-1">Điểm sức khỏe dưới 80</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Chi tiết sức khỏe</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>BMI</TableHead>
                    <TableHead>Huyết áp</TableHead>
                    <TableHead>Nhịp tim</TableHead>
                    <TableHead>Điểm sức khỏe</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.slice(0, 3).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{user.healthStats.bmi}</TableCell>
                      <TableCell>
                        {`${user.healthStats.bloodPressure.systolic}/${user.healthStats.bloodPressure.diastolic}`}
                      </TableCell>
                      <TableCell>{user.healthStats.heartRate} bpm</TableCell>
                      <TableCell>{user.healthStats.healthScore}/100</TableCell>
                      <TableCell>
                        <Badge variant={user.healthStats.healthScore >= 80 ? "default" : "destructive"}>
                          {user.healthStats.healthScore >= 80 ? "Khỏe mạnh" : "Cần theo dõi"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Điểm danh hôm nay</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {new Date().toLocaleDateString('vi-VN')}
                  </div>
                  <p className="text-gray-600">Hôm nay</p>
                </div>
                
                <Button 
                  onClick={handleCheckIn} 
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Điểm danh ngay
                </Button>
                
                {checkInTime && (
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-green-700 font-medium">
                      Đã điểm danh lúc: {checkInTime}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thống kê điểm danh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Có mặt:</span>
                  <Badge className="bg-green-100 text-green-800">
                    {attendanceStats.presentToday} người
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Đi muộn:</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    {attendanceStats.lateToday} người
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Vắng mặt:</span>
                  <Badge className="bg-red-100 text-red-800">
                    {attendanceStats.absentToday} người
                  </Badge>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tỷ lệ có mặt</span>
                    <span>{attendanceStats.attendanceRate}%</span>
                  </div>
                  <Progress value={attendanceStats.attendanceRate} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tasks */}
        <TabsContent value="tasks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tổng nhiệm vụ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{taskStats.totalTasks}</div>
                <p className="text-sm text-gray-600 mt-1">Tất cả nhiệm vụ</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hoàn thành</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{taskStats.completedTasks}</div>
                <p className="text-sm text-gray-600 mt-1">Đã xong</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Đang thực hiện</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{taskStats.inProgressTasks}</div>
                <p className="text-sm text-gray-600 mt-1">Đang làm</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chờ xử lý</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{taskStats.pendingTasks}</div>
                <p className="text-sm text-gray-600 mt-1">Chưa bắt đầu</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lên lịch công việc mới</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Tiêu đề nhiệm vụ" />
                <Input type="date" />
              </div>
              <Input placeholder="Mô tả chi tiết" />
              <div className="flex space-x-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Tạo nhiệm vụ
                </Button>
                <Button variant="outline">
                  Lưu nháp
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tổng quan hệ thống</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Tổng người dùng:</span>
                  <span className="font-semibold">{userStats.totalUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tổng số dư ví:</span>
                  <span className="font-semibold">{formatCurrency(walletStats.totalBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Điểm sức khỏe TB:</span>
                  <span className="font-semibold">{healthStats.avgHealthScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Tỷ lệ hoàn thành task:</span>
                  <span className="font-semibold">{taskStats.completionRate}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">3 người dùng mới đăng ký hôm nay</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">5 nhiệm vụ được hoàn thành</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">2 người cần kiểm tra sức khỏe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">Tỷ lệ điểm danh: {attendanceStats.attendanceRate}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
