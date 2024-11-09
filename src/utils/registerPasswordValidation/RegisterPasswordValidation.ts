import React from 'react';

export const zeroError = (
  indicatorRef1: React.RefObject<HTMLSpanElement>,
  indicatorRef2: React.RefObject<HTMLSpanElement>,
  indicatorRef3: React.RefObject<HTMLSpanElement>,
  indicatorRef4: React.RefObject<HTMLSpanElement>
): void => {
  if (indicatorRef1.current && indicatorRef2.current && indicatorRef3.current && indicatorRef4.current) {
    indicatorRef1.current.style.background = 'green';
    indicatorRef2.current.style.background = 'green';
    indicatorRef3.current.style.background = 'green';
    indicatorRef4.current.style.background = 'green';
  }
};

export const oneError = (
  indicatorRef1: React.RefObject<HTMLSpanElement>,
  indicatorRef2: React.RefObject<HTMLSpanElement>,
  indicatorRef3: React.RefObject<HTMLSpanElement>,
  indicatorRef4: React.RefObject<HTMLSpanElement>
): void => {
  if (indicatorRef1.current && indicatorRef2.current && indicatorRef3.current && indicatorRef4.current) {
    indicatorRef1.current.style.background = '#EDEBEB';
    indicatorRef2.current.style.background = 'orange';
    indicatorRef3.current.style.background = 'orange';
    indicatorRef4.current.style.background = 'orange';
  }
};

export const twoError = (
  indicatorRef1: React.RefObject<HTMLSpanElement>,
  indicatorRef2: React.RefObject<HTMLSpanElement>,
  indicatorRef3: React.RefObject<HTMLSpanElement>,
  indicatorRef4: React.RefObject<HTMLSpanElement>
): void => {
  if (indicatorRef1.current && indicatorRef2.current && indicatorRef3.current && indicatorRef4.current) {
    indicatorRef4.current.style.background = 'yellow';
    indicatorRef3.current.style.background = 'yellow';
    indicatorRef2.current.style.background = '#EDEBEB';
    indicatorRef1.current.style.background = '#EDEBEB';
  }
};

export const threeError = (
  indicatorRef1: React.RefObject<HTMLSpanElement>,
  indicatorRef2: React.RefObject<HTMLSpanElement>,
  indicatorRef3: React.RefObject<HTMLSpanElement>,
  indicatorRef4: React.RefObject<HTMLSpanElement>
): void => {
  if (indicatorRef1.current && indicatorRef2.current && indicatorRef3.current && indicatorRef4.current) {
    indicatorRef1.current.style.background = '#EDEBEB';
    indicatorRef2.current.style.background = '#EDEBEB';
    indicatorRef3.current.style.background = '#EDEBEB';
    indicatorRef4.current.style.background = 'red';
  }
};

export const fourAndMorError = (
  indicatorRef1: React.RefObject<HTMLSpanElement>,
  indicatorRef2: React.RefObject<HTMLSpanElement>,
  indicatorRef3: React.RefObject<HTMLSpanElement>,
  indicatorRef4: React.RefObject<HTMLSpanElement>
): void => {
  if (indicatorRef1.current && indicatorRef2.current && indicatorRef3.current && indicatorRef4.current) {
    indicatorRef1.current.style.background = '#EDEBEB';
    indicatorRef2.current.style.background = '#EDEBEB';
    indicatorRef3.current.style.background = '#EDEBEB';
    indicatorRef4.current.style.background = '#EDEBEB';
  }
};
