import { useRouter } from 'vue-router';
import store from '@/store';

export function useAuthGuard() {
  const router = useRouter();

  const isAuthenticated = () => {
    if (!store.getters.isAuthenticated) {
      router.push('/login'); 
      return false;
    }
    return true;
  };
  

  // const isOTPVerified = () => {
  //   const user = store.getters.user;
  //   if (router.currentRoute.value.name === 'userOtp' && !user.doneOnboarding) {
  //     router.push(`/otp/${user.uuid}`);
  //     return false;
  //   }
  //   return true;
  // };

  const isOwner = () => {
    const user = store.getters.user;
    if (user.type === 'owner') {
      return true;
    } else {
      router.push('/');
      return false;
    }
  };

  return {
    isAuthenticated,
    // isOTPVerified,
    isOwner,
  };
}
