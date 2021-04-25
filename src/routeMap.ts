import {lazy} from 'react';
import antdPage from '@views/antd-page/antd-page';

const usualPage = lazy(() => import(/* webpackChunkName:'usual-page' */ '@views/usual-page/usual-page'));
const photoPage = lazy(() => import(/* webpackChunkName:'photo-page' */ '@views/photo-page/photo-page'));

const routeMap = [
  {
    path: '/',
    component: usualPage
  },
  {
    path: '/photo-page',
    component: photoPage
  },
  {
    path: '/antd-page',
    component: antdPage
  },
];
export default routeMap;
