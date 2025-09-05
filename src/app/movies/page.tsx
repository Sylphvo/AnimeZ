// src/app/movies/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Type definitions
interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year: number;
  genre: string[];
  quality: 'HD' | '4K' | 'CAM' | 'TS' | 'FULL HD';
  isNew?: boolean;
  views?: string;
  episode?: string;
}

interface Banner {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
  logo?: string;
  year: number;
  genre: string[];
  rating: number;
}

interface MovieSection {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
}

const MoviesPage = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');

  // Featured banner
  const featuredBanner: Banner = {
    id: 1,
    title: "DUTY",
    description: "Một bộ phim hành động kịch tính về nhiệm vụ bảo vệ đất nước. Những pha hành động mãn nhãn và cốt truyện gay cấn sẽ mang đến trải nghiệm điện ảnh đầy thú vị.",
    backgroundImage: "/assets/banners/1920x600.png",
    year: 2024,
    genre: ["Hành động", "Chiến tranh", "Drama"],
    rating: 8.5
  };

  // Genre filter options
  const genres = [
    'Tất cả', 'Hành động', 'Kinh dị', 'Hài hước', 'Tình cảm', 
    'Sci-Fi', 'Anime', 'Chiến tranh', 'Tài liệu', 'Gia đình'
  ];

  // Movie sections data
  const movieSections: MovieSection[] = [
    {
      title: "PHIM MỚI CẬP NHẬT",
      movies: [
        { id: 1, title: "Spider-Man: No Way Home", poster: "/assets/card/200x300.png", rating: 9.2, year: 2023, genre: ["Hành động"], quality: "4K", isNew: true, views: "2.1M" },
        { id: 2, title: "The Batman", poster: "/assets/card/200x300.png", rating: 8.8, year: 2023, genre: ["Hành động"], quality: "HD", views: "1.8M" },
        { id: 3, title: "Doctor Strange 2", poster: "/assets/card/200x300.png", rating: 8.5, year: 2023, genre: ["Siêu anh hùng"], quality: "4K", isNew: true, views: "1.5M" },
        { id: 4, title: "Top Gun: Maverick", poster: "/assets/card/200x300.png", rating: 9.0, year: 2023, genre: ["Hành động"], quality: "HD", views: "2.3M" },
        { id: 5, title: "Avatar 2", poster: "/assets/card/200x300.png", rating: 8.9, year: 2023, genre: ["Sci-Fi"], quality: "4K", isNew: true, views: "3.2M" },
        { id: 6, title: "Black Panther 2", poster: "/assets/card/200x300.png", rating: 8.3, year: 2023, genre: ["Hành động"], quality: "HD", views: "1.9M" }
      ]
    },
    {
      title: "TÂNG THƯỞNG 3 THÁNG",
      movies: [
        { id: 7, title: "Demon Slayer", poster: "/assets/card/200x300.png", rating: 9.1, year: 2023, genre: ["Anime"], quality: "HD", episode: "Tập 12", views: "5.2M" },
        { id: 8, title: "Attack on Titan", poster: "/assets/card/200x300.png", rating: 9.3, year: 2023, genre: ["Anime"], quality: "FULL HD", episode: "Tập 24", views: "6.1M" },
        { id: 9, title: "One Piece", poster: "/assets/card/200x300.png", rating: 9.5, year: 2023, genre: ["Anime"], quality: "HD", episode: "Tập 1050", views: "10.5M" },
        { id: 10, title: "Jujutsu Kaisen", poster: "/assets/card/200x300.png", rating: 8.9, year: 2023, genre: ["Anime"], quality: "HD", episode: "Tập 18", views: "4.8M" },
        { id: 11, title: "Chainsaw Man", poster: "/assets/card/200x300.png", rating: 8.7, year: 2023, genre: ["Anime"], quality: "4K", episode: "Tập 12", views: "3.9M" },
        { id: 12, title: "My Hero Academia", poster: "/assets/card/200x300.png", rating: 8.8, year: 2023, genre: ["Anime"], quality: "HD", episode: "Tập 25", views: "4.2M" }
      ]
    },
    {
      title: "PHIM BỘ MỚI",
      movies: [
        { id: 13, title: "The Crown Season 6", poster: "/assets/card/200x300.png", rating: 8.6, year: 2023, genre: ["Drama"], quality: "4K", episode: "Tập 10", views: "2.8M" },
        { id: 14, title: "Wednesday", poster: "/assets/card/200x300.png", rating: 8.4, year: 2023, genre: ["Kinh dị"], quality: "HD", episode: "Tập 8", views: "7.3M" },
        { id: 15, title: "Stranger Things 5", poster: "/assets/card/200x300.png", rating: 9.2, year: 2023, genre: ["Kinh dị"], quality: "4K", episode: "Tập 9", views: "8.9M" },
        { id: 16, title: "House of Dragon", poster: "/assets/card/200x300.png", rating: 8.8, year: 2023, genre: ["Fantasy"], quality: "4K", episode: "Tập 10", views: "6.7M" },
        { id: 17, title: "The Bear Season 3", poster: "/assets/card/200x300.png", rating: 9.0, year: 2023, genre: ["Comedy"], quality: "HD", episode: "Tập 12", views: "3.4M" },
        { id: 18, title: "Succession", poster: "/assets/card/200x300.png", rating: 9.1, year: 2023, genre: ["Drama"], quality: "4K", episode: "Tập 10", views: "4.1M" }
      ]
    },
    {
      title: "PHIM KINH DỊ",
      movies: [
        { id: 19, title: "Scream 6", poster: "/assets/card/200x300.png", rating: 7.8, year: 2023, genre: ["Kinh dị"], quality: "HD", views: "2.2M" },
        { id: 20, title: "Evil Dead Rise", poster: "/assets/card/200x300.png", rating: 8.1, year: 2023, genre: ["Kinh dị"], quality: "4K", views: "1.9M" },
        { id: 21, title: "M3GAN", poster: "/assets/card/200x300.png", rating: 7.5, year: 2023, genre: ["Kinh dị"], quality: "HD", views: "3.1M" },
        { id: 22, title: "The Nun 2", poster: "/assets/card/200x300.png", rating: 7.3, year: 2023, genre: ["Kinh dị"], quality: "HD", views: "2.8M" },
        { id: 23, title: "Insidious 5", poster: "/assets/card/200x300.png", rating: 7.6, year: 2023, genre: ["Kinh dị"], quality: "4K", views: "2.4M" },
        { id: 24, title: "The Conjuring 4", poster: "/assets/card/200x300.png", rating: 8.2, year: 2023, genre: ["Kinh dị"], quality: "HD", views: "3.6M" }
      ]
    },
    {
      title: "PHIM HÀNH ĐỘNG",
      movies: [
        { id: 25, title: "John Wick 4", poster: "/assets/card/200x300.png", rating: 8.9, year: 2023, genre: ["Hành động"], quality: "4K", views: "4.8M" },
        { id: 26, title: "Fast X", poster: "/assets/card/200x300.png", rating: 8.2, year: 2023, genre: ["Hành động"], quality: "HD", views: "5.2M" },
        { id: 27, title: "Mission Impossible 7", poster: "/assets/card/200x300.png", rating: 8.7, year: 2023, genre: ["Hành động"], quality: "4K", views: "3.9M" },
        { id: 28, title: "Transformers 7", poster: "/assets/card/200x300.png", rating: 7.8, year: 2023, genre: ["Hành động"], quality: "4K", views: "4.1M" },
        { id: 29, title: "Indiana Jones 5", poster: "/assets/card/200x300.png", rating: 8.0, year: 2023, genre: ["Hành động"], quality: "HD", views: "3.3M" },
        { id: 30, title: "Expendables 4", poster: "/assets/card/200x300.png", rating: 7.5, year: 2023, genre: ["Hành động"], quality: "HD", views: "2.7M" }
      ]
    },
    {
      title: "PHIM SCI-FI",
      movies: [
        { id: 31, title: "Dune: Part Two", poster: "/assets/card/200x300.png", rating: 9.1, year: 2024, genre: ["Sci-Fi"], quality: "4K", views: "6.2M" },
        { id: 32, title: "Blade Runner 2099", poster: "/assets/card/200x300.png", rating: 8.8, year: 2023, genre: ["Sci-Fi"], quality: "4K", views: "3.8M" },
        { id: 33, title: "Matrix Resurrections", poster: "/assets/card/200x300.png", rating: 8.1, year: 2023, genre: ["Sci-Fi"], quality: "HD", views: "4.5M" },
        { id: 34, title: "Tenet 2", poster: "/assets/card/200x300.png", rating: 8.4, year: 2023, genre: ["Sci-Fi"], quality: "4K", views: "3.2M" },
        { id: 35, title: "Interstellar 2", poster: "/assets/card/200x300.png", rating: 9.0, year: 2023, genre: ["Sci-Fi"], quality: "4K", views: "5.1M" },
        { id: 36, title: "Ex Machina 2", poster: "/assets/card/200x300.png", rating: 8.6, year: 2023, genre: ["Sci-Fi"], quality: "HD", views: "2.9M" }
      ]
    }
  ];

  // Auto-rotate banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 1); // Only 1 banner for now
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case '4K': return 'bg-purple-600';
      case 'FULL HD': return 'bg-blue-600';
      case 'HD': return 'bg-green-600';
      case 'CAM': return 'bg-orange-600';
      case 'TS': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-red-500">
              ANIMEZ
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="hover:text-red-400 transition-colors">Trang chủ</Link>
              <Link href="/movies" className="text-red-400">Phim</Link>
              <Link href="/tv-shows" className="hover:text-red-400 transition-colors">Phim bộ</Link>
              <Link href="/anime" className="hover:text-red-400 transition-colors">Anime</Link>
              <Link href="/cinema" className="hover:text-red-400 transition-colors">Rạp phim</Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="hover:text-red-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="hover:text-red-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={featuredBanner.backgroundImage}
            alt={featuredBanner.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">{featuredBanner.title}</h1>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                {[1,2,3,4,5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${star <= featuredBanner.rating / 2 ? 'text-yellow-400' : 'text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>{featuredBanner.year}</span>
              <div className="flex gap-2">
                {featuredBanner.genre.slice(0, 2).map((g) => (
                  <span key={g} className="bg-red-600/20 border border-red-500/30 px-2 py-1 rounded text-xs">{g}</span>
                ))}
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-xl">
              {featuredBanner.description}
            </p>
            
            <div className="flex space-x-4">
              <Link 
                href={`/watch/${featuredBanner.id}`}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                XEM NGAY
              </Link>
              <Link
                href={`/movies/${featuredBanner.id}`}
                className="bg-white/10 hover:bg-white/20 backdrop-blur px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                CHI TIẾT
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedGenre === genre
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Sections */}
      <div className="container mx-auto px-4 pb-12">
        {movieSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              {section.viewAllLink && (
                <Link href={section.viewAllLink} className="text-red-400 hover:text-red-300 text-sm">
                  Xem tất cả →
                </Link>
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {section.movies.map((movie) => (
                <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Quality Badge */}
                    <div className={`absolute top-2 left-2 ${getQualityColor(movie.quality)} px-2 py-1 rounded text-xs font-bold`}>
                      {movie.quality}
                    </div>
                    
                    {/* New Badge */}
                    {movie.isNew && (
                      <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-xs font-bold">
                        MỚI
                      </div>
                    )}
                    
                    {/* Episode Badge */}
                    {movie.episode && (
                      <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs">
                        {movie.episode}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-red-400 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{movie.year}</span>
                      {movie.views && <span>{movie.views} views</span>}
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs text-gray-400">{movie.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Banner */}
      <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">XEM PHIM MIỄN PHÍ</h3>
            <p className="text-gray-300 mb-6">Hàng ngàn bộ phim chất lượng cao đang chờ bạn khám phá</p>
            <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              KHÁM PHÁ NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;