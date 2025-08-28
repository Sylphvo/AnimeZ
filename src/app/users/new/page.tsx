"use client";

import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { UserForm } from "@/components/user-form";
import { UserFormData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewUserPage() {
  const router = useRouter();

  const handleSubmit = (data: UserFormData) => {
    // In a real app, this would make an API call
    console.log("Creating new user:", data);
    
    // Simulate API call
    setTimeout(() => {
      alert("Người dùng đã được tạo thành công!");
      router.push("/users");
    }, 1000);
  };

  const handleCancel = () => {
    router.push("/users");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
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
            <h1 className="text-2xl font-bold text-gray-900">Thêm người dùng mới</h1>
            <p className="text-gray-600">Tạo tài khoản người dùng mới trong hệ thống</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <UserForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isEditing={false}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
