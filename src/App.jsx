import { useState, useEffect } from 'react';
import './App.css';
import OpeningAnimation from './OpeningAnimation';
import MainApp from './components/MainApp';
import { supabase } from './lib/supabaseClient';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('_test_connection').select('*').limit(1);
        if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
          console.error('Supabase connection error:', error.message);
        } else {
          console.log('Supabase connected successfully!');
        }
      } catch (err) {
        console.error('Supabase test failed:', err);
      }
    };

    testConnection();
  }, []);

  return (
    <>
      {showAnimation ? (
        <OpeningAnimation onComplete={() => setShowAnimation(false)} />
      ) : (
        <MainApp />
      )}
    </>
  );
}

export default App;
