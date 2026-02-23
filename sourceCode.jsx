import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Clock, PlayCircle, ChevronRight, User, Search, 
  Facebook, Instagram, Twitter, ArrowLeft, Mail, Lock, CheckCircle 
} from 'lucide-react';

const App = () => {
  // --- State Management ---
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'signup', 'detail'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [user, setUser] = useState(null); // null = guest, object = logged in

  // --- Mock Data ---
  const modules = [
    { id: 1, title: "Sustainable Diet", description: "Discover how your food choices impact the environment and learn simple swaps for a greener plate.", time: "8 mins", type: "video", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400" },
    { id: 2, title: "Malaysian Healthy Plate", description: "Understand the Suku Suku Separuh concept and apply it to your daily meals at the cafeteria.", time: "8 mins", type: "video", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400" },
    { id: 3, title: "Fruits & Vegetables Intake", description: "Are you getting enough? Learn creative ways to add more color and nutrients to your diet.", time: "10 mins", type: "video", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400" },
    { id: 4, title: "Whole Grains vs Refined", description: "The truth about carbs. Why whole grains matter for your energy levels and long-term health.", time: "10 mins", type: "video", image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=400" },
    { id: 5, title: "Module Quiz 1", description: "Test your knowledge on the basics of sustainable eating and balanced diets.", time: "4 mins", type: "quiz", image: "https://placehold.co/400x300/f3f4f6/333?text=QUIZ" },
    { id: 6, title: "Legumes & Plant Protein", description: "Protein doesn't just come from meat. Explore the world of beans, lentils, and tofu.", time: "10 mins", type: "video", image: "https://images.unsplash.com/photo-1515543904379-3d75adc4d620?auto=format&fit=crop&q=80&w=400" },
    { id: 7, title: "Dairy Products Intake", description: "Navigating dairy and alternatives. Calcium sources for every diet preference.", time: "8 mins", type: "video", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=400" },
    { id: 8, title: "Red Meat, Poultry, Seafood", description: "Balancing animal proteins. How to choose sustainably sourced seafood and leaner cuts.", time: "10 mins", type: "video", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=400" },
    { id: 9, title: "Seeds and Healthy Fats", description: "Don't fear the fat! Distinguishing between healthy fats and those to limit.", time: "10 mins", type: "video", image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=400" },
    { id: 10, title: "Module Quiz 2", description: "Challenge yourself! See how much you've learned about food groups.", time: "4 mins", type: "quiz", image: "https://placehold.co/400x300/f3f4f6/333?text=QUIZ" },
    { id: 11, title: "Ultra-Processed Foods", description: "Identifying hidden ingredients and why whole foods are the superior choice.", time: "10 mins", type: "video", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=400" },
    { id: 12, title: "Food Waste Management", description: "Reduce your footprint. Practical tips for storing food and composting on campus.", time: "8 mins", type: "video", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400" },
  ];

  // --- Actions ---
  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const openModule = (module) => {
    setActiveModule(module);
    setCurrentPage('detail');
    window.scrollTo(0, 0);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setUser({ name: "Student", email: "student@um.edu.my" });
      setCurrentPage('home');
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  // --- Sub-Components (Views) ---

  // 1. Auth View (Login/Signup)
  const AuthView = ({ type }) => (
    <div className="flex-grow bg-[#F0F4C3] flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{type === 'login' ? 'Welcome Back!' : 'Join NourishUM'}</h2>
          <p className="text-gray-500 mt-2">
            {type === 'login' ? 'Continue your healthy journey' : 'Start your sustainable diet today'}
          </p>
        </div>
        
        <form className="space-y-4" onSubmit={handleLogin}>
          {type === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input type="text" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4E157] focus:outline-none" placeholder="John Doe" required />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="email" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4E157] focus:outline-none" placeholder="you@student.um.edu.my" required />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="password" className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4E157] focus:outline-none" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#D4E157] hover:bg-[#c0ca33] text-gray-900 font-bold py-3 rounded-lg transition shadow-md mt-6">
            {type === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {type === 'login' ? (
            <>Don't have an account? <button onClick={() => setCurrentPage('signup')} className="text-[#827717] font-bold hover:underline">Sign up</button></>
          ) : (
            <>Already have an account? <button onClick={() => setCurrentPage('login')} className="text-[#827717] font-bold hover:underline">Log in</button></>
          )}
        </div>
      </div>
    </div>
  );

  // 2. Detail View
  const ModuleDetailView = ({ module }) => {
    if (!module) return null;
    
    return (
      <div className="flex-grow bg-[#FFFFF0]">
        {/* Breadcrumb / Back */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={() => setCurrentPage('home')} 
              className="flex items-center text-gray-500 hover:text-[#D4E157] transition"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Modules
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content (Left) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player Placeholder */}
              <div className="bg-black rounded-xl overflow-hidden aspect-video relative group shadow-lg">
                <img src={module.image} alt={module.title} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="text-white w-20 h-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition cursor-pointer" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <div className="flex items-center space-x-2">
                     <Clock size={16} />
                     <span>{module.time}</span>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{module.title}</h1>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold text-lg mb-3">About this module</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {module.description}
                    <br /><br />
                    In this lesson, we will explore the fundamental concepts necessary for maintaining a healthy lifestyle while at university. We break down complex nutritional information into bite-sized, actionable tips.
                  </p>
                  
                  <h3 className="font-bold text-lg mb-3 mt-6">What you'll learn</h3>
                  <ul className="space-y-2">
                    {['Understanding key nutritional values', 'Practical meal planning tips', 'Sustainable sourcing methods'].map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-600">
                        <CheckCircle size={18} className="text-[#D4E157] mr-2 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar (Right) */}
            <div className="space-y-6">
              {/* Instructor Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Your Instructor</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">👩‍🏫</div>
                  <div>
                    <p className="font-bold text-sm">Dr. Sarah Lim</p>
                    <p className="text-xs text-gray-500">Nutrition Specialist</p>
                  </div>
                </div>
                <button className="w-full mt-4 border border-[#D4E157] text-gray-700 py-2 rounded hover:bg-[#D4E157] transition text-sm font-medium">
                  View Profile
                </button>
              </div>

              {/* Related Modules */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Up Next</h3>
                <div className="space-y-4">
                  {modules.slice(0, 3).filter(m => m.id !== module.id).map(m => (
                    <div key={m.id} className="flex space-x-3 cursor-pointer group" onClick={() => openModule(m)}>
                      <div className="w-20 h-14 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img src={m.image} className="w-full h-full object-cover" alt="thumb" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 group-hover:text-[#827717] line-clamp-2">{m.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  // 3. Home View (Existing content wrapped)
  const HomeView = () => (
    <>
      {/* Hero Section */}
      <section className="bg-[#7986CB] text-white relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 z-10 space-y-6">
            <h2 className="text-4xl md:text-6xl font-light">
              Nourish Your Body.
            </h2>
            <p className="text-lg md:text-xl text-indigo-100 max-w-md font-light">
              Empowering UM students to embrace a sustainable diet. Healthy choices made easy.
            </p>
            
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-lg">
                <input type="text" placeholder="Name" className="px-4 py-3 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400 w-full" />
                <input type="email" placeholder="Email" className="px-4 py-3 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400 w-full" />
                <button onClick={() => setCurrentPage('signup')} className="bg-[#F0F4C3] text-gray-800 font-bold px-6 py-3 rounded hover:bg-white transition whitespace-nowrap shadow-lg">
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="mt-8">
                <button onClick={() => document.getElementById('modules').scrollIntoView({behavior: 'smooth'})} className="bg-[#F0F4C3] text-gray-800 font-bold px-8 py-3 rounded hover:bg-white transition shadow-lg">
                  Continue Learning
                </button>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center z-10">
            <div className="relative w-80 h-80 md:w-[500px] md:h-[500px]">
              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl">
                 <div className="text-center">
                   <div className="text-9xl font-bold text-[#AED581] opacity-90 tracking-widest">FIT</div>
                   <p className="text-sm mt-2 opacity-75">Healthy Choices</p>
                 </div>
              </div>
            </div>
          </div>
          <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Banner */}
      <section className="relative h-96 bg-gray-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000" alt="Healthy Food" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white p-6">
          <h3 className="text-4xl md:text-5xl font-semibold mb-4">Empower Your Plate</h3>
          <p className="text-xl text-gray-200 mb-8">Start Your Journey with NourishUM!</p>
          <button onClick={() => document.getElementById('modules').scrollIntoView({behavior: 'smooth'})} className="bg-[#D4E157] text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-white transition duration-300 shadow-lg transform hover:scale-105">
            View Materials
          </button>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="bg-[#FFFFF0] py-16 px-4 flex-grow">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-700 font-medium mb-3">Educational Modules</h2>
            <p className="text-gray-400 font-light">Learn, cook, and connect with fellow sustainable food enthusiasts</p>
            <div className="w-24 h-1 bg-[#D4E157] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module) => (
              <div 
                key={module.id} 
                onClick={() => openModule(module)}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={module.image} alt={module.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-600 shadow">
                    {module.type === 'quiz' ? 'QUIZ' : 'LESSON'}
                  </div>
                  {module.type !== 'quiz' && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="text-white w-12 h-12 drop-shadow-lg" />
                    </div>
                  )}
                </div>
                <div className="p-5 text-center">
                  <h4 className="font-bold text-gray-800 text-lg mb-2 leading-tight min-h-[3.5rem] flex items-center justify-center">{module.title}</h4>
                  <div className="flex items-center justify-center text-gray-400 text-sm space-x-2">
                    <Clock size={14} />
                    <span>{module.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <button className="text-gray-500 hover:text-[#D4E157] font-semibold flex items-center justify-center mx-auto space-x-1 transition-colors">
               <span>View All Modules</span>
               <ChevronRight size={16} />
             </button>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Global Header */}
      <header className="bg-[#D4E157] text-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 bg-white rounded flex items-center justify-center shadow-sm">
              <span className="text-xl">🍽️</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">NourishUM</h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8 font-medium">
            <button onClick={() => handleNavClick('home')} className={`hover:text-white transition-colors ${currentPage === 'home' ? 'text-white' : ''}`}>Home</button>
            <button className="hover:text-white transition-colors">About Us</button>
            <button onClick={() => {handleNavClick('home'); setTimeout(() => document.getElementById('modules')?.scrollIntoView(), 100)}} className="hover:text-white transition-colors">Materials</button>
            <button className="hover:text-white transition-colors">Contact Us</button>
            
            {user ? (
               <div className="flex items-center space-x-4 pl-4 border-l border-gray-600/20">
                 <span className="font-bold text-sm">Hi, {user.name}</span>
                 <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-1.5 rounded text-sm hover:bg-gray-700 transition shadow">
                   Logout
                 </button>
               </div>
            ) : (
              <button onClick={() => handleNavClick('login')} className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-700 transition shadow">
                Login
              </button>
            )}
          </nav>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#c0ca33] px-4 py-4 space-y-4">
            <button onClick={() => handleNavClick('home')} className="block hover:text-white w-full text-left">Home</button>
            <button className="block hover:text-white w-full text-left">Materials</button>
            {user ? (
              <button onClick={handleLogout} className="w-full bg-gray-800 text-white px-5 py-2 rounded">Logout</button>
            ) : (
              <button onClick={() => handleNavClick('login')} className="w-full bg-gray-800 text-white px-5 py-2 rounded">Login</button>
            )}
          </div>
        )}
      </header>

      {/* Main Content Router */}
      <main className="flex-grow flex flex-col">
        {currentPage === 'home' && <HomeView />}
        {currentPage === 'login' && <AuthView type="login" />}
        {currentPage === 'signup' && <AuthView type="signup" />}
        {currentPage === 'detail' && <ModuleDetailView module={activeModule} />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 border-t-4 border-[#D4E157]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4 text-white">
              <span className="text-2xl">🍽️</span>
              <span className="text-xl font-bold">NourishUM</span>
            </div>
            <p className="text-sm text-gray-400">Promoting sustainable eating habits for a healthier campus and a healthier planet.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#D4E157]">About Us</a></li>
              <li><a href="#" className="hover:text-[#D4E157]">Our Materials</a></li>
              <li><a href="#" className="hover:text-[#D4E157]">Success Stories</a></li>
              <li><a href="#" className="hover:text-[#D4E157]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">Resources</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-[#D4E157]">Student Guide</a></li>
              <li><a href="#" className="hover:text-[#D4E157]">Recipes</a></li>
              <li><a href="#" className="hover:text-[#D4E157]">Local Markets</a></li>
            </ul>
          </div>
          <div>
             <h5 className="text-white font-bold mb-4">Connect</h5>
             <div className="flex space-x-4">
               <a href="#" className="bg-gray-700 p-2 rounded hover:bg-[#D4E157] hover:text-gray-900 transition"><Facebook size={18} /></a>
               <a href="#" className="bg-gray-700 p-2 rounded hover:bg-[#D4E157] hover:text-gray-900 transition"><Instagram size={18} /></a>
               <a href="#" className="bg-gray-700 p-2 rounded hover:bg-[#D4E157] hover:text-gray-900 transition"><Twitter size={18} /></a>
             </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-600 mt-12">&copy; 2023 NourishUM Project. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default App;
