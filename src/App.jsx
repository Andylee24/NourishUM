import React, { useState, useEffect, useMemo } from 'react';
import heroBg from './assets/hero-bg.png';
import {
  Menu, X, Clock, PlayCircle, ChevronRight, User, Search,
  Facebook, Instagram, Twitter, ArrowLeft, Mail, Lock, CheckCircle,
  BookOpen, Target, ExternalLink, Award, FileText, CheckSquare, ArrowRight
} from 'lucide-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useLocation
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- State Management ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // null = guest, object = logged in
  const [completedActions, setCompletedActions] = useState({}); // { moduleId: { actionIndex: boolean } }

  // --- Curriculum Data ---
  const modules = [
    {
      id: 1,
      title: "What is a Sustainable Diet?",
      description: "Define a sustainable diet and explain its key components in relation to health and environmental sustainability.",
      time: "5 mins",
      type: "video",
      videoId: "T7RFNuHIUhE",
      image: "https://img.youtube.com/vi/T7RFNuHIUhE/maxresdefault.jpg",
      objectives: [
        "Define a sustainable diet and explain its key components in relation to health and environmental sustainability.",
        "Identify at least four core sustainable diet principles."
      ],
      actionSteps: [
        "Spot the principles in your own meals: Think about one meal you ate in the past 24 hours. Tick which sustainable diet principles it already follows.",
        "Principle recognition check: Choose four principles relevant to your lifestyle.",
        "One-principle focus for the week: Select one principle to pay more attention to.",
        "Reflection prompt: Write down why this principle matters for your health or the environment."
      ],
      supplements: [
        { title: "What is a Sustainable Diet", url: "/new_supplements/What%20is%20a%20Sustainable%20Diet.pdf", type: "document" }
      ]
    },
    {
      id: 2,
      title: "Our Choices Matter",
      description: "Explain how food is linked to big environmental issues and describe the benefits of healthy food for you and the planet.",
      time: "6 mins",
      type: "video",
      videoId: "EyvgpqEGjcU",
      image: "https://img.youtube.com/vi/EyvgpqEGjcU/maxresdefault.jpg",
      objectives: [
        "Explain how food is linked to big environmental issues.",
        "Describe the benefits of healthy food for you and for the planet.",
        "Explain how your food choices can have an impact on the planet and other people."
      ],
      actionSteps: [
        "Connect food to environmental issues: Match one food-related practice to one environmental issue.",
        "Health–planet benefit pairing: Choose one healthy food choice and list benefits.",
        "Personal impact reflection: Think about one food choice and its effect.",
        "Key takeaway identification: Write down one key message that changed your thinking."
      ],
      supplements: [
        { title: "Our Choices Matter", url: "/new_supplements/Our%20Choices%20Matter.pdf", type: "document" }
      ]
    },
    {
      id: 3,
      title: "Buying Food Locally",
      description: "Discuss the environmental and social impact of foods depending on where and how it was produced and transported.",
      time: "6 mins",
      type: "video",
      videoId: "qq-QkVbUEVM",
      image: "https://img.youtube.com/vi/qq-QkVbUEVM/maxresdefault.jpg",
      objectives: [
        "Discuss the environmental and social impact of foods based on production and transport.",
        "Compare the environmental footprint of food products depending on origin and seasonality.",
        "Prioritize actions to reduce the negative impact of the foods you eat."
      ],
      actionSteps: [
        "Production and transport awareness: Identify origin of a common food item.",
        "Footprint comparison: Compare local vs imported options.",
        "Impact-reduction prioritisation: Select one strategy to reduce negative impact.",
        "Feasibility check: Identify barriers and solutions."
      ],
      supplements: [
        { title: "Buying Food Locally", url: "/new_supplements/Module%203-1.png", type: "image" },
        { title: "Buying Food Locally", url: "/new_supplements/Module%203-2.png", type: "image" }
      ]
    },
    {
      id: 4,
      title: "Reading Labels",
      description: "Identify information on food labels that is important to you and make informed choices when shopping.",
      time: "7 mins",
      type: "video",
      videoId: "7KW57Vo3WWE",
      image: "https://img.youtube.com/vi/7KW57Vo3WWE/maxresdefault.jpg",
      objectives: [
        "Identify information on food labels that is important to you.",
        "Make informed choices when shopping for food that is good for your health and the planet.",
        "Construct nutritious and well-balanced meals."
      ],
      actionSteps: [
        "Label scanning and prioritisation: Identify three label details that matter most.",
        "Health—environment trade-off check: Compare two products using labels.",
        "Real-life application: Identify one small change for next shopping trip."
      ],
      supplements: [
        { title: "Reading Labels", url: "/new_supplements/Reading%20Labels.pdf", type: "document" }
      ]
    },
    {
      id: 5,
      title: "Malaysian Healthy Plate",
      description: "Describe the key components and proportions of the Malaysian Healthy Plate and apply it to everyday meals.",
      time: "4 mins",
      type: "video",
      videoId: "D8FQgpD_Fjw",
      image: "https://img.youtube.com/vi/D8FQgpD_Fjw/hqdefault.jpg",
      objectives: [
        "Describe the key components and proportions of the Malaysian Healthy Plate.",
        "Apply the Malaysian Healthy Plate model to construct nutritionally balanced meals."
      ],
      actionSteps: [
        "Plate recognition: Identify proportions of MHP components.",
        "Meal assessment: Compare a recent meal with the MHP model.",
        "Plate reconstruction: Redesign a meal to align with MHP.",
        "Real-life commitment: Set a goal for your next meal."
      ],
      supplements: [
        { title: "Malaysian Healthy Plate", url: "/new_supplements/Module%205-1.png", type: "image" },
        { title: "Malaysian Healthy Plate", url: "/new_supplements/Module%205-2.png", type: "image" }
      ]
    },
    {
      id: 6,
      title: "Fruits & Vegetables",
      description: "Understand the health/environmental benefits of higher F/V intake and strategies to increase it.",
      time: "5 mins",
      type: "video",
      videoId: "qJsjpo7Pi8I",
      image: "https://img.youtube.com/vi/qJsjpo7Pi8I/hqdefault.jpg",
      objectives: [
        "Understand health/environmental benefits of higher vegetable and fruit intake.",
        "Identify recommended daily servings based on Malaysian Dietary Guidelines.",
        "Apply strategies to increase intake in daily meals."
      ],
      actionSteps: [
        "Intake awareness: Review daily serving intake.",
        "Meal upgrade: Identify one way to increase F/V in a regular meal.",
        "Simple plant-forward swap: Commit to one change for the week."
      ],
      supplements: [
        { title: "Fruits & Vegetables", url: "/new_supplements/Module_6_nutrition_month_veg_split.pdf", type: "document" }
      ]
    },
    {
      id: 7,
      title: "Rice, other cereals, wholegrain cereal-based products and tubers",
      description: "Differentiate whole grains from refined carbohydrates and explain the benefits of choosing whole grains.",
      time: "3 mins",
      type: "video",
      videoId: "FpFywczIeVM",
      image: "https://img.youtube.com/vi/FpFywczIeVM/maxresdefault.jpg",
      objectives: [
        "Differentiate whole grains from refined carbohydrates.",
        "Explain health and sustainability benefits of whole grains.",
        "Identify whole-grain options in supermarkets/cafeterias."
      ],
      actionSteps: [
        "Identify your staples: List commonly consumed staples and classify them.",
        "Label-check practice: Identify if a grain product is whole grain.",
        "Swap challenge: Try a whole grain option this week."
      ],
      supplements: [
        { title: "Rice, other cereals, wholegrain cereal-based products and tubers", url: "/new_supplements/Module_7_nutrition_month_grains_split.pdf", type: "document" }
      ]
    },
    {
      id: 8,
      title: "Fish, poultry/eggs, legumes, milk & milk products",
      description: "Compare environmental impact of protein sources and select balanced, sustainable choices.",
      time: "3 mins",
      type: "video",
      videoId: "ZsFjCDL2-l8",
      image: "https://img.youtube.com/vi/ZsFjCDL2-l8/hqdefault.jpg",
      objectives: [
        "Describe recommended protein portions.",
        "Compare environmental impact of different protein sources.",
        "Select balanced and sustainable protein choices."
      ],
      actionSteps: [
        "Review past meals: Check frequency of red meat/poultry/seafood.",
        "Balanced protein planning: Plan a meal using alternative proteins.",
        "Sustainable protein choice: Choose lower-impact option when eating out."
      ],
      supplements: [
        { title: "Fish, poultry/eggs, legumes, milk & milk products", url: "/new_supplements/Module_8_nutrition_month_proteins_split.pdf", type: "document" }
      ]
    },
    {
      id: 9,
      title: "Food Waste & Packaging",
      description: "Discuss how food waste affects nature and society, and identify strategies to reduce it.",
      time: "5 mins",
      type: "video",
      videoId: "k-m0LDbkVhg",
      image: "https://img.youtube.com/vi/k-m0LDbkVhg/maxresdefault.jpg",
      objectives: [
        "Discuss how food waste and packaging affects nature/society.",
        "Distinguish necessary vs avoidable packaging.",
        "Identify strategies to prevent/reduce/recycle waste."
      ],
      actionSteps: [
        "Buy only what you can eat: Plan meals and check dates.",
        "Separate waste: Recycle and compost where possible.",
        "Reduce packaging: Bring reusable items."
      ],
      supplements: [
        { title: "Food Waste and Packaging", url: "/new_supplements/Food%20Waste%20and%20Packaging.pdf", type: "document" }
      ]
    },
    {
      id: 10,
      title: "Changing Eating Habits",
      description: "Explain why we need to act for sustainable food systems and identify personal actions.",
      time: "7 mins",
      type: "video",
      videoId: "Aah3Q9SO5wg",
      image: "https://img.youtube.com/vi/Aah3Q9SO5wg/maxresdefault.jpg",
      objectives: [
        "Explain why we need sustainable food systems.",
        "Identify actions for a sustainable diet.",
        "Discuss personal connection to food."
      ],
      actionSteps: [
        "Conscious choice: Eat less meat, more plants.",
        "Educate others: Set an example.",
        "Enjoy nutritious meals with friends/family."
      ],
      supplements: [
        { title: "Changing Eating Habits", url: "/new_supplements/change%20eat%20habits.pdf", type: "document" },
        { title: "Changing Eating Habits", url: "/new_supplements/nutrition%20month%20upf.pdf", type: "document" }
      ]
    },
    {
      id: 11,
      title: "My Plate, My Pledge",
      description: "Reflect on current behaviors and develop a personalized sustainable eating pledge.",
      time: "5 mins",
      type: "review",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
      objectives: [
        "Reflect on eating behaviors.",
        "Identify 2–3 sustainable practices to maintain.",
        "Develop a personalized pledge.",
        "Formulate an action plan."
      ],
      actionSteps: [
        "Complete your pledge.",
        "Share your pledge with a friend."
      ],
      slug: "my-plate-my-pledge"
    },
    {
      id: 12,
      title: "Review",
      description: "A comprehensive review of sustainable eating resources and guidelines.",
      time: "10 mins",
      type: "review",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200",
      objectives: [
        "Review key sustainable diet principles and guidelines.",
        "Access additional resources for continuous learning.",
        "Reflect on the journey through all previous modules."
      ],
      actionSteps: [
        "Download and review the FAQ guide.",
        "Explore the sustainability website for more tips.",
        "Share your favorite takeaway with the community."
      ],
      supplements: [
        { title: "Album Makanan Malaysia", url: "/supplements/Album Makanan Malaysia.pdf", type: "document" },
        { title: "Built a Healthy Eating Routine", url: "/supplements/Built a Healthy Eating Routine.pdf", type: "document" },
        { title: "Cut Down on Added Sugar", url: "/supplements/Cut Down on Added Sugar.pdf", type: "document" },
        { title: "Eating Patterns for Health and Environment Sustainability", url: "/supplements/Eating Patterns for Health and Environment Sustainability.pdf", type: "document" },
        { title: "Frequently Asked Questions with Sustainable Diet", url: "/supplements/Frequently Asked Questions with Sustainable Diet.pdf", type: "document" },
        { title: "Glossary of Key Terms and Ideas with Sustainable Diet", url: "/supplements/Glossary of Key Terms and Ideas with Sustainable Diet.pdf", type: "document" },
        { title: "Make Healthy Drink Choice", url: "/supplements/Make Healthy Drink Choice.pdf", type: "document" },
        { title: "Making our favourite meals more Sustainable", url: "/supplements/Making our favourite meals more Sustainable.pdf", type: "document" },
        { title: "Nutritionals per Single Serving", url: "/supplements/Nutritionals per Single Serving.pdf", type: "document" },
        { title: "Sustainable Diets Guidelines", url: "/supplements/Sustainable Diets Guidelines.pdf", type: "document" },
        { title: "Healthy and Sustainable Food@UM", url: "https://sustainability.um.edu.my/healthy-and-sustainable-food-um", type: "link" },
        { title: "Reference", url: "/supplements/Reference.png", type: "image" }
      ]
    }
  ];

  // Add slugs to all modules
  modules.forEach(m => {
    if (!m.slug) {
      m.slug = m.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
  });

  // --- Actions ---
  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const openModule = (module) => {
    navigate(`/modules/${module.slug}`);
    window.scrollTo(0, 0);
  };

  const toggleAction = (moduleId, actionIndex) => {
    setCompletedActions(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [actionIndex]: !prev[moduleId]?.[actionIndex]
      }
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setUser({ name: "Student", email: "student@um.edu.my" });
      navigate('/');
    }, 500);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleDownloadCertificate = () => {
    const userName = user?.name || "Participant";
    const dateStr = new Date().toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' });

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow pop-ups to download your certificate.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>NourishUM Certificate of Commitment</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600;700&display=swap');
            
            body { 
              font-family: 'Inter', sans-serif; 
              text-align: center; 
              background-color: #f0f4c3; 
              margin: 0;
              display: flex;
              justify-content: center;
              padding: 2rem;
              min-height: 100vh;
              align-items: center;
            }
            .certificate-wrapper {
              background-color: white;
              padding: 40px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.15);
              max-width: 900px;
              width: 100%;
              position: relative;
            }
            .certificate-border {
              border: 12px solid #D4E157;
              padding: 60px 40px;
              position: relative;
            }
            .inner-border {
              position: absolute;
              top: 10px; left: 10px; right: 10px; bottom: 10px;
              border: 2px solid #827717;
            }
            .logo-icon {
              font-size: 48px;
              margin-bottom: 20px;
            }
            h1 { 
              font-family: 'Playfair Display', serif;
              color: #827717; 
              font-size: 54px; 
              margin: 0 0 10px 0;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            h2 { 
              color: #333; 
              font-size: 24px; 
              margin-top: 0;
              font-weight: 300;
              letter-spacing: 4px;
              text-transform: uppercase;
              margin-bottom: 40px;
            }
            p { 
              font-size: 20px; 
              color: #555; 
              line-height: 1.6; 
              margin: 0;
            }
            .name { 
              font-family: 'Playfair Display', serif;
              font-size: 48px; 
              font-weight: 700; 
              color: #2c3e50; 
              margin: 30px 0; 
              border-bottom: 2px solid #D4E157; 
              display: inline-block; 
              padding-bottom: 5px; 
              min-width: 400px;
            }
            .reason {
              font-size: 22px;
              max-width: 600px;
              margin: 0 auto;
              color: #666;
            }
            .signature-area { 
              margin-top: 80px; 
              display: flex; 
              justify-content: space-around; 
            }
            .signature-block {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .signature-line { 
              border-top: 2px solid #333; 
              width: 250px; 
              padding-top: 10px; 
              color: #333; 
              font-weight: 600;
              text-transform: uppercase;
              font-size: 14px;
              letter-spacing: 1px;
            }
            .date-val { 
              font-family: 'Playfair Display', serif;
              font-size: 24px; 
              margin-bottom: 5px;
              color: #333;
            }
            
            @media print {
              @page { size: landscape; margin: 0; }
              body { background-color: white; padding: 0; display: block;}
              .certificate-wrapper { box-shadow: none; padding: 2cm; max-width: 100%; height: 100vh; box-sizing: border-box;}
            }
            
            .print-btn {
              position: fixed;
              top: 20px;
              right: 20px;
              background: #827717;
              color: white;
              border: none;
              padding: 10px 20px;
              font-size: 16px;
              border-radius: 5px;
              cursor: pointer;
              font-family: 'Inter', sans-serif;
              font-weight: bold;
              box-shadow: 0 4px 6px rgba(0,0,0,0.2);
              z-index: 100;
            }
            @media print {
              .print-btn { display: none; }
            }
          </style>
        </head>
        <body>
          <button class="print-btn" onclick="window.print()">Print / Save PDF</button>
          <div class="certificate-wrapper">
            <div class="certificate-border">
              <div class="inner-border"></div>
              <div class="logo-icon">🌱</div>
              <h1>Certificate of Commitment</h1>
              <h2>NourishUM Sustainable Diet Program</h2>
              
              <p style="margin-top: 40px; font-style: italic;">This is to certify that</p>
              
              <div class="name">${userName}</div>
              
              <div class="reason">
                has successfully completed the NourishUM modules and has pledged to lead and promote sustainable food habits for personal health and environmental sustainability.
              </div>
              
              <div class="signature-area">
                <div class="signature-block">
                  <div class="date-val">${dateStr}</div>
                  <div class="signature-line">Date</div>
                </div>
                <div class="signature-block">
                  <div class="date-val" style="font-style: italic; color: #827717;">NourishUM Team</div>
                  <div class="signature-line">Program Organizers</div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();

    // Automatically trigger print dialog after fonts load
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 1000);
  };

  // --- Sub-Components ---

  const QuizView = () => (
    <div className="flex-grow bg-[#F9FBE7] py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-handwriting">Quiz</h1>
          <div className="h-1 w-24 bg-[#D4E157] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge on sustainable diets and healthy eating habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Sustainable Diet Basics", description: "Test your understanding of sustainable diet principles and components.", link: "https://docs.google.com/forms/d/e/1FAIpQLSctqUuTHVofFWiRGZVWoJQXuIgipANhYjXwEPMgVASCXczsww/viewform" },
            { title: "Food Labels & Choices", description: "Check your knowledge on reading food labels and making informed choices.", link: "https://docs.google.com/forms/d/e/1FAIpQLSctqUuTHVofFWiRGZVWoJQXuIgipANhYjXwEPMgVASCXczsww/viewform" }
          ].map((quiz, idx) => (
            <a
              key={idx}
              href={quiz.link}
              target="_blank"
              rel="noreferrer"
              className="block p-6 rounded-2xl border-2 border-gray-800 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-center mb-3">
                <div className="bg-[#F0F4C3] p-3 rounded-xl mr-4 border border-gray-200">
                  <Target size={24} className="text-[#827717]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#827717] transition-colors">{quiz.title}</h3>
              </div>
              <p className="text-gray-500 ml-16">{quiz.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  const ResourcesView = () => (
    <div className="flex-grow bg-[#F9FBE7] py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-handwriting">Resources</h1>
          <div className="h-1 w-24 bg-[#D4E157] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated list of materials and external links to help you build and maintain a sustainable diet.
          </p>
        </div>

        <div className="space-y-6">
          {[
{ title: "Sustainable Food@UM", url: "https://sustainability.um.edu.my/healthy-and-sustainable-food-um", type: "link" },
            { title: "Link for questionnaire (4-6 minutes)", url: "https://docs.google.com/forms/d/e/1FAIpQLSctqUuTHVofFWiRGZVWoJQXuIgipANhYjXwEPMgVASCXczsww/viewform", type: "link" },
            { title: "Link for food image submitting", url: "https://docs.google.com/forms/d/e/1FAIpQLSdcF17wCjv80idWm1dBRlnJk8xhR5sNIXz4tOMNLEgRpZW6Yg/viewform?usp=publish-editor", type: "link" },
            { title: "Reference", url: "/new_supplements/Reference.png", type: "document" }
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center p-6 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all group cursor-pointer"
            >
              <div className="bg-gray-50 p-4 rounded-xl mr-6 border border-gray-100">
                <ExternalLink size={28} className="text-gray-500" />
              </div>
              <span className="text-xl justify-center font-medium text-gray-700">{item.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );


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
            <>Don't have an account? <Link to="/signup" className="text-[#827717] font-bold hover:underline">Sign up</Link></>
          ) : (
            <>Already have an account? <Link to="/login" className="text-[#827717] font-bold hover:underline">Log in</Link></>
          )}
        </div>
      </div>
    </div>
  );

  // Memoized VideoPlayer to prevent re-renders when other state changes (like checkboxes)
  const VideoPlayer = React.memo(({ videoId, title }) => {
    return (
      <div className="bg-black rounded-lg overflow-hidden aspect-video border border-gray-800 shadow-inner">
        {videoId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
            <p>Video content unavailable</p>
          </div>
        )}
      </div>
    );
  });

  // New Memoized SupplementPreview component with improved UI
  const SupplementPreview = React.memo(({ url, title, type = 'document', items = [] }) => {
    const isImageMode = type === 'image' || (items.length > 0 && items[0].type === 'image');
    const mainUrl = items.length > 0 ? items[0].url : url;

    return (
      <div className="border-2 border-gray-800 rounded-xl overflow-hidden bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        {/* macOS-style Window Header */}
        <div className="bg-white px-4 py-3 border-b-2 border-gray-800 flex items-center justify-between">
          <div className="flex space-x-2 w-20">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10"></div>
          </div>

          <div className="flex-grow text-center">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-widest flex items-center justify-center">
              {isImageMode ? (
                <PlayCircle size={14} className="mr-2 text-[#827717]" />
              ) : (
                <FileText size={14} className="mr-2 text-[#827717]" />
              )}
              {title}
            </span>
          </div>

          <div className="flex justify-end w-20">
            <a
              href={mainUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-black"
              title="Open in new window"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full bg-[#F5F5F5] overflow-y-auto custom-scrollbar max-h-[700px]">
          {items.length > 0 ? (
            <div className="p-4 md:p-8 space-y-8">
              {items.map((item, idx) => (
                <div key={idx} className="group relative">
                  {item.type === 'image' ? (
                    <div className="bg-white p-3 rounded-lg border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transform transition-transform group-hover:scale-[1.02] duration-300">
                      <img src={item.url} alt={item.title} className="w-full h-auto rounded-sm object-contain" />
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 italic">{item.title}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg border-2 border-gray-800 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
                      <iframe
                        src={`${item.url}#toolbar=0`}
                        title={item.title}
                        className="w-full h-[600px] border-none"
                      ></iframe>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            type === 'image' ? (
              <div className="p-4 md:p-8 flex justify-center">
                <div className="bg-white p-3 rounded-lg border-2 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] max-w-2xl">
                  <img src={url} alt={title} className="w-full h-auto rounded-sm object-contain" />
                </div>
              </div>
            ) : (
              <iframe
                src={`${url}#toolbar=0`}
                title={title}
                className="w-full h-[700px] border-none"
                style={{ minHeight: '700px' }}
              ></iframe>
            )
          )}
        </div>
      </div>
    );
  });

  const ModuleDetailView = () => {
    const { slug } = useParams();
    const module = modules.find(m => m.slug === slug);

    if (!module) return (
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Module not found</h2>
          <Link to="/" className="text-[#827717] font-bold hover:underline">Back to Home</Link>
        </div>
      </div>
    );

    const progress = completedActions[module.id]
      ? (Object.values(completedActions[module.id]).filter(Boolean).length / module.actionSteps.length) * 100
      : 0;

    const nextModule = modules.find(m => m.id === module.id + 1);

    return (
      <div className="flex-grow bg-[#FFFFF0] min-h-screen font-sans">
        {/* Navigation Header */}
        <div className="bg-white border-b sticky top-[64px] z-40 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center text-gray-500 hover:text-[#D4E157] transition font-medium"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-semibold text-[#827717]">Module {module.id} of {modules.length}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Title Section */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-handwriting">{module.title}</h1>
            <div className="h-1 w-24 bg-[#D4E157] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {/* Box 1: What will you learn? (Objectives) */}
            {module.id !== 11 && module.id !== 12 && (
              <div className="border-2 border-gray-800 rounded-lg p-6 md:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] transition-shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="bg-[#D4E157] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm border border-gray-800">1</span>
                  {module.id === 11 ? "What Actions will You Pledge to Take?" : "What will you learn?"}
                </h2>
                {module.id === 11 ? (
                  <textarea
                    className="w-full h-32 p-4 border-2 border-dashed border-gray-300 rounded-lg focus:border-[#D4E157] focus:ring-0 active:outline-none resize-none font-sans text-gray-700 placeholder-gray-400"
                    placeholder="Share your pledge here..."
                  ></textarea>
                ) : (
                  <ul className="space-y-3 pl-3">
                    {module.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-lg">
                        <span className="mr-3 text-[#827717] font-bold">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Box 2: Video - Only show if NOT module 11 or 12 */}
            {module.id !== 11 && module.id !== 12 && (
              <div className="border-2 border-gray-800 rounded-lg p-6 md:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] transition-shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="bg-[#D4E157] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm border border-gray-800">2</span>
                  Video: {module.title} <span className="text-gray-500 font-normal text-base ml-2">({module.time})</span>
                </h2>
                <VideoPlayer videoId={module.type === 'video' ? module.videoId : null} title={module.title} />
              </div>
            )}

            {/* Box 3: Factsheet / Supplements or Pledge List */}
            <div className="border-2 border-gray-800 rounded-lg p-6 md:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-start">
                {module.id !== 12 && (
                  <span className="bg-[#D4E157] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm border border-gray-800 flex-shrink-0 mt-1">{module.id === 11 ? 1 : 3}</span>
                )}
                {module.id === 11 ? (
                  <span className="text-xl leading-relaxed">Read the list of actions you can take to lead and promote sustainable food habits. Which ones will you pledge? Check the boxes next to your pledges before downloading your certificate!</span>
                ) : (
                  <span>Visual Guide: {module.title}</span>
                )}
              </h2>

              {module.id === 11 ? (
                <div className="space-y-4">
                  {[
                    "Opt for foods that have a lower climate footprint and try to reduce my meat consumption.",
                    "Look for foods that show that the environment, workers, and local communities were respected in the food production.",
                    "Choose local and seasonal food whenever available; buy frozen / canned food is local and seasonal is not available.",
                    "Consult the labels to ensure I am buying nutritious and varied foods, in line with dietary guidelines.",
                    "Choose whole grain instead of white flour, eat less sugar, fat, and salt, avoid overeating, and drink more water.",
                    "Eat more fruits and vegetables and try to swap animal protein for plant-based ones.",
                    "Cook more at home, use local ingredients and test traditional recipes and methods.",
                    "Shop only what I need, pay attention to expiration dates, opt for smaller portions, use all parts of food products, and compost. This way I will reduce my food waste.",
                    "Reduce food-related packaging by refusing plastic straws and cutlery and using my own food containers, bottles, and shopping bag.",
                    "I will sort my waste and dispose of recyclable materials in designated containers.",
                    "Educate my family, friends, and co-workers about the benefits of having a sustainable diet and our role as consumers.",
                    "Deepen my understanding on the link between food, health and the planet and try to invent new solutions myself"
                  ].map((pledge, idx) => (
                    <div key={idx} className="flex items-start group mb-8 pl-2">
                      <input
                        type="checkbox"
                        id={`pledge-${idx}`}
                        className="mt-1 mr-5 w-6 h-6 flex-shrink-0 rounded bg-white border-2 border-gray-300 text-blue-500 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer transition-colors duration-200 shadow-sm"
                      />
                      <label
                        htmlFor={`pledge-${idx}`}
                        className="text-[1.1rem] text-gray-700 cursor-pointer group-hover:text-gray-900 leading-relaxed block w-full pt-px"
                      >
                        {pledge}
                      </label>
                    </div>
                  ))}

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <label className="block text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <span className="bg-[#D4E157] w-2 h-6 mr-3 rounded-full"></span>
                      Anything else you pledge to do?
                    </label>
                    <textarea
                      className="w-full h-24 p-4 border-2 border-dashed border-gray-300 rounded-lg focus:border-[#D4E157] hover:border-[#D4E157] focus:ring-0 active:outline-none resize-none font-sans text-gray-700 placeholder-gray-400 transition-colors"
                      placeholder="Type your additional pledges here..."
                    ></textarea>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
                    <button onClick={handleDownloadCertificate} className="bg-[#D4E157] hover:bg-[#c0ca33] text-gray-900 font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center border border-gray-800">
                      <Award className="mr-2" size={24} />
                      Download Certificate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  {module.supplements && module.supplements.length > 0 ? (
                    <>
                      {/* 1. Show external links first (if any) */}
                      {module.supplements.filter(item => item.type === 'link').map((item, idx) => (
                        <div key={idx} className="mb-4 last:mb-0">
                          <a
                            href={item.url || "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center p-5 rounded-xl border border-gray-200 bg-white hover:border-[#D4E157] hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer"
                          >
                            <div className="bg-gray-50 p-3 rounded-lg mr-5 group-hover:bg-[#F0F4C3] transition-colors border border-gray-100 group-hover:border-[#D4E157]">
                              <ExternalLink size={24} className="text-gray-500 group-hover:text-[#827717]" />
                            </div>
                            <span className="text-[1.1rem] font-medium text-gray-700 group-hover:text-gray-900">{item.title}</span>
                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity bg-gray-50 p-2 rounded-full group-hover:bg-[#F0F4C3]">
                              <ExternalLink size={18} className="text-gray-400 group-hover:text-[#827717]" />
                            </div>
                          </a>
                        </div>
                      ))}

                      {/* 2. Show Visual Guide Previews (Images/PDFs) */}
                      {module.supplements.some(item => item.type !== 'link') && (
                        <div className="space-y-4 mt-4">
                          {/* All images in a consolidated gallery */}
                          {module.supplements.some(item => item.type === 'image') && (
                            <SupplementPreview
                              title={module.title}
                              items={module.supplements.filter(item => item.type === 'image')}
                            />
                          )}

                          {/* All PDFs mapped to their own individual preview boxes */}
                          {module.supplements.filter(item => item.type === 'document').map((item, idx) => (
                            <SupplementPreview
                              key={`doc-${idx}`}
                              url={item.url}
                              title={item.title}
                              type={item.type}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500 italic p-4 border-2 border-dashed border-gray-200 rounded">No visual guide available for this module yet.</p>
                  )}
                </div>
              )}
            </div>

            {/* Box 4: Action Steps */}
            {module.id !== 12 && (
              <div className="border-2 border-gray-800 rounded-lg p-6 md:p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <CheckSquare size={100} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center relative z-10">
                  <span className="bg-[#D4E157] w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm border border-gray-800">{module.id === 11 ? 2 : 4}</span>
                  Action steps:
                </h2>
                <div className="space-y-4 relative z-10">
                  {module.actionSteps.map((step, idx) => {
                    const isCompleted = completedActions[module.id]?.[idx];
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded border-2 transition-all cursor-pointer flex items-start ${isCompleted ? 'bg-[#F0F4C3] border-[#827717]' : 'bg-white border-gray-200 hover:border-gray-400'}`}
                        onClick={() => toggleAction(module.id, idx)}
                      >
                        <div className={`w-6 h-6 border-2 rounded mr-4 mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${isCompleted ? 'bg-[#827717] border-[#827717]' : 'border-gray-400 bg-white'}`}>
                          {isCompleted && <CheckCircle size={14} className="text-white" />}
                        </div>
                        <p className={`text-lg ${isCompleted ? 'text-gray-600 line-through' : 'text-gray-800'}`}>{step}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">Progress: {Math.round(progress)}%</span>
                  <div className="w-1/3 bg-gray-200 rounded-full h-2">
                    <div className="bg-[#827717] h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 flex justify-end">
            {nextModule && module.id !== 11 ? (
              <button
                onClick={() => openModule(nextModule)}
                className="group flex items-center bg-black text-white px-6 py-3 rounded-full hover:bg-[#827717] transition shadow-lg font-bold text-lg"
              >
                Next: {nextModule.title}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link
                to="/"
                className="group flex items-center bg-[#D4E157] text-gray-800 border border-black px-6 py-3 rounded-full hover:bg-[#F0F4C3] transition shadow-lg font-bold text-lg"
              >
                Complete Course
                <CheckCircle size={20} className="ml-2" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <>
      <section className="relative text-white overflow-hidden min-h-[1050px] md:min-h-[1100px]">
        {/* Background image - centered to show full scene including people */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Background"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 35%' }}
          />
          {/* Left-side gradient for text readability over Petronas towers area */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
        </div>

        {/* Text on LEFT side (Petronas towers / sky area) */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="w-full md:w-1/2 px-8 md:px-14 space-y-5">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#D4E157] animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wide uppercase text-white">Sustainable Diet Program</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl">
              Nourish Your Body<br />
              <span className="text-[#D4E157]">Heal The Planet</span>
            </h2>

            <p className="text-lg text-white font-medium leading-relaxed drop-shadow-lg border-l-4 border-[#D4E157] pl-4 max-w-sm">
              Empowering UM students with knowledge for a sustainable lifestyle. Join the movement today.
            </p>

            <div className="pt-2">
              <button
                onClick={() => document.getElementById('modules').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#D4E157] text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl flex items-center group"
              >
                Explore Modules
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="modules" className="bg-[#f8f9fa] pt-10 pb-20 px-4 flex-grow relative">
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-gray-100 to-transparent opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#827717] font-bold tracking-wider uppercase text-sm bg-[#F0F4C3] px-3 py-1 rounded-full">Curriculum</span>
            <h2 className="text-4xl md:text-5xl text-gray-800 font-bold">Your Learning Journey</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Detailed modules designed to transform your understanding of sustainable diet.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {modules.filter(m => m.id !== 12).map((module) => (
              <div
                key={module.id}
                onClick={() => openModule(module)}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] xl:w-[calc(25%-1.5rem)] group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-0 flex flex-col h-full ring-1 ring-gray-100"
              >
                <div className="relative h-56 overflow-hidden bg-[#2E7D32]">
                  {/* Dynamic text-based Module banner replacing the old image */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#388E3C] to-[#4CAF50] group-hover:from-[#2E7D32] group-hover:to-[#388E3C] transition-colors duration-500">
                    <div className="transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-1">
                      <span className="text-4xl font-black text-[#FFF176] uppercase tracking-wider drop-shadow-md">
                        Module {module.id}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 m-3 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md bg-black/40 shadow-sm border border-white/10">
                    {module.time}
                  </div>

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-opacity duration-300"></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/50 shadow-2xl mt-16">
                      <PlayCircle className="text-white w-10 h-10" fill="currentColor" stroke="none" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow bg-white relative">
                  <h4 className="font-bold text-gray-800 text-xl mb-3 leading-snug group-hover:text-[#6e7aba] transition-colors">{module.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">{module.description}</p>

                  <div className="border-t border-gray-100 pt-4 mt-auto flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center font-medium"><BookOpen size={16} className="mr-2 text-gray-300" /> {module.actionSteps.length} Steps</span>
                    <span className="font-bold text-[#7986CB] bg-[#E8EAF6] px-3 py-1.5 rounded-lg group-hover:bg-[#7986CB] group-hover:text-white transition-all inline-flex items-center">Start <ChevronRight size={14} className="ml-1" /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FFFFF0]">
      <header className="bg-[#D4E157] text-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md transform rotate-3">
              <span className="text-2xl">🌱</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">NourishUM</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 font-semibold">
            <Link to="/" className={`hover:bg-white/20 px-3 py-1 rounded transition-colors ${location.pathname === '/' ? 'bg-white/20' : ''}`}>Curriculum</Link>
            <Link to="/quiz" className={`hover:bg-white/20 px-3 py-1 rounded transition-colors ${location.pathname === '/quiz' ? 'bg-white/20' : ''}`}>Quiz</Link>
            <Link to="/resources" className={`hover:bg-white/20 px-3 py-1 rounded transition-colors ${location.pathname === '/resources' ? 'bg-white/20' : ''}`}>Resources</Link>

            {user ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-gray-600/20">
                <div className="text-right leading-tight">
                  <div className="text-xs font-normal">Welcome back,</div>
                  <div className="text-sm font-bold">{user.name}</div>
                </div>
                <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-700 transition shadow">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition shadow hover:shadow-lg transform hover:-translate-y-0.5">
                Login
              </Link>
            )}
          </nav>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#c0ca33] px-4 py-4 space-y-4 shadow-inner">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block hover:text-white w-full text-left font-medium">Curriculum</Link>
            <Link to="/quiz" onClick={() => setIsMenuOpen(false)} className="block hover:text-white w-full text-left font-medium">Quiz</Link>
            <Link to="/resources" onClick={() => setIsMenuOpen(false)} className="block hover:text-white w-full text-left font-medium">Resources</Link>
            {user ? (
              <button onClick={handleLogout} className="w-full bg-gray-800 text-white px-5 py-3 rounded-lg font-bold">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full bg-gray-800 text-white px-5 py-3 rounded-lg font-bold text-center">Login</Link>
            )}
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/quiz" element={<QuizView />} />
          <Route path="/resources" element={<ResourcesView />} />
          <Route path="/login" element={<AuthView type="login" />} />
          <Route path="/signup" element={<AuthView type="signup" />} />
          <Route path="/modules/:slug" element={<ModuleDetailView />} />
        </Routes>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4 text-white">
              <span className="text-2xl">🌱</span>
              <span className="text-xl font-bold">NourishUM</span>
            </div>
            <p className="text-sm">A student-led initiative for sustainable eating at UM.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Twitter className="hover:text-[#D4E157] cursor-pointer" />
              <Facebook className="hover:text-[#D4E157] cursor-pointer" />
              <Instagram className="hover:text-[#D4E157] cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-xs">
          &copy; 2026 NourishUM. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
