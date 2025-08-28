"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { UserFormData } from "@/lib/types";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [banks, setBanks] = useState([{ name: "", accountNumber: "", branch: "" }]);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserFormData>();

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addBank = () => {
    setBanks([...banks, { name: "", accountNumber: "", branch: "" }]);
  };

  const removeBank = (index: number) => {
    setBanks(banks.filter((_, i) => i !== index));
  };

  const updateBank = (index: number, field: string, value: string) => {
    const updatedBanks = banks.map((bank, i) => 
      i === index ? { ...bank, [field]: value } : bank
    );
    setBanks(updatedBanks);
  };

  const onSubmit = (data: UserFormData) => {
    console.log("Form submitted:", { ...data, skills, banks });
    alert("Thông tin người dùng đã được lưu thành công!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TailAdmin</h1>
          <p className="text-gray-600">Biểu mẫu tạo người dùng toàn diện</p>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Thêm người dùng mới</CardTitle>
            <p className="text-center text-gray-600">Điền đầy đủ thông tin để tạo tài khoản người dùng</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-8">
                  <TabsTrigger value="basic">Cơ bản</TabsTrigger>
                  <TabsTrigger value="contact">Liên hệ</TabsTrigger>
                  <TabsTrigger value="work">Công việc</TabsTrigger>
                  <TabsTrigger value="physical">Thể chất</TabsTrigger>
                  <TabsTrigger value="meals">Bữa ăn</TabsTrigger>
                  <TabsTrigger value="banks">Ngân hàng</TabsTrigger>
                  <TabsTrigger value="skills">Kỹ năng</TabsTrigger>
                  <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                </TabsList>

                {/* Tab 1: Basic Information */}
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ tên đầy đủ *</Label>
                      <Input
                        id="fullName"
                        {...register("fullName", { required: "Họ tên là bắt buộc" })}
                        placeholder="Nhập họ tên đầy đủ"
                      />
                      {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Tên đăng nhập *</Label>
                      <Input
                        id="username"
                        {...register("username", { required: "Tên đăng nhập là bắt buộc" })}
                        placeholder="Nhập tên đăng nhập"
                      />
                      {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Giới tính *</Label>
                      <Select onValueChange={(value) => setValue("gender", value as "male" | "female" | "other")}>
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
                        {...register("dateOfBirth", { required: "Ngày sinh là bắt buộc" })}
                      />
                      {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Mật khẩu *</Label>
                      <Input
                        id="password"
                        type="password"
                        {...register("password", { 
                          required: "Mật khẩu là bắt buộc",
                          minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" }
                        })}
                        placeholder="Nhập mật khẩu"
                      />
                      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 2: Contact Information */}
                <TabsContent value="contact" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", { 
                          required: "Email là bắt buộc",
                          pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" }
                        })}
                        placeholder="Nhập địa chỉ email"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Số điện thoại *</Label>
                      <Input
                        id="phoneNumber"
                        {...register("phoneNumber", { required: "Số điện thoại là bắt buộc" })}
                        placeholder="Nhập số điện thoại"
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 3: Work Information */}
                <TabsContent value="work" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="profession">Nghề nghiệp</Label>
                      <Input
                        id="profession"
                        {...register("profession")}
                        placeholder="Nhập nghề nghiệp"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Công ty</Label>
                      <Input
                        id="company"
                        {...register("company")}
                        placeholder="Nhập tên công ty"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Chức vụ</Label>
                      <Input
                        id="position"
                        {...register("position")}
                        placeholder="Nhập chức vụ"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="walletBalance">Số dư ví</Label>
                      <Input
                        id="walletBalance"
                        type="number"
                        {...register("walletBalance")}
                        placeholder="Nhập số dư ví"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="walletCurrency">Loại tiền tệ</Label>
                      <Select onValueChange={(value) => setValue("walletCurrency", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại tiền tệ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VND">VND</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 4: Physical Information */}
                <TabsContent value="physical" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="height">Chiều cao (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="Nhập chiều cao"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Cân nặng (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Nhập cân nặng"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Nhóm máu</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn nhóm máu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="AB">AB</SelectItem>
                          <SelectItem value="O">O</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eyeColor">Màu mắt</Label>
                      <Input
                        id="eyeColor"
                        placeholder="Nhập màu mắt"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 5: Meal Preferences */}
                <TabsContent value="meals" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Sở thích ăn uống</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vegetarian" />
                          <Label htmlFor="vegetarian">Ăn chay</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="vegan" />
                          <Label htmlFor="vegan">Thuần chay</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="glutenFree" />
                          <Label htmlFor="glutenFree">Không gluten</Label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="dairyFree" />
                          <Label htmlFor="dairyFree">Không sữa</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="nutFree" />
                          <Label htmlFor="nutFree">Không hạt</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="halal" />
                          <Label htmlFor="halal">Halal</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Dị ứng thực phẩm</Label>
                      <Textarea
                        id="allergies"
                        placeholder="Mô tả các loại thực phẩm gây dị ứng..."
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Tab 6: Bank Information */}
                <TabsContent value="banks" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Thông tin ngân hàng</h3>
                      <Button type="button" onClick={addBank} variant="outline">
                        Thêm ngân hàng
                      </Button>
                    </div>

                    {banks.map((bank, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Tên ngân hàng</Label>
                            <Input
                              value={bank.name}
                              onChange={(e) => updateBank(index, 'name', e.target.value)}
                              placeholder="Nhập tên ngân hàng"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Số tài khoản</Label>
                            <Input
                              value={bank.accountNumber}
                              onChange={(e) => updateBank(index, 'accountNumber', e.target.value)}
                              placeholder="Nhập số tài khoản"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Chi nhánh</Label>
                            <div className="flex space-x-2">
                              <Input
                                value={bank.branch}
                                onChange={(e) => updateBank(index, 'branch', e.target.value)}
                                placeholder="Nhập chi nhánh"
                              />
                              {banks.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeBank(index)}
                                >
                                  Xóa
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Tab 7: Skills */}
                <TabsContent value="skills" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Kỹ năng</h3>
                    
                    <div className="flex space-x-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Nhập kỹ năng mới"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill}>Thêm</Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
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
                  </div>
                </TabsContent>

                {/* Tab 8: Settings */}
                <TabsContent value="settings" className="space-y-6">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Cài đặt cá nhân</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="language">Ngôn ngữ</Label>
                        <Select onValueChange={(value) => setValue("language", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn ngôn ngữ" />
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
                        <Select onValueChange={(value) => setValue("theme", value as "light" | "dark")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn giao diện" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Sáng</SelectItem>
                            <SelectItem value="dark">Tối</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="privacy">Quyền riêng tư</Label>
                        <Select onValueChange={(value) => setValue("privacy", value as "public" | "private")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn mức độ riêng tư" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Công khai</SelectItem>
                            <SelectItem value="private">Riêng tư</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="notifications"
                          onCheckedChange={(checked) => setValue("notifications", checked)}
                        />
                        <Label htmlFor="notifications">Nhận thông báo</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Navigation and Submit */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const tabs = ["basic", "contact", "work", "physical", "meals", "banks", "skills", "settings"];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
                  }}
                  disabled={activeTab === "basic"}
                >
                  Quay lại
                </Button>

                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const tabs = ["basic", "contact", "work", "physical", "meals", "banks", "skills", "settings"];
                      const currentIndex = tabs.indexOf(activeTab);
                      if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
                    }}
                    disabled={activeTab === "settings"}
                  >
                    Tiếp theo
                  </Button>

                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Lưu người dùng
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
