"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Car, Gauge, Settings, Gift, User, Menu, X } from "lucide-react";
import { RadialBarChart, RadialBar, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";
import useBenefitsStore from "@/store/useBenefitsStore";


const rewardData = [
  { name: "Points", value: 750 },
  { name: "Remaining", value: 250 },
];

const LIGHT_COLORS = ["#10B981", "#E5E7EB"];
const DARK_COLORS = ["#10B981", "#374151"];

export default function CredGarageDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const {
    benefits,
    loading: benefitsLoading,
    fetchBenefits,
  } = useBenefitsStore();

  useEffect(() => {
    fetchBenefits();
  }, []);

  useEffect(() => {
    const mode = localStorage.getItem("theme") === "light" ? false : true;
    setDarkMode(mode);
    document.documentElement.classList.toggle("dark", mode);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const currentColors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const tabItems = [
    { value: "overview", label: "Overview", icon: <Gauge /> },
    { value: "profile", label: "Profile", icon: <User /> },
    { value: "benefits", label: "Benefits", icon: <Gift /> },
    { value: "settings", label: "Settings", icon: <Settings /> },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } p-6 transition-colors`}
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          CRED Garage
        </h1>

        <div className="hidden sm:flex gap-4 items-center">
          <Switch checked={darkMode} onCheckedChange={toggleTheme} />
        </div>

        <div className="sm:hidden">
          <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 dark:bg-white text-white dark:text-black p-6 sm:hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Menu</h2>
            <Button variant="ghost" onClick={() => setMenuOpen(false)}>
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {tabItems.map((tab) => (
              <Button
                key={tab.value}
                variant={activeTab === tab.value ? "default" : "ghost"}
                onClick={() => {
                  setActiveTab(tab.value);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 justify-start text-lg"
              >
                {tab.icon} {tab.label}
              </Button>
            ))}
            <hr className="my-4 border-gray-600 dark:border-gray-300" />
            <Button
              variant="outline"
              className="border-white dark:border-black text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
            >
              + Add Vehicle
            </Button>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm">Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={toggleTheme} />
            </div>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Desktop Tabs */}
        <div className="hidden sm:block">
          <TabsList className="grid w-full grid-cols-4 gap-2 bg-gray-800 dark:bg-gray-200 rounded-xl p-1 text-black">
            {tabItems.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.icon} <span className="ml-1">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-gray-700 h-24" />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
            >
              {[
                { label: "Total Spent", value: "₹1,20,450", icon: <Gauge />, trend: "↑ 12% from last month" },
                { label: "Mileage", value: "15.2 km/l", icon: <Car />, trend: "↓ 0.5 km/l" },
                { label: "Services", value: "8 Times", icon: <Settings />, trend: "2 pending" },
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-gradient-to-br text-black from-gray-800 to-gray-900 border-gray-700 dark:from-gray-100 dark:to-gray-200 dark:border-gray-300 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-400 dark:text-gray-600 mb-1">
                            {stat.label}
                          </p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                            {stat.trend}
                          </p>
                        </div>
                        <div className="p-3 rounded-full bg-gray-700 dark:bg-gray-300 text-white dark:text-black">
                          {stat.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              <Card className="col-span-1 sm:col-span-3 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 dark:from-gray-100 dark:to-gray-200 dark:border-gray-300 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Reward Points Progress
                    </h3>
                    <Button variant="ghost" size="sm" className="text-green-500">
                      Redeem Points
                    </Button>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart
                        innerRadius="70%"
                        outerRadius="100%"
                        barSize={15}
                        data={rewardData}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <RadialBar
                          minAngle={15}
                          background
                          clockWise
                          dataKey="value"
                        >
                          {rewardData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={currentColors[index % currentColors.length]}
                            />
                          ))}
                        </RadialBar>
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-2">
                      <p className="text-sm text-gray-400 dark:text-gray-600">
                        You've earned <span className="font-bold text-green-500">750 points</span> this month
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Only 250 points needed for next tier
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-6"
          >
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 dark:from-gray-100 dark:to-gray-200 dark:border-gray-300 shadow-lg max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block">
                  <img
                    src="https://i.pravatar.cc/150"
                    className="mx-auto rounded-full w-24 h-24 border-4 border-green-500"
                    alt="avatar"
                  />
                  <span className="absolute bottom-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    L5
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold">Sajeer K</h2>
                <p className="text-green-500 text-sm">Garage Champ</p>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>750 XP</span>
                    <span>1000 XP</span>
                  </div>
                  <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-teal-400 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <p className="text-xs mt-2 text-gray-400">75% to next level</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-gray-400">Services</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-gray-400">Vehicles</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">₹1.2L</p>
                    <p className="text-xs text-gray-400">Savings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

      
        <TabsContent value="benefits">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
          >
            {benefitsLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="bg-gray-800 h-48 dark:bg-gray-200 dark:text-black animate-pulse"
                  />
                ))}
              </>
            ) : benefits.length > 0 ? (
              benefits.map((benefit) => (
                <motion.div
                  key={benefit.id}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
              <Card className={`relative overflow-hidden border-0 shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
  <div className={`absolute inset-0 bg-gradient-to-br ${darkMode ? 'from-emerald-900/20 to-transparent' : 'from-emerald-100/50 to-transparent'}`}></div>
  
  {/* Decorative elements */}
  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10"></div>
  <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-emerald-400/10"></div>
  
  <CardContent className="relative p-6 z-10">
    {/* Header with icon */}
    <div className="flex items-start gap-4 mb-4">
      <div className={`p-3 rounded-xl ${darkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
        <Gift size={24} className="shrink-0" />
      </div>
      <div>
        <h3 className="text-xl font-bold tracking-tight">{benefit.title}</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {benefit.description}
        </p>
      </div>
    </div>

    {/* Progress indicator (example) */}
    <div className="mb-6">
      <div className="flex justify-between text-xs mb-1">
        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Limited offer</span>
        {benefit.expiry && (
          <span className={darkMode ? 'text-emerald-400' : 'text-emerald-600'}>
            Expires: {new Date(benefit.expiry).toLocaleDateString()}
          </span>
        )}
      </div>
      <div className={`h-1.5 w-full rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div 
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" 
          style={{ width: `${Math.random() * 70 + 30}%` }} // Random progress for demo
        ></div>
      </div>
    </div>

    <Button 
      variant={darkMode ? "default" : "default"}
      className={`w-full ${darkMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-500 hover:bg-emerald-600'} text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02]`}
    >
      {benefit.cta || 'Claim Offer'}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </Button>
  </CardContent>
</Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Gift size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-medium">No benefits available</h3>
                <p className="text-gray-500 mt-2">Check back later for new offers</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="settings">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 dark:from-gray-100 dark:to-gray-200 dark:border-gray-300 shadow-lg max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-400">Toggle dark/light theme</p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={toggleTheme} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Notifications</h3>
                      <p className="text-sm text-gray-400">Service reminders and offers</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Location Services</h3>
                      <p className="text-sm text-gray-400">For nearby benefits</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700 dark:border-gray-300">
                    <Button variant="destructive" className="w-full">
                      Log Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}