import { createRoot } from 'react-dom/client'
import {Suspense} from 'react';
import { Loader } from '@react-three/drei';
import './index.css';
import Footer from './component/Footer';
import Mainpage from './component/mainpage';


const root =createRoot(document.getElementById('root'));
root.render(
  <>
    <Suspense fallback={null}>
      <Mainpage/>
      <Footer/>
    </Suspense>
    <Loader/>
  </>
);


