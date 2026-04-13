import { useMutation,  } from '@tanstack/react-query';
import Axios from '../utils/axios';
import useAuthStore from '../store/authStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


export const useLoginMutation = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await Axios.post('/auth/login', credentials);
      return data.data.login.data;
    },
    onSuccess: (userData) => {
      login(userData);
      toast.success('Welcome back! Logging you in...');
      if (userData.role === 'admin') {
        navigate('/admin/subscriptions');
      } else {
        navigate('/dashboard');
      }
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.data?.login?.message || 'Login failed. Please check your credentials.');
    }
  });
};


export const useRegisterMutation = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formData: any) => {
      const { data } = await Axios.post('/auth/register', formData);
      return data.data.register.data;
    },
    onSuccess: (userData) => {
      login(userData);
      toast.success('Account created successfully! Welcome aboard.');
      navigate('/plans');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.data?.register?.message || 'Registration failed. Try again.');
    }
  });
};
