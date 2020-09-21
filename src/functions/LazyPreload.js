import { lazy } from 'react';

export const LazyPreload = importStatement => {
  const component = lazy(importStatement);
  component.preload = importStatement;
  return component;
};