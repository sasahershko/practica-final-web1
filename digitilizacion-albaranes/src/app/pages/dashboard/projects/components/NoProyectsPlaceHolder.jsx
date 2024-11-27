'use client';
import React from 'react';
import Card from '@/app/components/Card';

export default function NoClientsPlaceholder({ onAddProject }) {
  return (
    <Card title="Create your first Project">
      <div className="text-center">
        <img
          src="https://media.giphy.com/media/3owyp2SViuDIGh8YoM/giphy.gif"
          alt="Image"
          className="mb-8 mx-auto h-[450px] w-[600px] rounded-lg"
        />
        <p className="text-gray-500 mb-8">
          In order to generate digital delivery notes
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={onAddProject}
        >
          Yes, let's go!
        </button>
      </div>
    </Card>
  );
}
