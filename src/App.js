
import { RouterProvider } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import './App.css';
import router from './Routes/Routes';

function App() {
  return (
    <div className='max-w-[1440px] mx-auto text-black'>
     <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
