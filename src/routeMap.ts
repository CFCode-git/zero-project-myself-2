import {lazy} from 'react';

const usualPage = lazy(() => import(/* webpackChunkName:'usual-page' */ '@views/usual-page/usual-page'));
const antdPage = lazy(() => import(/* webpackChunkName:'antd-page' */ '@views/antd-page/antd-page'));
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
