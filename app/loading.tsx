import React from 'react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                <p className="text-secondary-500 font-medium animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
