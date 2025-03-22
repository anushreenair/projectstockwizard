import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  deleteUser,
  updateProfile
} from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';

const Account = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Successfully logged in!');
        // Redirect to portfolio after successful login
        setTimeout(() => navigate('/portfolio'), 1000);
      } else {
        // Signup
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name
        });
        setSuccess('Account created successfully!');
        // Redirect to portfolio after successful signup
        setTimeout(() => navigate('/portfolio'), 1000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSuccess('Successfully logged out!');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const user = auth.currentUser;
      // Delete user's portfolio data
      const portfolioRef = doc(db, 'portfolios', user.uid);
      await deleteDoc(portfolioRef);
      // Delete the user account
      await deleteUser(user);
      setSuccess('Account deleted successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="account-form">
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="account-actions">
          <button 
            className="toggle-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>

          {auth.currentUser && (
            <div className="user-actions">
              <button 
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button 
                className="delete-btn"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account; 