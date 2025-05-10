import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Users, 
  BarChart3, 
  FileText, 
  Database,
  Shield,
  Layers
} from 'lucide-react';
// import studentImage from 'public/staff-signup_side.jpg';
// import logoImage from 'public/staff-signup_side.jpg';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef({});

  const studentImage = 'public/human2.png';
    const logoImage = 'public/EduLogo.png';

  // Register section refs
  const registerSection = (id, ref) => {
    sectionsRef.current[id] = ref;
  };

  // Handle scrolling and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      Object.entries(sectionsRef.current).forEach(([id, ref]) => {
        if (ref && ref.offsetTop <= scrollPosition && 
            ref.offsetTop + ref.offsetHeight > scrollPosition) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const section = sectionsRef.current[id];
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img 
                src={logoImage} 
                alt="BabyCode Logo" 
                className="h-12 w-auto bg-slate-300 rounded-s-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/120x40?text=BabyCode';
                }}
              />
              <span className="ml-2 text-xl font-bold text-blue-600 dark:text-blue-400">
                EduPanel
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'home' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'features' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('demo')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'demo' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Demo
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === 'faq' 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                FAQ
              </button>
              
              <Link
                to="/staff-signup"
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Sign Up
              </Link>
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 rounded-md"
              >
                Log In
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg rounded-b-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('home')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                  activeSection === 'home'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                  activeSection === 'features'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('demo')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                  activeSection === 'demo'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Demo
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                  activeSection === 'faq'
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                FAQ
              </button>
              <div className="flex flex-col mt-4 space-y-2">
                <Link
                  to="/staff-signup"
                  className="px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Sign Up
                </Link>
                <Link
                  to="/"
                  className="px-4 py-2 text-center text-sm font-medium text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 rounded-md"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <section 
        id="home"
        ref={(el) => registerSection('home', el)}
        className="relative bg-white dark:bg-gray-900 pt-16 md:pt-20 lg:pt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Streamline Student Management with{' '}
                <span className="text-blue-600 dark:text-blue-400">EduPanel</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                An intuitive dashboard designed for educational institutions to manage students, track academic performance, and simplify administrative tasks.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/staff-signup"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 text-center"
                >
                  Get Started
                </Link>
                <button
                  onClick={() => scrollToSection('demo')}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300 text-gray-700 dark:text-gray-300 font-medium text-center flex items-center justify-center"
                >
                  View Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={studentImage}
                alt="Student Dashboard"
                className="rounded-lg shadow-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x400?text=Student+Dashboard';
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">500+</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Educational Institutions</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">25k+</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Students Managed</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">99.9%</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Uptime Reliability</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">45%</p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Admin Time Saved</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        id="features"
        ref={(el) => registerSection('features', el)}
        className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features For Educational Institutions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              EduPanel offers a comprehensive suite of tools to manage students, track performance, and streamline administrative workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Student Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easily add, edit, and manage student profiles with comprehensive information tracking and search capabilities.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Student profile creation and management</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Advanced searching and filtering</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Bulk import/export capabilities</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Powerful visualizations and analytics to track student performance, attendance, and key performance indicators.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Real-time performance tracking</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Course-wise enrollment statistics</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Customizable reporting tools</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Document Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Organize and manage student documents, certificates, and academic records in a secure digital repository.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Secure document storage</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Controlled access and permissions</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Version history and audit trails</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Data Export & Reporting
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Generate comprehensive reports and export data in multiple formats for analysis and record-keeping.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">PDF, Excel, and CSV exports</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Scheduled automated reports</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Custom report templates</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Security & Compliance
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enterprise-grade security and compliance features to protect sensitive student data.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Role-based access control</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Data encryption at rest and in transit</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Compliance with educational data standards</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Dark Mode Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fully customizable interface with light and dark mode options for optimal viewing comfort.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">System preference detection</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">One-click theme switching</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 dark:text-gray-300">Accessibility-focused design</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Demo Section */}
      <section 
        id="demo"
        ref={(el) => registerSection('demo', el)}
        className="bg-white dark:bg-gray-900 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              See EduPanel In Action
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Try out the demo version of our dashboard to experience all features without creating an account.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-6 md:p-8 bg-blue-600 text-white">
              <h3 className="text-2xl font-bold mb-2">Interactive Demo Dashboard</h3>
              <p>Explore all features with sample data. No login required.</p>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Our interactive demo gives you access to a fully-functional version of EduPanel with pre-populated sample data. Experience the intuitive interface, powerful analytics, and streamlined workflows.
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
              >
                Launch Demo Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-6 bg-green-600 text-white">
                <h3 className="text-xl font-bold mb-2">For Educational Institutions</h3>
                <p>Streamline student management and administrative tasks</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Comprehensive student database</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Performance tracking analytics</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Course management system</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Customizable reporting tools</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link
                    to="/staff-signup"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-300"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="p-6 bg-purple-600 text-white">
                <h3 className="text-xl font-bold mb-2">For IT Administrators</h3>
                <p>Secure, scalable, and easy to integrate</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Role-based access control</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">API integration capabilities</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">99.9% uptime guarantee</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">Enterprise-grade security</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section 
        id="faq"
        ref={(el) => registerSection('faq', el)}
        className="bg-gray-50 dark:bg-gray-800 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions about EduPanel? Find answers to common questions below.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                How does EduPanel handle data security?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                EduPanel employs industry-standard security practices including encryption for data at rest and in transit, role-based access controls, regular security audits, and compliance with educational data privacy regulations. All data is backed up daily and stored in secure, redundant systems.
              </p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Can EduPanel integrate with our existing school management system?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, EduPanel offers robust API integration capabilities that allow seamless connection with most popular school management systems, student information systems, and learning management platforms. Our team can provide custom integration solutions for proprietary systems as needed.
              </p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Is there a limit to the number of students we can manage?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                No, EduPanel is designed to scale with your institution. Whether you're managing a small class or a large university with thousands of students, our system can handle it efficiently. Different pricing tiers are available based on your institution's size and needs.
              </p>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Do you offer training and support?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely! All plans include access to our comprehensive knowledge base and video tutorials. Premium plans include personalized onboarding, dedicated support, and regular training sessions for staff. Our support team is available via chat, email, and phone during business hours.
              </p>
            </div>
            
            {/* FAQ Item 5 */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Can we customize reports and analytics?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, EduPanel offers extensive customization options for reports and analytics. You can create custom report templates, select specific metrics to track, and set up automated reporting schedules. Advanced filtering and visualization tools make it easy to gain insights from your data.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Still have questions? Contact our support team for assistance.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Student Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join hundreds of educational institutions that trust EduPanel for efficient student management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/staff-signup"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition duration-300"
            >
              Get Started Free
            </Link>
            <button
              onClick={() => scrollToSection('demo')}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
              View Demo
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src={logoImage} 
                  alt="BabyCode Logo" 
                  className="h-8 w-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/120x40?text=BabyCode';
                  }}
                />
                <span className="ml-2 text-xl font-bold text-white">
                  EduPanel
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Modern student management solution for educational institutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-13.997 0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('demo')} className="text-gray-400 hover:text-white">
                    Demo
                  </button>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/roadmap" className="text-gray-400 hover:text-white">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/docs" className="text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/api" className="text-gray-400 hover:text-white">
                    API
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="text-gray-400 hover:text-white">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row md:justify-between">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} EduPanel. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;