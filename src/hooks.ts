import { useRef, RefObject, useLayoutEffect } from 'react';

export function useCorrectHeight<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if(ref.current == null) return;

    ref.current.style.height = `${window.innerHeight-1}px`;
  }, [ref]);

  return ref;
}

export function useScrollToBottom<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if(ref.current == null) return;

    ref.current.scroll({
      top: ref.current.scrollHeight,
      behavior: 'smooth',
    });
  });

  return ref;
}