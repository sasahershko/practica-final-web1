'use client';
import React from 'react';
import Card from '@/app/components/Card';

export default function PlaceholderDetails() {
    return (
        <div className="space-y-6">
            <Card title="Client Logo">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                        <svg
                            className="h-8 w-8 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                </div>
            </Card>

            <Card title="Notes">
                <p className="text-gray-500 text-sm">Add note about your customer.</p>
            </Card>

            <Card title="Tags">
                <p className="text-gray-500 text-sm">
                    Tags can be used to categorize customers into groups.
                </p>
            </Card>
        </div>
    );
}
