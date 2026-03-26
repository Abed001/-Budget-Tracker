import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner'

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        // 🔑 KEY DIFFERENCE 1: STORE THE TOKEN

        console.log('Login response:', data); // What does the token look like?

        localStorage.setItem('token', data.token);

        // 👤 OPTIONAL: Store user data too

        localStorage.setItem('user', JSON.stringify(data.user));

        setUser(data.user);

        toast("✅ Login successful! Redirecting...");

        // 🔑 KEY DIFFERENCE 2: Update app state
        if (onLoginSuccess) {

          onLoginSuccess();
        }

        // 🔑 KEY DIFFERENCE 3: Redirect to protected area
        setTimeout(() => {
          navigate('/app');
        }, 1500);

      } else {
        // 🔑 KEY DIFFERENCE 4: Different error message
        toast.error(`❌ ${data.error || 'Invalid email or password'}`, {
          hideProgressBar: true
        });
      }
    } catch (err) {
      toast.error('❌ Error connecting to server', {
        hideProgressBar: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            disabled={loading}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            marginBottom: '50px',
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}

        >
          {loading ? (<>
            <TailSpin
              height={20}        // Smaller for button
              width={20}         // Smaller for button
              color="#ffffff"    // White for dark button
              visible={true}
              ariaLabel='oval-loading'
              strokeWidth={4}
            />
            Logging in...
          </>
          ) : (
            'Login')}
        </button>
        <ToastContainer position="right-top" hideProgressBar={true} autoClose={2000} />

        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;