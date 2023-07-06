import React from 'react';
import { BeatLoader } from 'react-spinners';

const MyLoader = () => {
  return (
    <BeatLoader color="#00BFFF" loading={true} size={80} />
  );
};

export default MyLoader;
