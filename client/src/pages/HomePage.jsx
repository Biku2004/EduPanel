import React from 'react';

// Placeholder for icons - in a real app, you'd use an icon library or SVGs
const Icon = ({ name, className }) => <span className={`italic ${className}`}>[{name}]</span>;

// 1. Sidebar Components
function NavItem({ iconName, label, active, notification, href = "#" }) {
  return (
    <a
      href={href}
      className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150
        ${active
          ? 'bg-rose-500 text-white rounded-lg mx-4 my-1 shadow-md'
          : 'text-slate-300 hover:bg-indigo-800 hover:text-white mx-4 my-1 rounded-lg'
        }`}
    >
      <Icon name={iconName} className="w-5 h-5 mr-3" />
      <span>{label}</span>
      {notification && <span className="ml-auto w-2 h-2 bg-rose-500 rounded-full"></span>}
    </a>
  );
}

function Sidebar() {
  const navItems = [
    { iconName: "DashboardAlt", label: "Dashboard", active: true },
    { iconName: "User", label: "Profile" },
    { iconName: "ChartBar", label: "Analysis" },
    { iconName: "DocumentReport", label: "Accounting" },
    { iconName: "Chat", label: "Messages", notification: true },
    { iconName: "Briefcase", label: "Projects" },
  ];
  const bottomNavItems = [
    { iconName: "Cog", label: "Settings" },
    { iconName: "InformationCircle", label: "Info" },
  ];

  return (
    <div className="w-64 bg-indigo-900 text-white flex flex-col flex-shrink-0 h-screen">
      <div className="p-6 flex items-center space-x-3 border-b border-indigo-800">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-700 font-bold text-xl">
          D
        </div>
        <span className="text-2xl font-bold">DesignHire</span>
      </div>
      <nav className="flex-1 mt-4 space-y-1">
        {navItems.map(item => <NavItem key={item.label} {...item} />)}
      </nav>
      <div className="p-4 mt-auto border-t border-indigo-800 space-y-1">
        {bottomNavItems.map(item => <NavItem key={item.label} {...item} />)}
      </div>
    </div>
  );
}

// 2. TopBar Components
function UserProfileDisplay() {
  return (
    <div className="flex items-center space-x-3">
      <img src="https://via.placeholder.com/40/A0AEC0/FFFFFF?text=E" alt="Emma Taylor" className="w-10 h-10 rounded-full" />
      <div>
        <div className="font-semibold text-sm text-slate-700">Emma Taylor</div>
        <div className="text-xs text-slate-500">UX/UI Designer</div>
      </div>
      <div className="relative">
        <button className="text-slate-500 p-1 hover:text-indigo-600">
          <Icon name="Bell" className="w-6 h-6" />
        </button>
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
          2
        </span>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <header className="bg-white p-4 flex justify-between items-center border-b border-slate-200 sticky top-0 z-10">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            <Icon name="Search" className="w-5 h-5" />
          </span>
        </div>
        <UserProfileDisplay />
        <button className="text-slate-500 hover:text-indigo-600 text-lg font-mono">
          {"</>"}
        </button>
      </div>
    </header>
  );
}

// 3. Dashboard Main Content Components
function Greeting() {
  return (
    <div className="flex items-center mb-6">
      <img src="https://via.placeholder.com/48/A0AEC0/FFFFFF?text=E" alt="Emma Taylor" className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h2 className="text-3xl font-semibold text-slate-800">Hello, Emma Taylor</h2>
        <p className="text-slate-500">Check your activities in this dashboard.</p>
      </div>
    </div>
  );
}

function StatCard({ iconName, title, value, change, iconBgColor, iconSymbol }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg flex items-center">
      <div className={`p-3 rounded-lg mr-4 ${iconBgColor} text-white text-2xl`}>
        {iconSymbol || <Icon name={iconName} />}
      </div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs text-green-500 font-semibold">{change}</p>
      </div>
    </div>
  );
}

function StatsGrid() {
  const stats = [
    { iconName: "CurrencyDollar", title: "Total Earning", value: "$22K", change: "+10.80%", iconBgColor: "bg-blue-500", iconSymbol: '$' },
    { iconName: "Upload", title: "Withdraw", value: "$10K", change: "+05.80%", iconBgColor: "bg-indigo-500", iconSymbol: '↑' },
    { iconName: "CheckCircle", title: "Total Projects", value: "15", change: "+10.80%", iconBgColor: "bg-green-500", iconSymbol: '✓' },
    { iconName: "PencilAlt", title: "Ongoing", value: "03", change: "+10.80%", iconBgColor: "bg-purple-500", iconSymbol: '✎' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
    </div>
  );
}

function AccountingChart() {
  const chartData = [
    { month: "Jan", value: 1100 }, { month: "Feb", value: 600 }, { month: "Mar", value: 1400 },
    { month: "Apr", value: 300 }, { month: "May", value: 2075, highlighted: true, label: "Design Studio", amount: "$2075", date: "March 05, 2020" },
    { month: "Jun", value: 800 }, { month: "Jul", value: 200 }, { month: "Aug", value: 1200 },
    { month: "Sep", value: 600 }, { month: "Oct", value: 2400 }, { month: "Nov", value: 900 },
  ];
  const maxValue = 2500;
  const yAxisLabels = [2500, 2000, 1500, 1000, 500, 0];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Accounting</h3>
          <p className="text-sm text-slate-500">Overall Earning</p>
        </div>
        <button className="text-sm text-slate-600 hover:text-indigo-600 flex items-center">
          Sort by: Monthly <Icon name="ChevronDown" className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="h-72 relative pr-4 pb-8"> {/* Chart Area */}
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-slate-500 pr-2">
          {yAxisLabels.map(label => <span key={label}>{label === 0 ? '00' : label}</span>)}
        </div>
        {/* Bars */}
        <div className="flex h-full items-end space-x-2 pl-10"> {/* pl-10 for y-axis width */}
          {chartData.map(data => (
            <div key={data.month} className="flex-1 flex flex-col items-center relative h-full justify-end">
              {data.highlighted && (
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white p-2.5 rounded-md shadow-lg text-xs w-36 text-center z-10">
                  <div className="font-medium">{data.label}</div>
                  <div className="font-bold text-base my-0.5">{data.amount}</div>
                  <div className="text-slate-300 text-[10px]">{data.date}</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-slate-800"></div>
                </div>
              )}
              <div
                className={`w-3/4 rounded-t-md transition-all duration-300 ease-out ${data.highlighted ? 'bg-indigo-700' : 'bg-indigo-300 hover:bg-indigo-400'}`}
                style={{ height: `${(data.value / maxValue) * 100}%` }}
                title={`${data.month}: ${data.value}`}
              ></div>
            </div>
          ))}
        </div>
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-10 right-0 flex justify-around text-xs text-slate-500 pt-3">
          {chartData.map(data => <span key={data.month} className="flex-1 text-center">{data.month}</span>)}
        </div>
      </div>
    </div>
  );
}

function ProjectItem({ name, client, role, date, status }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 py-4 border-b border-slate-100 last:border-b-0 text-sm">
      <span className="font-medium text-slate-700 col-span-2 md:col-span-1">{name}</span>
      <span className="text-slate-600">{client}</span>
      <span className="text-slate-600">{role}</span>
      <span className="text-slate-600">{date}</span>
      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold leading-tight
            ${status === 'Completed'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-600 border border-slate-300'
            }`}
        >
          {status}
        </span>
        <button className="text-slate-400 hover:text-indigo-600 p-1">
          <Icon name="DotsHorizontal" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    { name: "Dance studio - Webpage", client: "Sriram Sarvade", role: "CEO", date: "March 05, 2020", status: "Completed" },
    { name: "Real Estate Homepage", client: "Geeta Ingle", role: "Manager", date: "Dec 25, 2020", status: "Ongoing" },
  ];
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Projects</h3>
          <p className="text-sm text-slate-500">Overall Projects</p>
        </div>
        <button className="text-slate-500 p-2 hover:bg-slate-100 rounded-md">
          <Icon name="Filter" className="w-5 h-5" />
        </button>
      </div>
      <div className="hidden md:grid grid-cols-5 gap-4 py-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
        <span>Project Name</span>
        <span>Client Name</span>
        <span>Role</span>
        <span>Date</span>
        <span className="text-right">Status</span>
      </div>
      <div>
        {projects.map(project => <ProjectItem key={project.name} {...project} />)}
      </div>
    </div>
  );
}

