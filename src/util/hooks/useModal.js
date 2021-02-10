import { useState, useCallback } from 'react';

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  return { isVisible, toggle };
};

export default useModal;
