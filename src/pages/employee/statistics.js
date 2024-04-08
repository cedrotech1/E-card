import React, { useEffect, useState } from 'react';

const App = () => {
  const [user, setuser] = useState(null);

  useEffect(() => {
    // Retrieve data from local storage
    const user = localStorage.getItem('user');
    if (user) {
      setuser(JSON.parse(user));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>; // You might want to handle the case where data is being fetched
  }
let r=user.role;
  console.log(r)

  return (
   <>
   </>
  );
}

export default App;
