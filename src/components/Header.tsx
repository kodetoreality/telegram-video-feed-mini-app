import React from 'react';
import { useTelegram } from '../hooks/useTelegram';

const Header: React.FC = () => {
  const { user } = useTelegram();
  
  return (
    <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black to-transparent p-4">
      <div className="flex items-center justify-between">
        <div className="text-white text-lg font-semibold">
          Game Feed
        </div>
        {user && (
          <div className="flex items-center">
            {user.photo_url ? (
              <img 
                src={user.photo_url} 
                alt={user.first_name} 
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                {user.first_name.charAt(0)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;