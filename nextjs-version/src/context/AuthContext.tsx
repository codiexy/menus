"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import User from '@/classes/User';
import SiteLoader from '@/components/miscellaneous/SiteLoader';
import { Auth, sendSignInLinkToEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { isValidEmail } from '@/helper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const AuthContext = createContext<any>({

});

interface AuthProviderProps {
  children: React.ReactNode;
  isLoading: boolean;
  tenant: any;
  tenantId: string;
  tenantSlug: string;
  updateTenant: Function;
  auth: Auth,
  setSnackbar: Function;
  useThemeMode: Function;
  useThemeColor: Function;
  setLoading: Function;
}

const AuthProvider = ({
  children,
  isLoading,
  tenant,
  tenantId,
  tenantSlug,
  updateTenant,
  auth,
  setSnackbar,
  setLoading
}: AuthProviderProps) => {
  const [user, loading, error] = useAuthState(auth, {
    onUserChanged: async (user: any) => {
      if (user) {
        const userClass = new User(user.tenantId);
        const userDdata: any = await userClass.first(user.uid);

        for (const key in userDdata) {
          if (Object.hasOwnProperty.call(userDdata, key)) {
            user[key] = userDdata[key];
          }
        }
        let customClaim: any = user.reloadUserInfo.customAttributes || "";
        if (customClaim) {
          customClaim = JSON.parse(user.reloadUserInfo.customAttributes);
          for (const k in customClaim) {
            if (Object.hasOwnProperty.call(customClaim, k)) {
              user[k] = customClaim[k];
            }
          }
        }
        user.id = user.uid;
      }
    }
  });
  const [LoginPopupShow, setLoginPopupShow] = useState(false);
  const [isSiteLoading, setSiteLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const functions = getFunctions();
      const updateTenantUser = httpsCallable(functions, 'updateTenantUser');
      updateTenantUser({
        id: "jbVk7KFd5lN6nmtBIHAbPY9bb1l2",
        tenantId: tenantId,
        name: "Demo Singh",
        role: "user",

      })
        .then((result) => {
          // Read result of the Cloud Function.
          /** @type {any} */
          console.log(result)
        });
    })();
  }, []);

  const register = async (inputData: any) => {
    try {
      const { email, password } = inputData;
      const userClass = new User(tenantId);
      const res = await userClass.register(email, password, inputData);
      if (res.status) {
        setSnackbar(true, "Sign up successfully!");
        return {
          status: true,
          message: "Sign up successfully!"
        }
      }
      throw new Error(res.message);
    } catch (error: any) {
      var message = error.message;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Email already in use !';
          break;
      }
      setSnackbar(false, message);
      return {
        status: false,
        message: message
      }
    }
  }

  const loginWithProvider = async (provider: string = "gmail") => {
    try {
      const userClass = new User(tenantId);
      const res = await userClass.loginWithProvider(provider);
      if (res.status) {
        setSnackbar(true, "Login successfully!");
        return {
          status: true,
          message: "Login successfully!"
        }
      }
      throw new Error(res.message);
    } catch (error: any) {
      setSnackbar(false, error.message);
      return {
        status: true,
        message: error.message
      }
    }
  }


  const updateLoginUser = async (inputData: any, message = "User profile pic updated successfully!") => {
    try {
      if (user) {
        let updateData: any = {};
        if (inputData?.name) updateData.name = inputData.name;
        if (inputData?.bio) updateData.bio = inputData.bio;
        if (inputData?.username) updateData.username = inputData.username;
        if (inputData?.image) updateData.photoURL = inputData.image;
        if (inputData?.phoneNumber) updateData.phoneNumber = inputData.phoneNumber;
        const userClass = new User(tenantId);
        const res = await userClass.createOrUpdateUser(updateData)
        let newMessage = res.message;
        if (res.status) {
          newMessage = message;
        }
        setSnackbar(res.status, newMessage);
      } else {
        setSnackbar(false, 'You are not authenticated!');
      }
    } catch (error: any) {
      setSnackbar(false, error.message);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const userClass = new User(tenantId);
      const result = await userClass.login(email, password);
      if (result.status) {
        setSnackbar(true, "Login successfully!");
        return {
          status: true,
          message: "Login successfully!",
        }
      }
      setSnackbar(result.status, result.message);
      return result;
    } catch (error: any) {
      setSnackbar(false, error.message);
      return {
        status: false,
        message: error.message
      }
    }
  }

  const logout = async () => {
    try {
      const userClass = new User(tenantId);
      const res = await userClass.logout();
      setSnackbar(res.status, res.message);
      if (res.status) {
        router.push(`/${tenantSlug}/menu`)
      }
    } catch (error: any) {
      setSnackbar(false, error.message);
    }
  }

  const sendLoginLinkToEmail = async (email: string) => {
    if (!isValidEmail(email)) {
      setSnackbar(false, "Email must be valid!");
      return;
    }
    const userClass = new User(tenantId);
    const res = await userClass.sendLoginLinkToEmail(email)
    setSnackbar(res.status, res.message);
  };

  const loginWithEmailLink = async () => {
    const userClass = new User(tenantId);
    const res = await userClass.loginWithEmailLink()
    setSnackbar(res.status, res.message);
  };

  const siteLoader = loading || isSiteLoading || isLoading;

  return (
    <>
      {
        siteLoader ? (
          <SiteLoader isLoading={siteLoader} />
        ) : (
          <AuthContext.Provider
            value={{
              user,
              logout,
              signIn,
              updateLoginUser,
              loginWithProvider,
              register,
              LoginPopupShow,
              setLoginPopupShow,
              tenantId,
              tenant,
              tenantSlug,
              updateTenant,
              auth,
              isSiteLoading: siteLoader,
              setSiteLoading,
              setSnackbar,
              sendLoginLinkToEmail,
              loginWithEmailLink,
            }}
          >
            {children}
          </AuthContext.Provider>
        )
      }
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;