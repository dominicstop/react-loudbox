// animate values to be use with framer motion

export const shake = {
  x: [0, -10, 10, -10, 10, -10, 10, -10, 0],
  transition: { duration: 0.5, ease: 'easeIn' },
};

export const exitZoomIn = {
  opacity: 0,
  scale: 1.15,
  transition: { duration: 0.75, ease: 'easeOut' },
};