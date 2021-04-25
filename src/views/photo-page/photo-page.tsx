import * as React from 'react';
import styles from '@views/photo-page/photo-page.scss';
import internetPng from '@image/internet.png'
import catPng from '@image/cat.png'

// console.log(internetPng);
// console.log(catPng);
const PhotoPage = () => {
  return (
    <>
      <div className={styles['page-b']}>page b</div>
      <div className="global">global css</div>
      <img src={catPng} alt="cat"/>
      <img src={internetPng} alt="internet"/>
    </>
  );
};
export default PhotoPage;