function DashboardPrimaryContent() {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <Greeting />
      <StatsGrid />
      <AccountingChart />
      <ProjectsSection />
    </div>
  );
}

// 4. Right Info Panel Components
function DonutChartCard() {
  // Simplified Donut Chart - a real one would use SVG or a library
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Chart</h3>
      <div className="flex items-center justify-center relative mb-6 h-48 w-48 mx-auto">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            className="text-slate-200"
            strokeWidth="3.8"
            fill="none"
            stroke="currentColor"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-rose-500" // Withdraw Amount - Red/Pink part
            strokeWidth="3.8"
            fill="none"
            stroke="currentColor"
            strokeDasharray="17.7, 100" // 17.7% for Withdraw (100 - 82.3)
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
           <path
            className="text-indigo-500" // Balance Amount - Blue/Purple part
            strokeWidth="3.8"
            fill="none"
            stroke="currentColor"
            strokeDasharray="82.3, 100"
            strokeDashoffset="-17.7" // Offset to start after the red part
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-slate-700">82.3%</span>
        </div>
      </div>
      <div className="flex justify-around text-sm text-slate-600">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-rose-500 rounded-full mr-2"></span>
          <span>Withdraw Amount</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
          <span>Balance Amount</span>
        </div>
      </div>
    </div>
  );
}

