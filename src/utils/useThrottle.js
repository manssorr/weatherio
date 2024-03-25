import _ from 'lodash';
import {useEffect, useRef, useCallback} from 'react';

const useThrottle = (cb, delay) => {
  let isThrottled = false;
  return (...args) => {
    if (isThrottled) return;
    isThrottled = true;
    cb(...args);
    setTimeout(() => {
      isThrottled = false;
    }, delay);
  };
};

export default useThrottle;
