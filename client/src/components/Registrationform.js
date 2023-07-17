import React,{useState} from 'react'



const Registrationform = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');




    const handleRegistration = async (e) => {
        e.preventDefault();
    
        // Validate inputs
        if (!username || !password) {
          setErrorMessage('Please enter both username and password');
          return;
        }
    
        // Send registration request
        try {
          const response = await fetch('http://localhost:4040/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });
    
          if (response.ok) {
            // Registration successful
            console.log('User registered successfully');
            // Reset form fields
            setUsername('');
            setPassword('');
            setErrorMessage('');
          } else {
            // Registration failed
            const errorData = await response.json();
            setErrorMessage(errorData.message);
          }
        } catch (error) {
          console.error('Error occurred during registration:', error);
          setErrorMessage('An error occurred during registration. Please try again later.');
        }
      };




  return (
    <>
     <div>
      <h2>Registration</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleRegistration}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      </div>
    </>
  )
}

export default Registrationform;