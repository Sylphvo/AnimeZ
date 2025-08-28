"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { UserForm } from "@/components/user-form";
import { UserFormData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers } from "@/lib/mock-data";

interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditUserPage({ params }: EditUserPageProps) {
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
            <button 
              onClick={() => router.push("/users")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const initialData: Partial<UserFormData> = {
    fullName: user.fullName,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth.toISOString().split('T')[0],
    email: user.email,
    phoneNumber: user.phoneNumber,
    username: user.username,
    profession: user.profession,
    company: user.company,
    position: user.position,
    banks: user.wallet.banks,
    weight: user.physicalInfo.weight,
    height: user.physicalInfo.height,
    breakfast: user.mealPreferences.breakfast,
    lunch: user.mealPreferences.lunch,
    afternoon: user.mealPreferences.afternoon,
    dinner: user.mealPreferences.dinner,
    skills: user.skills,
    other: user.other,
    walletBalance: user.wallet.mainWallet.balance,
    walletCurrency: user.wallet.mainWallet.currency,
    language: user.personalSettings.language,
    theme: user.personalSettings.theme,
    notifications: user.personalSettings.notifications,
    privacy: user.personalSettings.privacy,
  };

  const handleSubmit = (data: UserFormData) => {
    console.log("Updating user:", data);
    setTimeout(() => {
      alert("Thông tin người dùng đã được cập nhật thành công!");
      router.push(`/users/${id}`);
    }, 1000);
  };

  const handleCancel = () => {
    router.push(`/users/${id}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
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
            <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa người dùng</h1>
            <p className="text-gray-600">Cập nhật thông tin của {user.fullName}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <UserForm
              initialData={initialData}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isEditing={true}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
