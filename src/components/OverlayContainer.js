import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function OverlayContainer({ children }) {
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  useEffect(() => {
    const overlayRoot = document.getElementById('overlay');
    overlayRoot.appendChild(elRef.current);

    return () => {
      overlayRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="min-w-full pt-4 px-4 text-center flex justify-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {children}
      </div>
    </div>,
    elRef.current
  );
}
