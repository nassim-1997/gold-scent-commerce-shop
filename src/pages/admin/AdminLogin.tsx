
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';

interface LocationState {
  from?: {
    pathname?: string;
  };
}

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from?.pathname || '/admin';
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à l'interface d'administration.",
      });
      
      navigate(from, { replace: true });
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Vérifiez vos informations et réessayez.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-md mx-auto bg-secondary rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gold-500 mb-4">
            <Lock className="h-8 w-8 text-black" />
          </div>
          <h1 className="font-serif text-2xl font-bold">Administration</h1>
          <p className="text-muted-foreground mt-2">Connectez-vous pour gérer votre boutique</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-background border border-muted rounded-md focus:outline-none focus:border-gold-500"
              placeholder="admin@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-background border border-muted rounded-md focus:outline-none focus:border-gold-500"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-500 hover:bg-gold-600 text-black py-3 rounded-md transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
