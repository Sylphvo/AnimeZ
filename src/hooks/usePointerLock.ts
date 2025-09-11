import { useEffect } from 'react';

const usePointerLock = () => {
  useEffect(() => {
    const handlePointerLockChange = () => {
      if (document.pointerLockElement) {
        console.log('Pointer lock enabled');
      } else {
        console.log('Pointer lock disabled');
      }
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, []);

  const requestPointerLock = () => {
    document.body.requestPointerLock();
  };

  const exitPointerLock = () => {
    document.exitPointerLock();
  };

  return { requestPointerLock, exitPointerLock };
};

export default usePointerLock;