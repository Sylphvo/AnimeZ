'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface UserFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Account Information
  username: string
  password: string
  confirmPassword: string
  role: string
  status: string
  
  // Work Information
  company: string
  position: string
  department: string
  employeeId: string
  hireDate: string
  salary: string
  workSchedule: string
  
  // Physical Attributes
  height: string
  weight: string
  eyeColor: string
  hairColor: string
  bloodType: string
  allergies: string[]
  medicalConditions: string
  
  // Meal Preferences
  dietaryRestrictions: string[]
  favoriteFoods: string[]
  dislikedFoods: string[]
  mealPreferences: string
  
  // Banking Information
  bankName: string
  accountNumber: string
  routingNumber: string
  accountType: string
  
  // Skills
  languages: string[]
  technicalSkills: string[]
  softSkills: string[]
  certifications: string[]
  
  // Settings
  notifications: boolean
  twoFactorAuth: boolean
  privacySettings: string
  theme: string
}

export default function CreateUserPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('personal')
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
    status: '',
    company: '',
    position: '',
    department: '',
    employeeId: '',
    hireDate: '',
    salary: '',
    workSchedule: '',
    height: '',
    weight: '',
    eyeColor: '',
    hairColor: '',
    bloodType: '',
    allergies: [],
    medicalConditions: '',
    dietaryRestrictions: [],
    favoriteFoods: [],
    dislikedFoods: [],
    mealPreferences: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: '',
    languages: [],
    technicalSkills: [],
    softSkills: [],
    certifications: [],
    notifications: false,
    twoFactorAuth: false,
    privacySettings: 'public',
    theme: 'light'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleArrayChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[name as keyof UserFormData] as string[]
      if (checked) {
        return { ...prev, [name]: [...currentArray, value] }
      } else {
        return { ...prev, [name]: currentArray.filter(item => item !== value) }
      }
    })
  }

  const validateForm = (): boolean => {
    // Basic validation - check required fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error('Please fill in all required fields')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      // Simulate API call
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('User created successfully!')
        router.push('/users')
      } else {
        toast.error('Failed to create user')
      }
    } catch (error) {
       console.error(error); // now it's used
      //toast.error('An error occurred while creating the user')
    }
  }

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Kosher', 'Halal']
  const languageOptions = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean']
  const skillOptions = ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'AWS']

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New User</CardTitle>
          <CardDescription>
            Fill out the form below to create a new user account. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-8 mb-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="physical">Physical</TabsTrigger>
                <TabsTrigger value="meal">Meal</TabsTrigger>
                <TabsTrigger value="banking">Banking</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => handleSelectChange('gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Account Information Tab */}
              <TabsContent value="account">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => handleSelectChange('role', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="moderator">Moderator</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Work Information Tab */}
              <TabsContent value="work">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hireDate">Hire Date</Label>
                    <Input
                      id="hireDate"
                      name="hireDate"
                      type="date"
                      value={formData.hireDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input
                      id="salary"
                      name="salary"
                      type="number"
                      value={formData.salary}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workSchedule">Work Schedule</Label>
                    <Select
                      value={formData.workSchedule}
                      onValueChange={(value) => handleSelectChange('workSchedule', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Physical Attributes Tab */}
              <TabsContent value="physical">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eyeColor">Eye Color</Label>
                    <Input
                      id="eyeColor"
                      name="eyeColor"
                      value={formData.eyeColor}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hairColor">Hair Color</Label>
                    <Input
                      id="hairColor"
                      name="hairColor"
                      value={formData.hairColor}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select
                      value={formData.bloodType}
                      onValueChange={(value) => handleSelectChange('bloodType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Allergies</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Peanuts', 'Shellfish', 'Dairy', 'Gluten', 'Eggs', 'Soy'].map(allergy => (
                        <div key={allergy} className="flex items-center space-x-2">
                          <Checkbox
                            id={`allergy-${allergy}`}
                            checked={formData.allergies.includes(allergy)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('allergies', allergy, checked as boolean)
                            }
                          />
                          <label htmlFor={`allergy-${allergy}`} className="text-sm">
                            {allergy}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Meal Preferences Tab */}
              <TabsContent value="meal">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Dietary Restrictions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {dietaryOptions.map(option => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`dietary-${option}`}
                            checked={formData.dietaryRestrictions.includes(option)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('dietaryRestrictions', option, checked as boolean)
                            }
                          />
                          <label htmlFor={`dietary-${option}`} className="text-sm">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Favorite Foods</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Pizza', 'Pasta', 'Sushi', 'Burger', 'Salad', 'Steak'].map(food => (
                        <div key={food} className="flex items-center space-x-2">
                          <Checkbox
                            id={`favorite-${food}`}
                            checked={formData.favoriteFoods.includes(food)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('favoriteFoods', food, checked as boolean)
                            }
                          />
                          <label htmlFor={`favorite-${food}`} className="text-sm">
                            {food}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Disliked Foods</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Broccoli', 'Olives', 'Mushrooms', 'Liver', 'Anchovies', 'Blue Cheese'].map(food => (
                        <div key={food} className="flex items-center space-x-2">
                          <Checkbox
                            id={`disliked-${food}`}
                            checked={formData.dislikedFoods.includes(food)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('dislikedFoods', food, checked as boolean)
                            }
                          />
                          <label htmlFor={`disliked-${food}`} className="text-sm">
                            {food}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="mealPreferences">Meal Preferences</Label>
                    <Textarea
                      id="mealPreferences"
                      name="mealPreferences"
                      value={formData.mealPreferences}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Any specific meal preferences or requirements..."
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Banking Information Tab */}
              <TabsContent value="banking">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input
                      id="routingNumber"
                      name="routingNumber"
                      value={formData.routingNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select
                      value={formData.accountType}
                      onValueChange={(value) => handleSelectChange('accountType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="joint">Joint</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Languages</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {languageOptions.map(language => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={`language-${language}`}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('languages', language, checked as boolean)
                            }
                          />
                          <label htmlFor={`language-${language}`} className="text-sm">
                            {language}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Technical Skills</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {skillOptions.map(skill => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tech-${skill}`}
                            checked={formData.technicalSkills.includes(skill)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('technicalSkills', skill, checked as boolean)
                            }
                          />
                          <label htmlFor={`tech-${skill}`} className="text-sm">
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Soft Skills</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Communication', 'Leadership', 'Teamwork', 'Problem Solving', 'Time Management', 'Creativity'].map(skill => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`soft-${skill}`}
                            checked={formData.softSkills.includes(skill)}
                            onCheckedChange={(checked) => 
                              handleArrayChange('softSkills', skill, checked as boolean)
                            }
                          />
                          <label htmlFor={`soft-${skill}`} className="text-sm">
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="certifications">Certifications</Label>
                    <Textarea
                      id="certifications"
                      name="certifications"
                      value={formData.certifications.join(', ')}
                      onChange={(e) => {
                        const certs = e.target.value.split(',').map(c => c.trim()).filter(c => c)
                        setFormData(prev => ({ ...prev, certifications: certs }))
                      }}
                      rows={3}
                      placeholder="Enter certifications separated by commas"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notifications"
                        checked={formData.notifications}
                        onCheckedChange={(checked) => handleCheckboxChange('notifications', checked as boolean)}
                      />
                      <label htmlFor="notifications" className="text-sm">
                        Enable Notifications
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="twoFactorAuth"
                        checked={formData.twoFactorAuth}
                        onCheckedChange={(checked) => handleCheckboxChange('twoFactorAuth', checked as boolean)}
                      />
                      <label htmlFor="twoFactorAuth" className="text-sm">
                        Enable Two-Factor Authentication
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="privacySettings">Privacy Settings</Label>
                    <Select
                      value={formData.privacySettings}
                      onValueChange={(value) => handleSelectChange('privacySettings', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select privacy level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends-only">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={formData.theme}
                      onValueChange={(value) => handleSelectChange('theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const tabs = ['personal', 'account', 'work', 'physical', 'meal', 'banking', 'skills', 'settings']
                    const currentIndex = tabs.indexOf(activeTab)
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1])
                    }
                  }}
                  disabled={activeTab === 'personal'}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const tabs = ['personal', 'account', 'work', 'physical', 'meal', 'banking', 'skills', 'settings']
                    const currentIndex = tabs.indexOf(activeTab)
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1])
                    }
                  }}
                  disabled={activeTab === 'settings'}
                >
                  Next
                </Button>
                <Button type="submit">Create User</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
