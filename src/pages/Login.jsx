import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { Lock, Loader2, Mail, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-disabled":
        return "This account has been disabled";
      case "auth/user-not-found":
        return "No account found with this email";
      case "auth/wrong-password":
        return "Incorrect password";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later";
      case "auth/popup-closed-by-user":
        return "Login popup was closed";
      default:
        return "Login failed. Please try again";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Animated Stars */}
    <div className="absolute inset-0">
  {[...Array(150)].map((_, i) => (
    <div
      key={i}
      className="absolute bg-white rounded-full"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3}px`,
        height: `${Math.random() * 3}px`,
        opacity: Math.random() * 0.7 + 0.3,
      }}
    />
  ))}
</div>

      {/* Animated Planets */}
      <div className="absolute inset-0">
        {/* Planet 1 - Slow orbit */}
        <div 
          className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-orange-600 blur-sm"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit1 40s linear infinite',
          }}
        />
        
        {/* Planet 2 - Medium orbit */}
        <div 
          className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-sm"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit2 30s linear infinite reverse',
          }}
        />
        
        {/* Planet 3 - Fast orbit */}
        <div 
          className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 blur-sm"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'orbit3 25s linear infinite',
          }}
        />
      </div>

      {/* Login Card */}
     <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
    <div className="bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white">Login to SpaceHub</h2>
            <p className="text-white/70 text-sm mt-1">Access your interstellar account</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            {/* Email */}
            <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 border border-white/30 focus-within:ring-2 focus-within:ring-blue-400/50">
              <Mail className="w-5 h-5 text-white mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email or Phone"
                required
                disabled={loading}
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 border border-white/30 focus-within:ring-2 focus-within:ring-blue-400/50">
              <Lock className="w-5 h-5 text-white mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                disabled={loading}
                className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-white/70 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-white/70 hover:text-white text-sm">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-white/70">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-white text-center mt-6 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-300 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes orbit1 {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }
        
        @keyframes orbit2 {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(250px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(250px) rotate(-360deg);
          }
        }
        
        @keyframes orbit3 {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(350px) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(350px) rotate(-360deg);
          }
        }
        
        /* Pulsing stars */
        .absolute.bg-white.rounded-full {
          animation: twinkle 3s infinite ease-in-out;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Login;