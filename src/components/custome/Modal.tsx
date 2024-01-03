'use client'
import React, { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 p-2 bg-white rounded shadow-md">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &#x2716;
          </button>
        </div>
        <div className="p-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
