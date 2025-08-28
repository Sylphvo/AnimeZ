import { User } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    fullName: 'Nguyễn Văn An',
    gender: 'male',
    dateOfBirth: new Date('1990-05-15'),
    email: 'nguyen.van.an@email.com',
    phoneNumber: '+84 901 234 567',
    username: 'nguyenvanan',
    passwordHash: '$2b$10$...',
    accountCreatedDate: new Date('2023-01-15'),
    lastLoginDate: new Date('2024-01-10'),
    personalSettings: {
      language: 'vi',
      theme: 'light',
      notifications: true,
      privacy: 'public',
    },
    profession: 'Software Engineer',
    company: 'Tech Corp',
    position: 'Senior Developer',
    wallet: {
      banks: [
        {
          id: '1',
          bankName: 'Vietcombank',
          accountNumber: '1234567890',
          balance: 1000000,
          currency: 'VND',
          isDefault: true,
        },
        {
          id: '2',
          bankName: 'Techcombank',
          accountNumber: '0987654321',
          balance: 500000,
          currency: 'VND',
          isDefault: false,
        }
      ],
      mainWallet: {
        balance: 1200000,
        currency: 'VND',
      },
      temporaryWallet: {
        balance: 300000,
        currency: 'VND',
      },
      totalBalance: 1500000,
      currency: 'VND',
    },
    physicalInfo: {
      weight: 70,
      height: 175,
    },
    mealPreferences: {
      breakfast: 'Phở, bánh mì',
      lunch: 'Cơm văn phòng',
      afternoon: 'Trà, bánh kẹo',
      dinner: 'Cơm gia đình',
    },
    healthStats: {
      bmi: 22.9,
      bloodPressure: {
        systolic: 120,
        diastolic: 80,
      },
      heartRate: 72,
      lastCheckup: new Date('2024-01-01'),
      healthScore: 85,
    },
    attendance: [
      {
        date: new Date('2024-01-10'),
        checkInTime: new Date('2024-01-10T08:00:00'),
        checkOutTime: new Date('2024-01-10T17:30:00'),
        status: 'present',
      },
      {
        date: new Date('2024-01-09'),
        checkInTime: new Date('2024-01-09T08:15:00'),
        checkOutTime: new Date('2024-01-09T17:30:00'),
        status: 'late',
      },
    ],
    tasks: [
      {
        id: 'task1',
        title: 'Hoàn thành báo cáo tháng',
        description: 'Tổng hợp và phân tích dữ liệu tháng 12',
        dueDate: new Date('2024-01-15'),
        priority: 'high',
        status: 'in-progress',
        category: 'Công việc',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
    other: 'Thích đọc sách công nghệ, chơi game',
    status: 'active',
  },
  {
    id: '2',
    fullName: 'Trần Thị Bình',
    gender: 'female',
    dateOfBirth: new Date('1988-08-22'),
    email: 'tran.thi.binh@email.com',
    phoneNumber: '+84 902 345 678',
    username: 'tranthibinh',
    passwordHash: '$2b$10$...',
    accountCreatedDate: new Date('2023-02-20'),
    lastLoginDate: new Date('2024-01-09'),
    personalSettings: {
      language: 'vi',
      theme: 'dark',
      notifications: false,
      privacy: 'private',
    },
    profession: 'Product Manager',
    company: 'Innovation Ltd',
    position: 'Senior PM',
    wallet: {
      banks: [
        {
          id: '3',
          bankName: 'BIDV',
          accountNumber: '2345678901',
          balance: 1500000,
          currency: 'VND',
          isDefault: true,
        },
        {
          id: '4',
          bankName: 'ACB',
          accountNumber: '3456789012',
          balance: 800000,
          currency: 'VND',
          isDefault: false,
        }
      ],
      mainWallet: {
        balance: 1800000,
        currency: 'VND',
      },
      temporaryWallet: {
        balance: 500000,
        currency: 'VND',
      },
      totalBalance: 2300000,
      currency: 'VND',
    },
    physicalInfo: {
      weight: 55,
      height: 165,
    },
    mealPreferences: {
      breakfast: 'Bánh cuốn, cà phê',
      lunch: 'Salad, nước ép',
      afternoon: 'Trái cây',
      dinner: 'Cơm chay',
    },
    healthStats: {
      bmi: 20.2,
      bloodPressure: {
        systolic: 110,
        diastolic: 70,
      },
      heartRate: 68,
      lastCheckup: new Date('2023-12-15'),
      healthScore: 92,
    },
    attendance: [
      {
        date: new Date('2024-01-09'),
        checkInTime: new Date('2024-01-09T08:30:00'),
        checkOutTime: new Date('2024-01-09T18:00:00'),
        status: 'present',
      },
    ],
    tasks: [
      {
        id: 'task2',
        title: 'Lập kế hoạch sản phẩm Q1',
        description: 'Xây dựng roadmap cho quý 1 năm 2024',
        dueDate: new Date('2024-01-20'),
        priority: 'medium',
        status: 'pending',
        category: 'Kế hoạch',
      },
    ],
    skills: ['Product Management', 'Agile', 'Scrum', 'Analytics'],
    other: 'Yêu thích yoga và thiền',
    status: 'active',
  },
  {
    id: '3',
    fullName: 'Lê Minh Cường',
    gender: 'male',
    dateOfBirth: new Date('1992-12-03'),
    email: 'le.minh.cuong@email.com',
    phoneNumber: '+84 903 456 789',
    username: 'leminhcuong',
    passwordHash: '$2b$10$...',
    accountCreatedDate: new Date('2023-03-10'),
    lastLoginDate: new Date('2024-01-08'),
    personalSettings: {
      language: 'en',
      theme: 'light',
      notifications: true,
      privacy: 'public',
    },
    profession: 'UX Designer',
    company: 'Design Studio',
    position: 'Lead Designer',
    wallet: {
      banks: [
        {
          id: '5',
          bankName: 'VPBank',
          accountNumber: '4567890123',
          balance: 1800000,
          currency: 'VND',
          isDefault: true,
        }
      ],
      mainWallet: {
        balance: 1500000,
        currency: 'VND',
      },
      temporaryWallet: {
        balance: 300000,
        currency: 'VND',
      },
      totalBalance: 1800000,
      currency: 'VND',
    },
    physicalInfo: {
      weight: 68,
      height: 172,
    },
    mealPreferences: {
      breakfast: 'Sandwich, coffee',
      lunch: 'Pasta, salad',
      afternoon: 'Tea, cookies',
      dinner: 'Vietnamese food',
    },
    healthStats: {
      bmi: 23.0,
      bloodPressure: {
        systolic: 125,
        diastolic: 82,
      },
      heartRate: 75,
      lastCheckup: new Date('2023-11-20'),
      healthScore: 78,
    },
    attendance: [
      {
        date: new Date('2024-01-08'),
        checkInTime: new Date('2024-01-08T09:00:00'),
        checkOutTime: new Date('2024-01-08T18:30:00'),
        status: 'present',
      },
    ],
    tasks: [
      {
        id: 'task3',
        title: 'Thiết kế giao diện mobile app',
        description: 'Hoàn thiện wireframe và mockup',
        dueDate: new Date('2024-01-25'),
        priority: 'high',
        status: 'completed',
        category: 'Thiết kế',
      },
    ],
    skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping'],
    other: 'Passionate about minimalist design',
    status: 'active',
  },
];

