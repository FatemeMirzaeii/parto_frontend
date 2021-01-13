import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';

//styles
import { WIDTH } from '../styles/static';

const CatListLoader = (props) => {
  return (
    <ContentLoader
      rtl
      speed={1}
      width={'100%'}
      height={270}
      backgroundColor="#ddd"
      foregroundColor="#fafafa"
      {...props}>
      <Rect x="23" y="30" rx="3" ry="3" width="80" height="6" />
      {props.leftTxt ? (
        <Rect x={WIDTH - 110} y="30" rx="3" ry="3" width="80" height="6" />
      ) : null}
      <Rect x="5" y="65" rx="15" ry="15" width="140" height="180" />
      <Rect x="155" y="65" rx="15" ry="15" width="140" height="180" />
      <Rect x="305" y="65" rx="15" ry="15" width="140" height="180" />
      <Rect x="455" y="65" rx="15" ry="15" width="140" height="180" />
      <Rect x="605" y="65" rx="15" ry="15" width="140" height="180" />
      <Rect x="755" y="65" rx="15" ry="15" width="140" height="180" />
      <Rect x="905" y="65" rx="15" ry="15" width="140" height="180" />
      <Rect x="1055" y="65" rx="15" ry="15" width="140" height="180" />
    </ContentLoader>
  );
};

export default CatListLoader;
