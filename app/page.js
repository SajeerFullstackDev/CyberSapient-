"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Car, Gauge, Settings, Gift, User, Menu, X } from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  Cell,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";


const mockBenefits = [
  { title: "10% Off Fuel", description: "Valid at selected stations", icon: <Gift />, cta: "Claim" },
  { title: "Free Car Wash", description: "One free every month", icon: <Gift />, cta: "View" },
];

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
  const [benefits, setBenefits] = useState([]);
const [benefitsLoading, setBenefitsLoading] = useState(true);


useEffect(() => {
  const fetchBenefits = async () => {
    try {
      const response = await axios.get("/api/benefits"); // Change to your actual API

      console.log(response,"saj");
      
      setBenefits(response.data);
    } catch (error) {
      console.error("Failed to fetch benefits:", error);
    } finally {
      setBenefitsLoading(false);
    }
  };

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
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} p-6 transition-colors`}>
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">CRED Garage</h1>

        {/* Desktop Actions */}
        <div className="hidden sm:flex gap-4 items-center">
          <Switch checked={darkMode} onCheckedChange={toggleTheme} />
          {/* <Button variant="default" className="border-white text-white dark:text-black dark:border-black hover:bg-green hover:text-black dark:hover:bg-black dark:hover:text-white">
            + Add Vehicle
          </Button> */}
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
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

      {/* Tabs Component */}
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

        {/* Tab Content */}
        <TabsContent value="overview">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-gray-700 h-24" />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { label: "Total Spent", value: "₹1,20,450" },
                { label: "Mileage", value: "15.2 km/l" },
                { label: "Services", value: "8 Times" },
              ].map((stat, index) => (
                <Card key={index} className="bg-gray-800 border-none dark:bg-gray-200 dark:text-black">
                  <CardContent className="p-6 text-center">
                    <p className="text-lg font-semibold text-gray-400 dark:text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
              <Card className="col-span-1 sm:col-span-3 bg-gray-800 border-none dark:bg-gray-200 dark:text-black">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Reward Points Progress</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart innerRadius="70%" outerRadius="100%" barSize={15} data={rewardData} startAngle={90} endAngle={-270}>
                        <RadialBar minAngle={15} background clockWise dataKey="value">
                          {rewardData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={currentColors[index % currentColors.length]} />
                          ))}
                        </RadialBar>
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="mt-6 text-center">
            <img src="https://i.pravatar.cc/100" className="mx-auto rounded-full w-24 h-24" alt="avatar" />
            <h2 className="mt-4 text-xl font-bold">Sajeer K</h2>
            <p className="text-gray-400">Level 5 • Garage Champ</p>
            <div className="w-full max-w-md mx-auto mt-4">
              <div className="w-full h-3 bg-gray-700 rounded-full">
                <div className="h-3 bg-green-500 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="text-sm mt-2 text-gray-400">750 XP / 1000 XP</p>
            </div>
          </motion.div>
        </TabsContent>

       <TabsContent value="benefits">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
  >
    {benefitsLoading ? (
      <>
        {[1, 2].map((i) => (
          <Card key={i} className="bg-gray-800 h-32 dark:bg-gray-200 dark:text-black animate-pulse" />
        ))}
      </>
    ) : (
      benefits.map((item, index) => (
        <Card key={index} className="bg-gray-800 dark:bg-gray-200 dark:text-black">
          <CardContent className="p-6 flex flex-col gap-2">
            <div className="flex items-center gap-3 text-xl">
              <Gift /> <span>{item.title}</span>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-600">{item.description}</p>
            <Button className="self-start mt-2">{item.cta}</Button>
          </CardContent>
        </Card>
      ))
    )}
  </motion.div>
</TabsContent>


        <TabsContent value="settings">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6 text-center">
            <p>Manage notification preferences and more.</p>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
