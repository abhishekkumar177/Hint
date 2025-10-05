import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Home, Bookmark, MessageCircle, User, Bell, MoreHorizontal, Heart, MessageSquare, Share2, Eye, GraduationCap, Users, Building2, Calendar, MapPin, TrendingUp, BookOpen, Coffee, Trophy } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const App = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);

  const currentUser = {
    name: 'Alex Chen',
    major: 'Computer Science',
    year: 'Junior',
    dorm: 'Oak Hall',
    clubs: ['Tech Club', 'Photography Society']
  };

  const campusFeed = [
    {
      id: 1,
      user: { name: 'Sarah Johnson', avatar: 'https://placehold.co/40x40/6366f1/white?text=SJ', major: 'Biology', year: 'Senior' },
      content: 'Just finished our lab experiment! The results were fascinating 🧪 #BiologyLab #CampusLife',
      image: 'https://placehold.co/500x400/8b5cf6/white?text=Biology+Lab',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 3,
      saves: 8,
      tags: ['Biology', 'Lab', 'Science'],
      emoji: '🧪'
    },
    {
      id: 2,
      user: { name: 'Tech Club', avatar: 'https://placehold.co/40x40/10b981/white?text=TC', major: 'Organization', year: '' },
      content: 'Hackathon this weekend! Join us for 24 hours of coding, pizza, and prizes 🏆 #TechClub #Hackathon',
      image: 'https://placehold.co/500x400/06b6d4/white?text=Hackathon+Event',
      timestamp: '5 hours ago',
      likes: 56,
      comments: 12,
      saves: 23,
      tags: ['Tech Club', 'Hackathon', 'Events'],
      emoji: '🏆'
    },
    {
      id: 3,
      user: { name: 'Mike Rodriguez', avatar: 'https://placehold.co/40x40/f59e0b/white?text=MR', major: 'Business', year: 'Sophomore' },
      content: 'Found the perfect study spot in the library! Quiet and great coffee ☕️ #StudySpot #CampusLife',
      image: 'https://placehold.co/500x400/84cc16/white?text=Study+Spot',
      timestamp: '1 day ago',
      likes: 18,
      comments: 2,
      saves: 15,
      tags: ['Study Spot', 'Library', 'Business'],
      emoji: '☕️'
    }
  ];

  const boards = [
    {
      id: 1,
      name: 'Organic Chemistry Notes',
      description: 'Study materials and diagrams for Chem 201',
      pins: 24,
      coverImage: 'https://placehold.co/300x200/ef4444/white?text=Chem+Notes',
      icon: BookOpen
    },
    {
      id: 2,
      name: 'Web Development Projects',
      description: 'Inspiration and code snippets for my portfolio',
      pins: 18,
      coverImage: 'https://placehold.co/300x200/3b82f6/white?text=Web+Dev',
      icon: CodeIcon
    },
    {
      id: 3,
      name: 'Internship Opportunities',
      description: 'Tech internships for Summer 2024',
      pins: 12,
      coverImage: 'https://placehold.co/300x200/10b981/white?text=Internships',
      icon: Trophy
    }
  ];

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const PostCard = ({ post, index }) => {
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);
    const isLiked = likedPosts.has(post.id);
    const isSaved = savedPosts.has(post.id);

    const handleLikeClick = () => {
      handleLike(post.id);
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 600);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 relative"
      >
        <AnimatePresence>
          {showLikeAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: 1 }}
              exit={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl"
              >
                {post.emoji}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                src={post.user.avatar} 
                alt={post.user.name} 
                className="w-10 h-10 rounded-full" 
              />
              <div>
                <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                <p className="text-sm text-gray-500">{post.user.major} • {post.user.year}</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ rotate: 90 }}
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreHorizontal className="w-5 h-5" />
            </motion.button>
          </div>
          <p className="text-gray-800 mb-3">{post.content}</p>
          <motion.img 
            whileHover={{ scale: 1.02 }}
            src={post.image} 
            alt="Post content" 
            className="w-full rounded-lg mb-3 cursor-pointer"
            onClick={() => setSelectedPost(post)}
          />
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, tagIndex) => (
              <motion.span 
                key={tagIndex}
                whileHover={{ scale: 1.05 }}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full cursor-pointer"
              >
                #{tag}
              </motion.span>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{post.timestamp}</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>124</span>
              </span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Campus Quad</span>
              </span>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLikeClick}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes + (isLiked ? 1 : 0)}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </motion.button>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSave(post.id)}
            className={`flex items-center space-x-1 transition-colors ${
              isSaved ? 'text-purple-500' : 'text-gray-600 hover:text-purple-500'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{post.saves + (isSaved ? 1 : 0)}</span>
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const BoardCard = ({ board, index }) => {
    const IconComponent = board.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer"
      >
        <div className="relative">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            src={board.coverImage} 
            alt={board.name} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center"
            >
              <Plus className="w-6 h-6 text-purple-600" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg"
          >
            <IconComponent className="w-4 h-4 text-purple-600" />
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1">{board.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{board.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{board.pins} pins</span>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              View
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full opacity-20"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-6 h-6 bg-blue-400 rounded-full opacity-20"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-5"
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  CampusConnect
                </h1>
              </motion.div>
              <div className="hidden md:flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search posts, boards, or people..." 
                  className="bg-transparent outline-none text-sm placeholder-gray-500 w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <Bell className="w-5 h-5" />
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                />
              </motion.button>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer"
              >
                AC
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Navigation Tabs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-1 bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-sm mb-6"
            >
              {[
                { id: 'feed', label: 'Campus Feed', icon: Home },
                { id: 'boards', label: 'My Boards', icon: Bookmark },
                { id: 'messages', label: 'Messages', icon: MessageCircle }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 bg-white/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Feed Content */}
            {activeTab === 'feed' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {campusFeed.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </motion.div>
            )}

            {/* Boards Content */}
            {activeTab === 'boards' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl font-bold text-gray-900"
                  >
                    My Boards
                  </motion.h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Board</span>
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {boards.map((board, index) => (
                    <BoardCard key={board.id} board={board} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Messages Content */}
            {activeTab === 'messages' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Tech Club', lastMessage: 'Hackathon details sent!', time: '2h ago', avatar: 'TC' },
                    { name: 'Sarah Johnson', lastMessage: 'Thanks for the notes!', time: '5h ago', avatar: 'SJ' },
                    { name: 'Study Group - CS301', lastMessage: 'Meeting moved to 3pm', time: '1d ago', avatar: 'SG' }
                  ].map((chat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-all"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {chat.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                          <span className="text-xs text-gray-500">{chat.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-80 space-y-6"
          >
            {/* User Profile */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
                >
                  AC
                </motion.div>
                <div>
                  <h3 className="font-bold text-gray-900">{currentUser.name}</h3>
                  <p className="text-sm text-gray-600">{currentUser.major} • {currentUser.year}</p>
                  <p className="text-sm text-gray-600">{currentUser.dorm}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{currentUser.clubs.join(', ')}</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 py-2 rounded-lg transition-all"
                >
                  Edit Profile
                </motion.button>
              </div>
            </motion.div>

            {/* Trending on Campus */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-gray-900">Trending on Campus</h3>
              </div>
              <div className="space-y-3">
                {[
                  { tag: 'Hackathon', posts: 47, color: 'from-purple-500 to-pink-500' },
                  { tag: 'StudySpot', posts: 32, color: 'from-blue-500 to-cyan-500' },
                  { tag: 'CareerFair', posts: 28, color: 'from-green-500 to-emerald-500' },
                  { tag: 'SpringBreak', posts: 24, color: 'from-orange-500 to-red-500' }
                ].map((trend, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 bg-gradient-to-r ${trend.color} rounded-full`}></div>
                      <span className="text-sm font-medium text-gray-900">#{trend.tag}</span>
                    </div>
                    <span className="text-sm text-gray-500">{trend.posts} posts</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: Calendar, label: 'Create Event', color: 'from-purple-500 to-purple-600' },
                  { icon: Plus, label: 'New Post', color: 'from-blue-500 to-blue-600' },
                  { icon: Users, label: 'Join Club', color: 'from-green-500 to-green-600' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 p-3 bg-gradient-to-r ${action.color} text-white rounded-lg transition-all shadow-md hover:shadow-lg`}
                  >
                    <action.icon className="w-5 h-5" />
                    <span className="font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <img src={selectedPost.image} alt="Post" className="w-full rounded-lg mb-4" />
                <p className="text-gray-800 mb-4">{selectedPost.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPost.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;