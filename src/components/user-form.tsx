"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { UserFormData } from "@/lib/types";

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function UserForm({ initialData, onSubmit, onCancel, isEditing = false }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    fullName: initialData?.fullName || "",
    gender: initialData?.gender || "male",
    dateOfBirth: initialData?.dateOfBirth || "",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
    username: initialData?.username || "",
    password: initialData?.password || "",
    profession: initialData?.profession || "",
    company: initialData?.company || "",
    position: initialData?.position || "",
    banks: initialData?.banks || [],
    weight: initialData?.weight || 0,
    height: initialData?.height || 0,
    breakfast: initialData?.breakfast || "",
    lunch: initialData?.lunch || "",
    afternoon: initialData?.afternoon || "",
    dinner: initialData?.dinner || "",
    skills: initialData?.skills || [],
    other: initialData?.other || "",
    walletBalance: initialData?.walletBalance || 0,
    walletCurrency: initialData?.walletCurrency || "VND",
    language: initialData?.language || "vi",
    theme: initialData?.theme || "light",
    notifications: initialData?.notifications || true,
    privacy: initialData?.privacy || "public",
    favoriteAnimeSeries: initialData?.favoriteAnimeSeries || "",
    favoriteCharacter: initialData?.favoriteCharacter || "",
    preferredGenres: initialData?.preferredGenres || [],
    animeWatchingHabits: initialData?.animeWatchingHabits || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="account">Tài khoản</TabsTrigger>
          <TabsTrigger value="work">Công việc</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          <TabsTrigger value="anime">Anime</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ tên đầy đủ *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Nhập họ tên đầy đủ"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Giới tính *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Ngày sinh *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Số điện thoại *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="+84 901 234 567"
                    required
                  />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="user@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="username"
                    required
                  />
                </div>
              </div>

              {!isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Nhập mật khẩu"
                    required={!isEditing}
                  />
                  <p className="text-sm text-gray-500">
                    Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="font-medium">Thông tin ví</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="walletBalance">Số dư ví</Label>
                    <Input
                      id="walletBalance"
                      type="number"
                      value={formData.walletBalance}
                      onChange={(e) => handleInputChange('walletBalance', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="walletCurrency">Loại tiền tệ</Label>
                    <Select value={formData.walletCurrency} onValueChange={(value) => handleInputChange('walletCurrency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VND">VND (Việt Nam Đồng)</SelectItem>
                        <SelectItem value="USD">USD (US Dollar)</SelectItem>
                        <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      </SelectContent>
                    </Select>
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
              <div className="space-y-2">
                <Label htmlFor="profession">Nghề nghiệp</Label>
                <Input
                  id="profession"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  placeholder="Ví dụ: Software Engineer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Công ty</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Tên công ty"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Chức vụ</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Chức vụ hiện tại"
                  />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Ngôn ngữ</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">Giao diện</Label>
                  <Select value={formData.theme} onValueChange={(value) => handleInputChange('theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Sáng</SelectItem>
                      <SelectItem value="dark">Tối</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Thông báo</Label>
                    <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                  </div>
                  <Switch
                    checked={formData.notifications}
                    onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="privacy">Quyền riêng tư</Label>
                  <Select value={formData.privacy} onValueChange={(value) => handleInputChange('privacy', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Công khai</SelectItem>
                      <SelectItem value="private">Riêng tư</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anime" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anime Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="favoriteAnimeSeries">Favorite Anime Series</Label>
                <Input
                  id="favoriteAnimeSeries"
                  value={formData.favoriteAnimeSeries}
                  onChange={(e) => handleInputChange('favoriteAnimeSeries', e.target.value)}
                  placeholder="Enter your favorite anime series"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="favoriteCharacter">Favorite Character</Label>
                <Input
                  id="favoriteCharacter"
                  value={formData.favoriteCharacter}
                  onChange={(e) => handleInputChange('favoriteCharacter', e.target.value)}
                  placeholder="Enter your favorite character"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredGenres">Preferred Genres</Label>
                <Textarea
                  id="preferredGenres"
                  value={formData.preferredGenres.join(', ')}
                  onChange={(e) => handleInputChange('preferredGenres', e.target.value.split(',').map(g => g.trim()).filter(g => g))}
                  placeholder="Enter preferred genres separated by commas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="animeWatchingHabits">Anime Watching Habits</Label>
                <Textarea
                  id="animeWatchingHabits"
                  value={formData.animeWatchingHabits}
                  onChange={(e) => handleInputChange('animeWatchingHabits', e.target.value)}
                  placeholder="Describe your anime watching habits"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {isEditing ? 'Cập nhật' : 'Tạo người dùng'}
        </Button>
      </div>
    </form>
  );
}
