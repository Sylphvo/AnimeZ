'use client';
import React, { useState } from 'react';
import { 
  Star, 
  Eye, 
  Heart, 
  BookOpen, 
  Search, 
  Bell, 
  MessageCircle,
  ThumbsUp,
  Share2,
  Bookmark,
  Play,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import Image from 'next/image';

interface Chapter {
  id: string;
  number: number;
  title: string;
  date: string;
  views: string;
  isNew?: boolean;
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  chapter?: string;
}

interface RelatedComic {
  id: string;
  title: string;
  image: string;
  rating: number;
  views: string;
  chapter: string;
  status: 'ongoing' | 'completed';
}

const ComicDetailPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'chapters' | 'comments'>('chapters');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // Mock data
  const comicDetail = {
    id: '1',
    title: 'NGUYÊN TÔN',
    image: '/api/placeholder/300/400',
    rating: 4.5,
    totalRatings: 1234,
    views: '12.5M',
    status: 'ongoing' as const,
    author: 'Thiên Tằm Thổ Đậu',
    artist: 'Studio XYZ',
    publishedDate: '15/06/2023',
    updatedDate: '25/12/2024',
    genres: ['Huyền huyễn', 'Phiêu lưu', 'Hành động', 'Adventure', 'Phỏng tây', 'Tu tiên'],
    description: `Truyện tranh Nguyên Tôn được cập nhật nhanh và đầy đủ nhất tại NetTruyen. 
    Nguyên Tôn kể về hành trình của Chu Nguyên, hoàng tử nhỏ bị Chu, vốn ra đặng trong 
    miền bão giông thành lưu vong. Từ nhỏ, mặc dù lại vẫ oai vì lực, vẫn có cơ phải trốn chạy. 
    Bão thời...`,
    totalChapters: 991,
    latestChapter: 'Chapter 991'
  };

  const chapters: Chapter[] = Array.from({ length: 20 }, (_, i) => ({
    id: `chapter-${991 - i}`,
    number: 991 - i,
    title: `Chapter ${991 - i}`,
    date: `${25 - Math.floor(i / 2)}/12/2024`,
    views: `${Math.floor(Math.random() * 100) + 50}K`,
    isNew: i < 3
  }));

  const comments: Comment[] = [
    {
      id: '1',
      user: 'Đạo cao đê mệ',
      avatar: '/api/placeholder/40/40',
      content: 'Truyện hay quá, cập nhật nhanh nữa. Tác giả vẽ đẹp lắm!',
      date: '2 tháng trước',
      likes: 45,
      chapter: 'Chapter 991'
    },
    {
      id: '2', 
      user: 'SwordMaster2008',
      avatar: '/api/placeholder/40/40',
      content: 'Chapter này hay quá, mong chờ chapter tiếp theo',
      date: '1 tháng trước',
      likes: 23,
      chapter: 'Chapter 990'
    },
    {
      id: '3',
      user: 'silent_treatment',
      avatar: '/api/placeholder/40/40',
      content: 'Hài lòng về nội dung và cách dịch. 10 điểm!',
      date: '3 tuần trước', 
      likes: 67
    }
  ];

  const relatedComics: RelatedComic[] = [
    {
      id: '1',
      title: 'Liên Ành Hài Hướng Bằng Học Thanh...',
      image: '/api/placeholder/160/220',
      rating: 4.3,
      views: '571K',
      chapter: 'Chapter 89',
      status: 'ongoing'
    },
    {
      id: '2',
      title: 'Vạn Cổ Chí Tôn',
      image: '/api/placeholder/160/220',
      rating: 4.6,
      views: '80.6K',
      chapter: 'Chapter 454',
      status: 'ongoing'
    },
    {
      id: '3',
      title: 'Hệ Thống Thăng Cấp Thiên Tài',
      image: '/api/placeholder/160/220',
      rating: 4.4,
      views: '1.54K',
      chapter: 'Chapter 870',
      status: 'ongoing'
    }
  ];

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 cursor-pointer transition-colors ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'hover:text-yellow-400' : ''}`}
            onClick={() => interactive && setUserRating(star)}
          />
        ))}
        <span className="text-sm text-gray-300 ml-2">{rating}/5</span>
      </div>
    );
  };

  const renderReactionEmojis = () => {
    const reactions = [
      { emoji: '😢', label: 'Buồn', count: 45 },
      { emoji: '😡', label: 'Hài hộc', count: 12 },
      { emoji: '😊', label: 'Hây', count: 89 },
      { emoji: '🤣', label: 'Tuyệt vời', count: 156 }
    ];

    return (
      <div className="flex items-center space-x-2 mt-4">
        <span className="text-white text-sm">Cảm xúc của bạn về truyện này nhé!</span>
        <div className="flex space-x-2">
          {reactions.map((reaction, idx) => (
            <button
              key={idx}
              className="flex items-center space-x-1 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-full transition-colors"
            >
              <span className="text-lg">{reaction.emoji}</span>
              <span className="text-yellow-400 text-sm font-medium">{reaction.count}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header - Same as previous component */}
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
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <a href="#" className="hover:text-blue-400 transition-colors">Trang chủ</a>
          <span>/</span>
          <a href="#" className="hover:text-blue-400 transition-colors">Nguyên Tôn</a>
        </div>
      </div>

      {/* Comic Detail Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Comic Info */}
            <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Cover Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={comicDetail.image}
                    alt={comicDetail.title}
                    className="w-64 h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-white mb-4">{comicDetail.title}</h1>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    {renderStars(comicDetail.rating)}
                    <span className="text-gray-400">({comicDetail.totalRatings} đánh giá)</span>
                    <span className="text-red-500 bg-red-500/20 px-2 py-1 rounded text-sm">HOT</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-gray-400">Tác giả:</span>
                      <span className="text-white ml-2">{comicDetail.author}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Họa sĩ:</span>
                      <span className="text-white ml-2">{comicDetail.artist}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Tình trạng:</span>
                      <span className="text-green-400 ml-2">Đang cập nhật</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Lượt xem:</span>
                      <span className="text-white ml-2">{comicDetail.views}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Ngày phát hành:</span>
                      <span className="text-white ml-2">{comicDetail.publishedDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Cập nhật:</span>
                      <span className="text-white ml-2">{comicDetail.updatedDate}</span>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="mb-6">
                    <span className="text-gray-400 text-sm block mb-2">Thể loại:</span>
                    <div className="flex flex-wrap gap-2">
                      {comicDetail.genres.map((genre, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm hover:bg-blue-600/30 cursor-pointer transition-colors"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                      <Play className="w-5 h-5" />
                      <span>Đọc ngay</span>
                    </button>
                    
                    <button 
                      className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors ${
                        isBookmarked 
                          ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                          : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                      }`}
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                      <span>{isBookmarked ? 'Đã lưu' : 'Lưu truyện'}</span>
                    </button>
                    
                    <button className="bg-slate-700 hover:bg-slate-600 text-gray-300 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span>Yêu thích</span>
                    </button>
                    
                    <button className="bg-slate-700 hover:bg-slate-600 text-gray-300 px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Chia sẻ</span>
                    </button>
                  </div>

                  {/* Rating Section */}
                  <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                    <h3 className="text-white font-medium mb-2">Đánh giá của bạn:</h3>
                    {renderStars(userRating, true)}
                  </div>

                  {/* Reaction Emojis */}
                  {renderReactionEmojis()}
                </div>
              </div>

              {/* Description */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <h3 className="text-xl font-bold text-white mb-4">Nội dung truyện</h3>
                <p className="text-gray-300 leading-relaxed">{comicDetail.description}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-slate-800/50 rounded-lg overflow-hidden">
              <div className="flex border-b border-slate-700">
                <button
                  className={`flex-1 py-4 px-6 text-center transition-colors ${
                    selectedTab === 'chapters'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700'
                  }`}
                  onClick={() => setSelectedTab('chapters')}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Danh sách chương ({comicDetail.totalChapters})</span>
                  </div>
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center transition-colors ${
                    selectedTab === 'comments'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700'
                  }`}
                  onClick={() => setSelectedTab('comments')}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Bình luận (25)</span>
                  </div>
                </button>
              </div>

              <div className="p-6">
                {selectedTab === 'chapters' && (
                  <div>
                    {/* Chapter Filter */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <select className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                          <option>Tìm kiếm</option>
                          <option>Mới nhất</option>
                          <option>Cũ nhất</option>
                        </select>
                        <select className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                          <option>Lượt xem</option>
                          <option>Cao nhất</option>
                          <option>Thấp nhất</option>
                        </select>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Chapter List */}
                    <div className="space-y-2">
                      {chapters.map((chapter) => (
                        <div
                          key={chapter.id}
                          className="flex items-center justify-between p-4 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center space-x-4">
                            <BookOpen className="w-5 h-5 text-blue-400" />
                            <div>
                              <h4 className="text-white group-hover:text-blue-400 transition-colors">
                                {chapter.title}
                                {chapter.isNew && (
                                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
                                )}
                              </h4>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <span>{chapter.date}</span>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{chapter.views}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        {[1, 2, 3, 4, 5].map((page) => (
                          <button
                            key={page}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              page === 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'comments' && (
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-4 p-4 bg-slate-700/30 rounded-lg">
                        <Image
                          src={comment.avatar}
                          alt={comment.user}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-white">{comment.user}</h4>
                            {comment.chapter && (
                              <span className="text-blue-400 text-sm">{comment.chapter}</span>
                            )}
                            <span className="text-gray-400 text-sm">{comment.date}</span>
                          </div>
                          <p className="text-gray-300 mb-3">{comment.content}</p>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                              Trả lời
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6">Truyện liên quan</h3>
              <div className="space-y-4">
                {relatedComics.map((comic) => (
                  <div key={comic.id} className="flex space-x-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors">
                    <Image
                      src={comic.image}
                      alt={comic.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                        {comic.title}
                      </h4>
                      <div className="flex items-center space-x-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= comic.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>{comic.views} lượt xem</div>
                        <div>{comic.chapter}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Same as previous component */}
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

export default ComicDetailPage;