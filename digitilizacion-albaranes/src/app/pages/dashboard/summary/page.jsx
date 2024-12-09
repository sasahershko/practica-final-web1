'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectDetails } from '@/app/hooks/useEntityDetails';

export default function DashboardSummary() {
  const router = useRouter();
  const { projects, clients, deliveryNotes, error, loading } = useProjectDetails();

  const stats = {
    clients: clients ? clients.length : 0,
    projects: projects ? projects.length : 0,
    deliveryNotes: deliveryNotes ? deliveryNotes.length : 0,
    revenue: 0,
  };

  const handleNavigateToClients = () => {
    router.push('/pages/dashboard/clients');
  }

  const handleNavigateToProjects = () => {
    router.push('/pages/dashboard/projects');
  }

  const handleNavigateToDeliveryNotes = () => {
    router.push('/pages/dashboard/deliveryNotes');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-8 animate-fade-in-up">
      <h1 className='text-center text-black text-[100px] font-bold mb-10'>Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard title="Clients" value={stats.clients} icon="👥" color="bg-blue-500" handleNavigate={handleNavigateToClients} loading={loading} />
        <StatCard title="Projects" value={stats.projects} icon="📊" color="bg-green-500" handleNavigate={handleNavigateToProjects} loading={loading} />
        <StatCard title="Delivery Notes" value={stats.deliveryNotes} icon="📄" color="bg-purple-500" handleNavigate={handleNavigateToDeliveryNotes} loading={loading} />
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

const StatCard = ({ title, value, icon, color, handleNavigate, loading }) => {
  const router = useRouter();
  return (
    <div className={`${color} rounded-lg shadow-lg p-6 text-white flex items-center transition-transform duration-200 hover:scale-105`}
      onClick={() => handleNavigate()}>
      <div className="mr-4 text-4xl">{icon}</div>

      {loading ? (
        <div className="flex justify-center items-center h-1">
          <div className="loader border-t-4 border-white rounded-full w-12 h-12 animate-spin"></div>
        </div>) : (
        <div>
          <h2 className="text-lg font-semibold mb-1">{title}</h2>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      )}

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
    { id: 1, text: "Add New Client", icon: "👥", page: '/pages/dashboard/clients/addClient' },
    { id: 2, text: "Create Project", icon: "📊", page: '/pages/dashboard/projects/addProject' },
    { id: 3, text: "Digitize Delivery Note", icon: "📄", page: '/pages/dashboard/deliveryNotes/addDeliveryNote' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => (
        <button
          key={action.id}
          className="flex items-center justify-center p-4 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
          onClick={() => router.push(`${action.page}`)}
        >
          <span className="mr-2 text-xl">{action.icon}</span>
          <span>{action.text}</span>
        </button>
      ))}
    </div>
  )
}