function DatePill({ day, name, active, dots, color }) {
  return (
    <div
      className={`text-center p-2.5 rounded-lg w-14 cursor-pointer transition-colors
        ${active ? 'bg-indigo-700 text-white shadow-md' : 'hover:bg-slate-100'}`}
    >
      <div className="text-xs font-medium">{name}</div>
      <div className={`font-bold text-xl my-0.5 ${active ? '' : 'text-slate-700'}`}>{day}</div>
      <div className="flex justify-center mt-1 space-x-0.5">
        {Array(dots).fill(0).map((_, i) => (
          <span key={i} className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-white opacity-70' : color}`}></span>
        ))}
      </div>
    </div>
  );
}

function ScheduleEventItem({ title, description, iconName, colorClass, iconColorClass, iconBgClass }) {
  return (
    <div className={`p-3 rounded-lg ${colorClass} w-full`}>
      <div className="flex items-start">
        <div className={`p-2 rounded-md mr-3 ${iconBgClass}`}>
          <Icon name={iconName} className={`w-5 h-5 ${iconColorClass}`} />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-slate-800">{title}</h4>
          <p className="text-xs text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

function EventsTimeline({ events }) {
  const eventMap = events.reduce((acc, event) => {
    acc[event.time] = event;
    return acc;
  }, {});

  const timePoints = ["08 am", "09 am", "10 am", "11 am", "12 pm"];

  return (
    <div className="mt-6">
      {timePoints.map((time, index) => (
        <div
          key={time}
          className={`flex items-start py-1.5 ${index > 0 ? 'border-t border-slate-200' : ''}`}
          style={{ minHeight: '60px' }} // Ensure consistent height for slots
        >
          <div className="w-14 text-xs text-slate-500 shrink-0 pt-1 text-right pr-2">{time}</div>
          <div className="flex-grow pl-2 pt-1">
            {eventMap[time] ? (
              <ScheduleEventItem {...eventMap[time]} />
            ) : (
              <div className="h-10"></div> // Placeholder for empty slot visual consistency
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


function TodayScheduleCard() {
  const dates = [
    { day: "03", name: "Mon", dots: 3, color: "bg-red-300" },
    { day: "04", name: "Tue", dots: 1, color: "bg-yellow-300" },
    { day: "05", name: "Wed", active: true, dots: 3, color: "bg-blue-300" },
    { day: "06", name: "Thu", dots: 1, color: "bg-purple-300" },
    { day: "07", name: "Fri", dots: 2, color: "bg-green-300" },
  ];
  const scheduleEventsData = [
    { time: "09 am", title: "Client Meeting", description: "Design club client meeting to review the final design", iconName: "VideoCamera", colorClass: "bg-red-50", iconColorClass: "text-red-500", iconBgClass: "bg-red-100" },
    { time: "10 am", title: "Check List", description: "Complete the tasks in the check list", iconName: "ClipboardList", colorClass: "bg-indigo-50", iconColorClass: "text-indigo-500", iconBgClass: "bg-indigo-100" },
    { time: "12 pm", title: "Course", description: "Complete the ongoing design course", iconName: "AcademicCap", colorClass: "bg-amber-50", iconColorClass: "text-amber-500", iconBgClass: "bg-amber-100" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-slate-800">Today, 05 March</h3>
      <div className="flex justify-between my-5">
        {dates.map(d => <DatePill key={d.day} {...d} />)}
      </div>
      <EventsTimeline events={scheduleEventsData} />
    </div>
  );
}

function InfoPanel() {
  return (
    <div className="w-[26rem] p-6 space-y-6 flex-shrink-0 overflow-y-auto bg-slate-50">
      <DonutChartCard />
      <TodayScheduleCard />
    </div>
  );
}


// Main Dashboard Page Component
function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <DashboardPrimaryContent />
          <InfoPanel />
        </div>
      </div>
    </div>
  );
}

// App component to render the dashboard
function Homepage() {
  return <DashboardPage />;
}

export default Homepage;

// To make this runnable, you'd typically have a root index.js like:
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css'; // Assuming Tailwind CSS is set up here
// import App from './App';
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// And your index.html would have <div id="root"></div>
// Plus, Tailwind CSS setup (tailwind.config.js, postcss.config.js, and input.css)
