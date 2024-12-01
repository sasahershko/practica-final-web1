
// export default function Summary(){
//     return(
//         <>    
//             <h1 className='text-center text-[80px] font-bold text-black animate-fade-in-up'>Summary</h1>
//         </>
//     )
// }


'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardSummary () {
    const router = useRouter();
  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    deliveryNotes: 0,
    revenue: 0,
  })

  useEffect(() => {
    // Simulate data loading
    const loadStats = () => {
      setStats({
        clients: 150,
        projects: 75,
        deliveryNotes: 1200,
        revenue: 500000,
      })
    }
    loadStats()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-8 animate-fade-in-up">
       <h1 className='text-center text-black text-[80px] font-bold mb-10'>Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Clients" value={stats.clients} icon="👥" color="bg-blue-500" />
        <StatCard title="Projects" value={stats.projects} icon="📊" color="bg-green-500" />
        <StatCard title="Delivery Notes" value={stats.deliveryNotes} icon="📄" color="bg-purple-500" />
        <StatCard title="Revenue" value={`$${stats.revenue.toLocaleString()}`} icon="💰" color="bg-yellow-500" />
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Recent Activity</h2>
          <ActivityTimeline />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Quick Actions</h2>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, icon, color }) => {
  const router = useRouter();
  return (
    <div className={`${color} rounded-lg shadow-lg p-6 text-white flex items-center transition-transform duration-200 hover:scale-105`}>
      <div className="mr-4 text-4xl">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  )
}

const ActivityTimeline = () => {
  const activities = [
    { id: 1, text: "New client registered: XYZ Company", time: "2 hours ago" },
    { id: 2, text: "Delivery note #1234 digitized", time: "4 hours ago" },
    { id: 3, text: "Project 'Logistics 2023' completed", time: "1 day ago" },
    { id: 4, text: "5 new delivery notes added to 'Q2 Distribution' project", time: "2 days ago" },
  ]

  return (
    <ul className="space-y-4">
      {activities.map((activity) => (
        <li key={activity.id} className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{activity.text}</p>
            <p className="text-sm text-gray-500">{activity.time}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

const QuickActions = () => {
    const router = useRouter(); 
  const actions = [
    { id: 1, text: "Add New Client", icon: "👥" , page:'/pages/dashboard/clients/addClient'},
    { id: 2, text: "Create Project", icon: "📊" , page: '/pages/dashboard/projects/addProject'},
    { id: 3, text: "Digitize Delivery Note", icon: "📄" , page:'/'},
    { id: 4, text: "Generate Report", icon: "📈" , page:'/'},
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => (
        <button
          key={action.id}
          className="flex items-center justify-center p-4 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
          onClick={()=>router.push(`${action.page}`)}
        >
          <span className="mr-2 text-xl">{action.icon}</span>
          <span>{action.text}</span>
        </button>
      ))}
    </div>
  )
}
