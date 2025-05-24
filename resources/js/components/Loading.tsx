import React from 'react';

export default function Loading({ text }: { text?: string }) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        {text && <p className="mt-2 text-gray-700">{text}</p>}
      </div>
    );
  }
