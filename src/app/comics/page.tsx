'use client';
import React, { useState } from 'react';
import { Star, Eye, BookOpen, Calendar, Tag, User, Search, Bell, Menu
 } from 'lucide-react';
import Image from 'next/image';

interface Comic {
  id: string;
  title: string;
  image: string;
  rating: number;
  views: string;
  status: 'ongoing' | 'completed';
  chapter?: string;
  genre: string[];
  author?: string;
  year?: number;
  description?: string;
}

const ComicPage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  console.log(selectedGenre);
  // Mock data for comics
  const featuredComics: Comic[] = [
    {
      id: '1',
      title: 'Naruto',
      image: '/assets/card/300x400.png',
      rating: 4.8,
      views: '1.2M',
      status: 'completed',
      chapter: 'Chapter 700',
      genre: ['Action', 'Adventure', 'Shounen'],
      author: 'Masashi Kishimoto',
      year: 2014
    },
    {
      id: '2',
      title: 'One Piece',
      image: '/assets/card/300x400.png',
      rating: 4.9,
      views: '2.1M',
      status: 'ongoing',
      chapter: 'Chapter 1098',
      genre: ['Action', 'Adventure', 'Comedy'],
      author: 'Eiichiro Oda',
      year: 1997
    },
    {
      id: '3',
      title: 'Demon Slayer',
      image: '/assets/card/300x400.png',
      rating: 4.7,
      views: '980K',
      status: 'completed',
      chapter: 'Chapter 205',
      genre: ['Action', 'Supernatural', 'Historical'],
      author: 'Koyoharu Gotouge',
      year: 2020
    }
  ];

  const topComics: Comic[] = [
    {
      id: '4',
      title: 'Attack on Titan',
      image: '/assets/card/200x280.png',
      rating: 4.6,
      views: '1.5M',
      status: 'completed',
      genre: ['Action', 'Drama', 'Fantasy']
    },
    {
      id: '5',
      title: 'My Hero Academia',
      image: '/assets/card/200x280.png',
      rating: 4.5,
      views: '890K',
      status: 'ongoing',
      genre: ['Action', 'School', 'Shounen']
    },
    {
      id: '6',
      title: 'Tokyo Ghoul',
      image: '/assets/card/200x280.png',
      rating: 4.4,
      views: '750K',
      status: 'completed',
      genre: ['Action', 'Horror', 'Supernatural']
    },
    {
      id: '7',
      title: 'Death Note',
      image: '/assets/card/200x280.png',
      rating: 4.8,
      views: '1.1M',
      status: 'completed',
      genre: ['Psychological', 'Thriller', 'Supernatural']
    }
  ];

  const newComics: Comic[] = [
    {
      id: '8',
      title: 'Chainsaw Man',
      image: '/assets/card/180x240.png',
      rating: 4.3,
      views: '560K',
      status: 'ongoing',
      genre: ['Action', 'Horror', 'Shounen']
    },
    {
      id: '9',
      title: 'Jujutsu Kaisen',
      image: '/assets/card/180x240.png',
      rating: 4.6,
      views: '780K',
      status: 'ongoing',
      genre: ['Action', 'School', 'Supernatural']
    },
    {
      id: '10',
      title: 'Spy x Family',
      image: '/assets/card/180x240.png',
      rating: 4.7,
      views: '650K',
      status: 'ongoing',
      genre: ['Comedy', 'Action', 'Family']
    },
    {
      id: '11',
      title: 'Black Clover',
      image: '/assets/card/180x240.png',
      rating: 4.2,
      views: '420K',
      status: 'ongoing',
      genre: ['Action', 'Magic', 'Shounen']
    },
    {
      id: '12',
      title: 'Dr. Stone',
      image: '/assets/card/180x240.png',
      rating: 4.4,
      views: '380K',
      status: 'completed',
      genre: ['Adventure', 'Comedy', 'Sci-Fi']
    },
    {
      id: '13',
      title: 'Mob Psycho 100',
      image: '/assets/card/180x240.png',
      rating: 4.5,
      views: '310K',
      status: 'completed',
      genre: ['Action', 'Comedy', 'Supernatural']
    }
  ];

  const genres = [
    { name: 'Action', count: 1234, color: 'bg-blue-500' },
    { name: 'Romance', count: 987, color: 'bg-pink-500' },
    { name: 'Comedy', count: 876, color: 'bg-green-500' },
    { name: 'Fantasy', count: 654, color: 'bg-purple-500' }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}</span>
      </div>
    );
  };

  const ComicCard: React.FC<{ comic: Comic; size?: 'small' | 'medium' | 'large' }> = ({ 
    comic, 
    size = 'medium' 
  }) => {
    const sizeClasses = {
      small: 'w-36',
      medium: 'w-48',
      large: 'w-64'
    };

    return (
      <div className={`${sizeClasses[size]} bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group`}>
        <div className="relative">
          <Image
            src={comic.image}
            alt={comic.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 text-xs rounded-full text-white ${
              comic.status === 'ongoing' ? 'bg-green-500' : 'bg-blue-500'
            }`}>
              {comic.status === 'ongoing' ? 'Đang cập nhật' : 'Hoàn thành'}
            </span>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            {comic.chapter && (
              <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {comic.chapter}
              </span>
            )}
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {comic.title}
          </h3>
          
          {renderStars(comic.rating)}
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              <span>{comic.views}</span>
            </div>
            {comic.author && (
              <div className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                <span className="truncate">{comic.author}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {comic.genre.slice(0, 2).map((g, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  NetTruyen
                </span>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Trang chủ</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Hot nhất</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Thể loại</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Tìm kiếm</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Tìm truyện..."
                  className="bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              <Bell className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Đăng nhập
              </button>
              <Menu className="w-6 h-6 text-gray-300 md:hidden" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-blue-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Khám phá thế giới
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Truyện tranh</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Đọc miễn phí hàng ngàn bộ truyện tranh, manga, manhwa được cập nhật liên tục
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredComics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} size="large" />
            ))}
          </div>
        </div>
      </section>

      {/* Top Comics Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Star className="w-8 h-8 text-yellow-400 mr-3" />
              Top truyện hàng đầu
            </h2>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors">
              Xem tất cả
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topComics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>
        </div>
      </section>

      {/* Genre Tags */}
      <section className="py-12 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Tag className="w-8 h-8 text-green-400 mr-3" />
            Thể loại nổi bật
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {genres.map((genre, idx) => (
              <div
                key={idx}
                className={`${genre.color} rounded-lg p-6 text-white cursor-pointer hover:scale-105 transition-transform duration-300`}
                onClick={() => setSelectedGenre(genre.name)}
              >
                <div className="text-2xl font-bold mb-2">{genre.count}</div>
                <div className="text-lg">{genre.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Comics Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Calendar className="w-8 h-8 text-purple-400 mr-3" />
              Truyện mới cập nhật
            </h2>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors">
              Xem tất cả
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {newComics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} size="small" />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold text-white">NetTruyen</span>
              </div>
              <p className="text-gray-400 text-sm">
                Nền tảng đọc truyện tranh trực tuyến hàng đầu Việt Nam
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Danh mục</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Truyện hot</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Truyện mới</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Truyện hoàn thành</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Thể loại</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Action</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Romance</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Comedy</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Email: support@nettruyen.vn</p>
                <p>Hotline: 1900-xxxx</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 NetTruyen. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComicPage;