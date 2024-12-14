import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Lock } from 'lucide-react';

export function Auth() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const login = useStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = login(password);
    if (!isValid) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#1a1f2e] flex items-center justify-center p-4"
    >
      <div className="bg-[#232936] p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Lock className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Order Manager 🌟
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded bg-[#2a303c] border ${
                error ? 'border-red-500' : 'border-gray-700'
              } text-white focus:outline-none focus:border-blue-500 transition-colors`}
              placeholder="Enter password"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-500 text-white p-3 rounded font-medium hover:bg-blue-600 transition-colors"
            type="submit"
          >
            Login
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}