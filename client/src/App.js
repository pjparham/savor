import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState()

    //auto login user if stored in session
    useEffect(()=> {
      fetch('/auth')
      .then(res => {
        if(res.ok){
          res.json().then(user=> setCurrentUser(user))
        }
      })
    }, [])
    
  return (
    <div className="App">
    </div>
  );
}

export default App;
