import { useEffect, useState } from 'react';

export default function useWindowDimensions(fix) {
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (fix === 'fix') {
      return;
    }

    if (hasWindow) {
      window.addEventListener('resize', handleResize);
      // eslint-disable-next-line consistent-return
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}
