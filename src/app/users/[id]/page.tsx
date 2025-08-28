"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "@/lib/mock-data";
import { User } from "@/lib/types";

interface UserDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const user = mockUsers.find(u => u.id === id);

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy người dùng</h2>
            <p className="text-gray-600 mb-4">Người dùng với ID này không tồn tại.</p>
            <Button onClick={() => router.push("/users")}>
              Quay lại danh sách
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Hoạt động</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Không hoạt động</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Tạm khóa</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency === 'VND' ? 'VND' : 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chi tiết người dùng</h1>
              <p className="text-gray-600">Thông tin chi tiết của {user.fullName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => router.push(`/users/${id}/edit`)}>
              Chỉnh sửa
            </Button>
            <Button variant="destructive">
              Xóa người dùng
            </Button>
          </div>
        </div>

        {/* User Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder-avatar.jpg" alt={user.fullName} />
                <AvatarFallback className="text-lg">
                  {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
                <p className="text-gray-600">@{user.username}</p>
                <div className="flex items-center space-x-4 mt-2">
                  {getStatusBadge(user.status)}
                  <span className="text-sm text-gray-500">
                    Tham gia từ {formatDate(user.accountCreatedDate)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
            <TabsTrigger value="account">Tài khoản</TabsTrigger>
            <TabsTrigger value="work">Công việc</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cá nhân</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Họ tên đầy đủ</label>
                    <p className="text-lg font-semibold">{user.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Giới tính</label>
                    <p className="text-lg">
                      {user.gender === 'male' ? 'Nam' : user.gender === 'female' ? 'Nữ' : 'Khác'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngày sinh</label>
                    <p className="text-lg">{formatDate(user.dateOfBirth)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                    <p className="text-lg">{user.phoneNumber}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin tài khoản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tên đăng nhập</label>
                    <p className="text-lg">@{user.username}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngày tạo tài khoản</label>
                    <p className="text-lg">{formatDate(user.accountCreatedDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Lần đăng nhập gần nhất</label>
                    <p className="text-lg">{formatDate(user.lastLoginDate)}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-4">Thông tin ví</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Số dư</label>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(user.wallet.totalBalance, user.wallet.currency)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Loại tiền tệ</label>
                      <p className="text-lg">{user.wallet.currency}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="work" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin công việc</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nghề nghiệp</label>
                    <p className="text-lg">{user.profession}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Công ty</label>
                    <p className="text-lg">{user.company}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Chức vụ</label>
                    <p className="text-lg">{user.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt cá nhân</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ngôn ngữ</label>
                    <p className="text-lg">
                      {user.personalSettings.language === 'vi' ? 'Tiếng Việt' : 
                       user.personalSettings.language === 'en' ? 'English' : 'Khác'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Giao diện</label>
                    <p className="text-lg">
                      {user.personalSettings.theme === 'light' ? 'Sáng' : 'Tối'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Thông báo</label>
                    <p className="text-lg">
                      {user.personalSettings.notifications ? 'Bật' : 'Tắt'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Quyền riêng tư</label>
                    <p className="text-lg">
                      {user.personalSettings.privacy === 'public' ? 'Công khai' : 'Riêng tư'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