export const getUserStats = () => {
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(user => user.status === 'active').length;
  const inactiveUsers = mockUsers.filter(user => user.status === 'inactive').length;
  const suspendedUsers = mockUsers.filter(user => user.status === 'suspended').length;
  
  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    suspendedUsers,
    growthRate: '+12.5%',
  };
};

export const getWalletStats = () => {
  const totalMainWallet = mockUsers.reduce((sum, user) => sum + user.wallet.mainWallet.balance, 0);
  const totalTempWallet = mockUsers.reduce((sum, user) => sum + user.wallet.temporaryWallet.balance, 0);
  const totalBalance = totalMainWallet + totalTempWallet;
  
  return {
    totalMainWallet,
    totalTempWallet,
    totalBalance,
    averageBalance: totalBalance / mockUsers.length,
  };
};

export const getHealthStats = () => {
  const avgBMI = mockUsers.reduce((sum, user) => sum + user.healthStats.bmi, 0) / mockUsers.length;
  const avgHealthScore = mockUsers.reduce((sum, user) => sum + user.healthStats.healthScore, 0) / mockUsers.length;
  const healthyUsers = mockUsers.filter(user => user.healthStats.healthScore >= 80).length;
  
  return {
    avgBMI: Math.round(avgBMI * 10) / 10,
    avgHealthScore: Math.round(avgHealthScore),
    healthyUsers,
    healthyPercentage: Math.round((healthyUsers / mockUsers.length) * 100),
  };
};

export const getAttendanceStats = () => {
  const today = new Date();
  const todayAttendance = mockUsers.filter(user => 
    user.attendance.some(record => 
      record.date.toDateString() === today.toDateString() && record.status === 'present'
    )
  ).length;
  
  const lateToday = mockUsers.filter(user => 
    user.attendance.some(record => 
      record.date.toDateString() === today.toDateString() && record.status === 'late'
    )
  ).length;
  
  return {
    presentToday: todayAttendance,
    lateToday,
    absentToday: mockUsers.length - todayAttendance - lateToday,
    attendanceRate: Math.round((todayAttendance / mockUsers.length) * 100),
  };
};

export const getTaskStats = () => {
  const allTasks = mockUsers.flatMap(user => user.tasks);
  const completedTasks = allTasks.filter(task => task.status === 'completed').length;
  const pendingTasks = allTasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = allTasks.filter(task => task.status === 'in-progress').length;
  
  return {
    totalTasks: allTasks.length,
    completedTasks,
    pendingTasks,
    inProgressTasks,
    completionRate: Math.round((completedTasks / allTasks.length) * 100),
  };
};
