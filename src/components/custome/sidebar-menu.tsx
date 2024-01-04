import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="flex h-screen fixed top-0 left-0">
      <div className="bg-white w-80 text-white">
        <div className="p-2">
          <div className="flex-1 p-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
