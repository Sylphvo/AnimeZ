// src/app/watch/[id]/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Type definitions
interface Episode {
  id: number;
  number: number;
  title: string;
  duration: string;
  thumbnail: string;
}

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  likes: number;
}

interface RelatedMovie {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
}

interface MovieWatchData {
  id: number;
  title: string;
  originalTitle: string;
  rating: number;
  year: number;
  genre: string[];
  description: string;
  videoUrl: string;
  poster: string;
  episodes: Episode[];
  comments: Comment[];
  relatedMovies: RelatedMovie[];
}

const MovieWatchPage = () => {
  const params = useParams();
  const id = params.id as string;
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [newComment, setNewComment] = useState('');
  console.log(isFullscreen);
  // Sample data
  const movieData: MovieWatchData = {
    id: 1,
    title: "Dragon Ball Super Movie: Broly",
    originalTitle: "Bảy Viên Ngọc Rồng Siêu Cấp: Huyền Thoại Broly (2018)",
    rating: 4.5,
    year: 2018,
    genre: ["Hành động", "Anime", "Phiêu lưu"],
    description: "Dragon Ball Super: Broly là bộ phim thứ 20 trong Dragon Ball và là bộ phim đầu tiên trong Dragon Ball Super.",
    videoUrl: "/api/placeholder/video",
    poster: "/api/placeholder/300/450",
    episodes: [
      { id: 1, number: 1, title: "Tập 1", duration: "24:30", thumbnail: "/api/placeholder/160/90" },
      { id: 2, number: 2, title: "Tập 2", duration: "24:15", thumbnail: "/api/placeholder/160/90" },
      { id: 3, number: 3, title: "Tập 3", duration: "23:45", thumbnail: "/api/placeholder/160/90" },
      { id: 4, number: 4, title: "Tập 4", duration: "24:00", thumbnail: "/api/placeholder/160/90" },
      { id: 5, number: 5, title: "Tập 5", duration: "24:10", thumbnail: "/api/placeholder/160/90" },
      { id: 6, number: 6, title: "Tập 6", duration: "23:55", thumbnail: "/api/placeholder/160/90" },
      { id: 7, number: 7, title: "Tập 7", duration: "24:20", thumbnail: "/api/placeholder/160/90" },
      { id: 8, number: 8, title: "Tập 8", duration: "24:05", thumbnail: "/api/placeholder/160/90" },
      { id: 9, number: 9, title: "Tập 9", duration: "23:30", thumbnail: "/api/placeholder/160/90" },
      { id: 10, number: 10, title: "Tập 10", duration: "24:25", thumbnail: "/api/placeholder/160/90" },
    ],
    comments: [
      {
        id: 1,
        user: { name: "Nguyen Van A", avatar: "/api/placeholder/40/40" },
        content: "Phim hay quá! Animation đẹp tuyệt vời.",
        time: "2 giờ trước",
        likes: 15
      },
      {
        id: 2,
        user: { name: "Tran Thi B", avatar: "/api/placeholder/40/40" },
        content: "Broly quá mạnh, trận đấu epic nhất từ trước đến nay!",
        time: "4 giờ trước",
        likes: 23
      }
    ],
    relatedMovies: [
      { id: 2, title: "Dragon Ball Z: Kakarot", thumbnail: "/api/placeholder/200/120", duration: "1:45:30", views: "2.1M" },
      { id: 3, title: "YEHOVA", thumbnail: "/api/placeholder/200/120", duration: "2:10:15", views: "890K" },
      { id: 4, title: "Endgame", thumbnail: "/api/placeholder/200/120", duration: "3:01:42", views: "5.2M" },
      { id: 5, title: "Spider-Man", thumbnail: "/api/placeholder/200/120", duration: "2:28:18", views: "3.8M" }
    ]
  };

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Logic thêm comment
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  // Auto-hide controls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, showControls]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Video Player Section */}
      <div className="relative">
        <div 
          className="relative bg-black aspect-video max-h-[80vh]"
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            poster="/api/placeholder/1200/675"
            onClick={togglePlay}
          >
            <source src={movieData.videoUrl} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video HTML5.
          </video>

          {/* Video Controls */}
          {showControls && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30">
              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <Link href={`/movies/${id}`} className="text-white hover:text-gray-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
                
                <div className="flex items-center space-x-4">
                  <button className="text-white hover:text-gray-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                  <button className="text-white hover:text-gray-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Center Play Button */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={togglePlay}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-4"
                  >
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Progress Bar */}
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer mb-4"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button onClick={togglePlay} className="text-white hover:text-gray-300">
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM11 8a1 1 0 112 0v4a1 1 0 11-2 0V8z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      )}
                    </button>

                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <span className="text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-gray-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <button onClick={toggleFullscreen} className="text-white hover:text-gray-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Movie Info & Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Movie Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{movieData.title}</h1>
              <p className="text-gray-400 mb-4">{movieData.originalTitle}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[1,2,3,4,5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${star <= movieData.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>{movieData.year}</span>
                <div className="flex gap-2">
                  {movieData.genre.map((g) => (
                    <span key={g} className="bg-gray-700 px-2 py-1 rounded text-sm">{g}</span>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-300">{movieData.description}</p>
            </div>

            {/* Episodes List */}
            <div>
              <h2 className="text-xl font-bold mb-4">Danh sách tập - Thuyết minh: Tập 10</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
                {movieData.episodes.map((episode) => (
                  <button
                    key={episode.id}
                    className={`p-2 rounded text-center transition-colors ${
                      episode.number === 10 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {episode.number}
                  </button>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">Bình luận xuất hiện trên Animez TV</h2>
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Thêm bình luận công khai..."
                      className="w-full bg-transparent border-b border-gray-600 focus:border-gray-400 outline-none py-2"
                    />
                    <div className="flex justify-end mt-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setNewComment('')}
                        className="px-4 py-1 text-sm hover:bg-gray-700 rounded"
                      >
                        HỦY
                      </button>
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="px-4 py-1 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded"
                      >
                        BÌNH LUẬN
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {movieData.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Image
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{comment.user.name}</span>
                        <span className="text-xs text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-300">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V9a2 2 0 00-2-2H4.5a2 2 0 000 4H7m7-6v2m0 0V7a2 2 0 00-2-2H5a2 2 0 000 4h2m5 4v8" />
                          </svg>
                          {comment.likes}
                        </button>
                        <button className="text-xs text-gray-400 hover:text-white">
                          Phản hồi
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Related Videos */}
            <div>
              <h3 className="text-lg font-bold mb-4">Lên kế tiếp</h3>
              <div className="space-y-3">
                {movieData.relatedMovies.map((movie) => (
                  <Link key={movie.id} href={`/watch/${movie.id}`} className="flex gap-3 group">
                    <div className="relative w-32 h-18 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={movie.thumbnail}
                        alt={movie.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-xs px-1 rounded">
                        {movie.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-400">
                        {movie.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">{movie.views} lượt xem</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieWatchPage;