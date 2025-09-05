"use client"
// pages/movies/[id].tsx hoặc app/movies/[id]/page.tsx (tùy thuộc vào version Next.js)
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
//import { useParams } from 'next/navigation';


// Type definitions
interface CastMember {
  name: string;
  character: string;
  avatar: string;
}

interface Trailer {
  id: number;
  title: string;
  thumbnail: string;
  quality: 'HD' | '4K' | 'SD';
}

interface RelatedMovie {
  id: number;
  title: string;
  poster: string;
}

interface MovieData {
  id: number;
  title: string;
  originalTitle: string;
  rating: number;
  duration: string;
  genre: string;
  director: string;
  writers: string[];
  releaseDate: string;
  poster: string;
  backdrop: string;
  description: string;
  cast: CastMember[];
  trailers: Trailer[];
  relatedMovies: RelatedMovie[];
}

type TabType = 'overview' | 'cast' | 'trailers' | 'related';



const MovieDetail = () => {
  //const router = useRouter();
  //const params = useParams();
  //const id = params.id;

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Sample movie data - trong thực tế bạn sẽ fetch data từ API hoặc database
  const movieData: MovieData = {
    id: 1,
    title: "Dragon Ball Super Movie: Broly",
    originalTitle: "Bảy Viên Ngọc Rồng Siêu Cấp: Huyền Thoại Broly (2018)",
    rating: 7.7,
    duration: "1 giờ 41 phút",
    genre: "Chí sĩ, Độc chiến",
    director: "Tatsuya Nagamine",
    writers: ["Nhật bản"],
    releaseDate: "14/12/2018",
    poster: "/api/placeholder/300/450",
    backdrop: "/api/placeholder/1200/600",
    description: "Dragon Ball Super: Broly là bộ phim thứ 20 trong Dragon Ball và là bộ phim đầu tiên trong Dragon Ball Super. Bộ phim kể về nguồn gốc của Broly và cuộc chiến giữa anh ta với Goku và Vegeta. Đây là một cuộc chiến hoành tráng nhất từ trước đến nay trong vũ trụ Dragon Ball.",
    cast: [
      { 
        name: "Masako Nozawa", 
        character: "Son Goku / Goten / Bardock / King Vegeta III (voice)", 
        avatar: "/api/placeholder/80/80" 
      },
      { 
        name: "Ryo Horikawa", 
        character: "Vegeta / Vegeta (voice)", 
        avatar: "/api/placeholder/80/80" 
      },
      { 
        name: "Bin Shimada", 
        character: "Broly (voice)", 
        avatar: "/api/placeholder/80/80" 
      },
      { 
        name: "Ryusei Nakao", 
        character: "Freeza (voice)", 
        avatar: "/api/placeholder/80/80" 
      },
      { 
        name: "Nana Mizuki", 
        character: "King Vegeta III (voice)", 
        avatar: "/api/placeholder/80/80" 
      }
    ],
    trailers: [
      { id: 1, title: "TRAILER", thumbnail: "/api/placeholder/300/200", quality: "HD" },
      { id: 2, title: "TRAILER", thumbnail: "/api/placeholder/300/200", quality: "HD" },
      { id: 3, title: "TRAILER", thumbnail: "/api/placeholder/300/200", quality: "HD" }
    ],
    relatedMovies: [
      { id: 1, title: "Dragon Ball Z", poster: "/api/placeholder/150/225" },
      { id: 2, title: "Dragon Ball Super", poster: "/api/placeholder/150/225" },
      { id: 3, title: "Dragon Ball Z Kakarot", poster: "/api/placeholder/150/225" },
      { id: 4, title: "Dragon Ball Z", poster: "/api/placeholder/150/225" }
    ]
  };



  // const handleWatchMovie = (): void => {
  //   // Logic xem phim
  //   console.log('Watch movie:', movieData.title);
  // };

  const handleAddToList = (): void => {
    // Logic thêm vào danh sách
    console.log('Add to list:', movieData.title);
  };

  const handleToggleFavorite = (): void => {
    // Logic yêu thích
    console.log('Toggle favorite:', movieData.title);
  };

  const handleShare = (): void => {
    // Logic chia sẻ
    if (navigator.share) {
      navigator.share({
        title: movieData.title,
        text: movieData.description,
        url: window.location.href
      });
    } else {
      // Fallback cho trình duyệt không hỗ trợ Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link đã được copy!');
    }
  };

  const handleTrailerClick = (trailer: Trailer): void => {
    // Logic phát trailer
    console.log('Play trailer:', trailer.title);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Background */}
      <div className="relative h-96 md:h-[500px]">
        <div className="absolute inset-0">
          <Image
            src={movieData.backdrop}
            alt={movieData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-72 md:w-60 md:h-90 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={movieData.poster}
                  alt={movieData.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">{movieData.title}</h1>
              <p className="text-lg text-gray-300">{movieData.originalTitle}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded font-bold">
                    ★ {movieData.rating}
                  </span>
                </div>
                <span>{movieData.duration}</span>
                <span>{movieData.genre}</span>
                <span>{movieData.releaseDate}</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link 
                  href={`/watch/1`}
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  XEM PHIM
                </Link>
                
                <button 
                  onClick={handleAddToList}
                  className="border border-gray-600 hover:border-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  + DANH SÁCH
                </button>
                
                <button 
                  onClick={handleToggleFavorite}
                  className="border border-gray-600 hover:border-white px-4 py-3 rounded-lg transition-colors"
                  aria-label="Thêm vào yêu thích"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                <button 
                  onClick={handleShare}
                  className="border border-gray-600 hover:border-white px-4 py-3 rounded-lg transition-colors"
                  aria-label="Chia sẻ"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview' as TabType, label: 'TỔNG QUAN' },
              { id: 'cast' as TabType, label: 'DIỄN VIÊN' },
              { id: 'trailers' as TabType, label: 'TRAILER' },
              { id: 'related' as TabType, label: 'PHIM TƯƠNG TỰ' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-500'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Nội dung phim</h2>
                <p className="text-gray-300 leading-relaxed">{movieData.description}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Thông tin phim</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <span className="w-24 text-gray-400">Đạo diễn:</span>
                    <span>{movieData.director}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gray-400">Quốc gia:</span>
                    <span>{movieData.writers.join(', ')}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gray-400">Khởi chiếu:</span>
                    <span>{movieData.releaseDate}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gray-400">Thời lượng:</span>
                    <span>{movieData.duration}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-gray-400">Thể loại:</span>
                    <span>{movieData.genre}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cast' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Diễn viên</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {movieData.cast.map((actor: CastMember, index: number) => (
                <div key={index} className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                    <Image
                      src={actor.avatar}
                      alt={actor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{actor.name}</h3>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trailers' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Trailer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {movieData.trailers.map((trailer: Trailer) => (
                <div 
                  key={trailer.id} 
                  className="relative group cursor-pointer"
                  onClick={() => handleTrailerClick(trailer)}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={trailer.thumbnail}
                      alt={trailer.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-600 text-xs px-2 py-1 rounded">{trailer.quality}</span>
                    </div>
                  </div>
                  <h3 className="mt-2 font-semibold">{trailer.title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'related' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Phim tương tự</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movieData.relatedMovies.map((movie: RelatedMovie) => (
                <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                    <Image
                      src={movie.poster}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium truncate">{movie.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;