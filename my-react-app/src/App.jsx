import DomeGallery from './components/DomeGallery';
import './index.css'; // This is the default CSS file from Vite. You can keep or remove it.

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#060010' }}>
      <DomeGallery />
    </div>
  );
}