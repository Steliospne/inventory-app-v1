import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  page?: boolean;
  delay?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  delay = 200,
  page = true,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <div
      className={
        page ? 'flex h-full flex-col items-center justify-center' : 'flex'
      }
    >
      <div className='animate-bounce'>
        <Loader2 className='animate-spin' size={page ? 50 : 24} />
      </div>
      <p>
        <i>Loading ...</i>
      </p>
    </div>
  );
};

export default LoadingSpinner;
