"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserFormData, BankAccount } from "@/lib/types";

export default function CreateUserPage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<UserFormData>({
    fullName: "",
    gender: "male",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    profession: "",
    company: "",
    position: "",
    banks: [],
    weight: 0,
    height: 0,
    breakfast: "",
    lunch: "",
    afternoon: "",
    dinner: "",
    skills: [],
    other: "",
    language: "vi",
    theme: "light",
    notifications: true,
    privacy: "public",
    walletBalance: 0,
    walletCurrency: "VND",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [skillInput, setSkillInput] = useState("");

  const handleInputChange = (field: keyof UserFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      handleInputChange('skills', [...formData.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    handleInputChange('skills', formData.skills.filter(skill => skill !== skillToRemove));
  };

  const addBank = () => {
    const newBank: BankAccount = {
      id: Date.now().toString(),
      bankName: "",
      accountNumber: "",
      balance: 0,
      currency: "VND",
      isDefault: formData.banks.length === 0,
    };
    handleInputChange('banks', [...formData.banks, newBank]);
  };

  const updateBank = (index: number, field: keyof BankAccount, value: any) => {
    const updatedBanks = formData.banks.map((bank, i) => 
      i === index ? { ...bank, [field]: value } : bank
    );
    handleInputChange('banks', updatedBanks);
  };

  const removeBank = (index: number) => {
    const updatedBanks = formData.banks.filter((_, i) => i !== index);
    handleInputChange('banks', updatedBanks);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = "Họ tên là bắt buộc";
    if (!formData.email.trim()) newErrors.email = "Email là bắt buộc";
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Số điện thoại là bắt buộc";
    if (!formData.username.trim()) newErrors.username = "Tên đăng nhập là bắt buộc";
    if (!formData.password.trim()) newErrors.password = "Mật khẩu là bắt buộc";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Ngày sinh là bắt buộc";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Phone validation
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, you would send data to your API
      console.log("Creating user:", formData);
      
      // Redirect to users list
      router.push("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "personal", label: "Cá nhân", icon: "👤" },
    { id: "account", label: "Tài khoản", icon: "🔐" },
    { id: "work", label: "Công việc", icon: "💼" },
    { id: "physical", label: "Thể chất", icon: "🏃" },
    { id: "meals", label: "Bữa ăn", icon: "🍽️" },
    { id: "banks", label: "Ngân hàng", icon: "🏦" },
    { id: "skills", label: "Kỹ năng", icon: "🎯" },
    { id: "settings", label: "Cài đặt", icon: "⚙️" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tạo người dùng mới</h1>
              <p className="text-gray-600">Nhập thông tin chi tiết cho người dùng mới</p>
            </div>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            Bước {tabs.findIndex(tab => tab.id === currentTab) + 1}/{tabs.length}
          </Badge>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="p-6">
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
                  {tabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id} className="flex flex-col items-center p-2">
                      <span className="text-lg mb-1">{tab.icon}</span>
                      <span className="text-xs">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={avatarPreview || ""} />
                        <AvatarFallback className="text-2xl">
                          {formData.fullName ? formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : '👤'}
                        </AvatarFallback>
                      </Avatar>
                      <label className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ tên đầy đủ *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Nhập họ tên đầy đủ"
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Giới tính</Label>
                      <Select value={formData.gender} onValueChange={(value: any) => handleInputChange('gender', value)}>
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

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Ngày sinh *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className={errors.dateOfBirth ? "border-red-500" : ""}
                      />
                      {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@email.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Số điện thoại *</Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="+84 901 234 567"
                        className={errors.phoneNumber ? "border-red-500" : ""}
                      />
                      {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
                    </div>
                  </div>
                </TabsContent>

                {/* Account Information Tab */}
                <TabsContent value="account" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Tên đăng nhập *</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        placeholder="username"
                        className={errors.username ? "border-red-500" : ""}
                      />
                      {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Mật khẩu *</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Nhập mật khẩu"
                        className={errors.password ? "border-red-500" : ""}
                      />
                      {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                  </div>
                </TabsContent>

                {/* Work Information Tab */}
                <TabsContent value="work" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="profession">Nghề nghiệp</Label>
                      <Input
                        id="profession"
                        value={formData.profession}
                        onChange={(e) => handleInputChange('profession', e.target.value)}
                        placeholder="Ví dụ: Software Engineer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Công ty</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Tên công ty"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="position">Chức vụ</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        placeholder="Ví dụ: Senior Developer"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Physical Information Tab */}
                <TabsContent value="physical" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Cân nặng (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={formData.weight || ""}
                        onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                        placeholder="70"
                        min="0"
                        max="300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height">Chiều cao (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={formData.height || ""}
                        onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                        placeholder="175"
                        min="0"
                        max="250"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Meals Tab */}
                <TabsContent value="meals" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="breakfast">Ăn sáng</Label>
                      <Textarea
                        id="breakfast"
                        value={formData.breakfast}
                        onChange={(e) => handleInputChange('breakfast', e.target.value)}
                        placeholder="Ví dụ: Phở, bánh mì, cà phê"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lunch">Ăn trưa</Label>
                      <Textarea
                        id="lunch"
                        value={formData.lunch}
                        onChange={(e) => handleInputChange('lunch', e.target.value)}
                        placeholder="Ví dụ: Cơm văn phòng, salad"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="afternoon">Ăn chiều</Label>
                      <Textarea
                        id="afternoon"
                        value={formData.afternoon}
                        onChange={(e) => handleInputChange('afternoon', e.target.value)}
                        placeholder="Ví dụ: Trà, bánh kẹo"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dinner">Ăn tối</Label>
                      <Textarea
                        id="dinner"
                        value={formData.dinner}
                        onChange={(e) => handleInputChange('dinner', e.target.value)}
                        placeholder="Ví dụ: Cơm gia đình, lẩu"
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Banks Tab */}
                <TabsContent value="banks" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Thông tin ngân hàng</h3>
                    <Button type="button" onClick={addBank} variant="outline">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Thêm ngân hàng
                    </Button>
                  </div>

                  {formData.banks.map((bank, index) => (
                    <Card key={bank.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Ngân hàng #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBank(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Xóa
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Tên ngân hàng</Label>
                          <Input
                            value={bank.bankName}
                            onChange={(e) => updateBank(index, 'bankName', e.target.value)}
                            placeholder="Ví dụ: Vietcombank"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Số tài khoản</Label>
                          <Input
                            value={bank.accountNumber}
                            onChange={(e) => updateBank(index, 'accountNumber', e.target.value)}
                            placeholder="1234567890"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Số dư</Label>
                          <Input
                            type="number"
                            value={bank.balance || ""}
                            onChange={(e) => updateBank(index, 'balance', parseFloat(e.target.value) || 0)}
                            placeholder="1000000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Loại tiền tệ</Label>
                          <Select value={bank.currency} onValueChange={(value) => updateBank(index, 'currency', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="VND">VND</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center space-x-2">
                        <Switch
                          checked={bank.isDefault}
                          onCheckedChange={(checked) => updateBank(index, 'isDefault', checked)}
                        />
                        <Label>Đặt làm tài khoản mặc định</Label>
                      </div>
                    </Card>
                  ))}

                  {formData.banks.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <p>Chưa có thông tin ngân hàng nào</p>
                      <p className="text-sm">Nhấn "Thêm ngân hàng" để bắt đầu</p>
                    </div>
                  )}
                </TabsContent>

                {/* Skills Tab */}
                <TabsContent value="skills" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Nhập kỹ năng (ví dụ: JavaScript)"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill} variant="outline">
                        Thêm
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="other">Thông tin khác</Label>
                      <Textarea
                        id="other"
                        value={formData.other}
                        onChange={(e) => handleInputChange('other', e.target.value)}
                        placeholder="Sở thích, kinh nghiệm đặc biệt, ghi chú khác..."
                        rows={4}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Ngôn ngữ</Label>
                      <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="theme">Giao diện</Label>
                      <Select value={formData.theme} onValueChange={(value: any) => handleInputChange('theme', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Sáng</SelectItem>
                          <SelectItem value="dark">Tối</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notifications">Thông báo</Label>
                        <Switch
                          id="notifications"
                          checked={formData.notifications}
                          onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="privacy">Quyền riêng tư</Label>
                        <Select value={formData.privacy} onValueChange={(value: any) => handleInputChange('privacy', value)}>
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
                  </div>
                </TabsContent>
              </Tabs>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const currentIndex = tabs.findIndex(tab => tab.id === currentTab);
                    if (currentIndex > 0) {
                      setCurrentTab(tabs[currentIndex - 1].id);
                    }
                  }}
                  disabled={tabs.findIndex(tab => tab.id === currentTab) === 0}
                >
                  ← Quay lại
                </Button>

                <div className="flex items-center space-x-2">
                  {tabs.findIndex(tab => tab.id === currentTab) < tabs.length - 1 ? (
                    <Button
                      type="button"
                      onClick={() => {
                        const currentIndex = tabs.findIndex(tab => tab.id === currentTab);
                        if (currentIndex < tabs.length - 1) {
                          setCurrentTab(tabs[currentIndex + 1].id);
                        }
                      }}
                    >
                      Tiếp theo →
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Đang tạo...</span>
                        </div>
                      ) : (
                        "Tạo người dùng"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
}
