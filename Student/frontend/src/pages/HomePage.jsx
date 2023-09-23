import React, { useState, useEffect } from 'react';

const HomePage = () => {
    function SendPostReq(type){
        useEffect(() => {
            // POST request using fetch inside useEffect React hook
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ title: 'React Hooks POST Request Example' })
            };
            fetch('http://localhost:5000/'+type, requestOptions)
                .then((response) => response.json())
                // .then(data => setPostId(data.id));
        
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
        }, []);
    }
    
  return (
    <div>
    <div>HomePage</div>
    <button name="register" onClick={()=>{SendPostReq("register")}}> Register</button>
    <button name="login" onClick={()=>{SendPostReq("login")}}> Login </button>
    </div>
  )
}

export default HomePage;