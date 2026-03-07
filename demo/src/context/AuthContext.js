import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  onAuthStateChanged,
  OAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth, provider } from '../firebase';
import { Restaurant, Setting, User } from '../classes';
import { where } from 'firebase/firestore';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [user, setUser] = useState(false);
  const useLoginPopup = useState(false);


  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth,
      async (user) => {
        if (user) {
          const userClass = new User();
          const result = await userClass.first(user.uid);
          const userDdata = result?.data || {};

          // Get restaurant data
          const restaurantClass = new Restaurant();
          const res = await restaurantClass.get();
          user.restaurant = res?.data?.shift() || false;

          // Get setting data
          const settingClass = new Setting(user.restaurant.id);
          const setting = await settingClass.get();
          user.setting = setting?.data || [];

          for (const key in userDdata) {
            if (Object.hasOwnProperty.call(userDdata, key)) {
              user[key] = userDdata[key];
            }
          }
          setUser(user);
        } else {
          setUser(false);
        }
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        throw new Error(error.message);
      });
    return unsubscribe();
  }, [auth, updated]);

  const signUpWithEmailAndPassword = async (inputData) => {
    try {
      const { email, password } = inputData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      try {
        const uid = userCredential.user.uid;

        // Set custom claims for the user using Cloud Function

        auth.setCustomClaims({ uid: uid, isAdmin: true })
          .then((result) => {
            // console.log('Custom claims set successfully:', result);
          })
          .catch((error) => {
            // console.error('Error setting custom claims:', error);
          });
        auth.currentUser.getIdTokenResult()
          .then((idTokenResult) => {
            if (idTokenResult.claims.isAdmin) {
              // console.log("dahboard")
            } else {
              throw new Error("Not authorized")
              // console.log("not authorized")
            }
          })
          .catch((error) => {
            // Handle errors here
          });
      } catch (error) {
        throw new Error(error);
      }
      const userClass = new User();
      await userClass.firstOrCreateUser({
        email,
        name: userClass.getRandomUsername(inputData, 'name')
      })
      setUpdated(!updated);
      return {
        status: true,
        message: "Sign up successfully!",
        user: user
      }
    } catch (error) {
      var message = error.message;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Email already in use !';
          break;
      }
      return {
        status: false,
        message: message
      }
    }
  }

  const signUpWithGoogleProvider = async () => {
    try {
      await signInWithPopup(auth, provider)
      const userClass = new User();
      await userClass.firstOrCreateUser();
      setUpdated(!updated);
      return {
        status: true,
        message: "Login successfully!"
      }
    } catch (error) {
      return {
        status: true,
        message: error.message
      }
    }
  }

  const signUpWithAppleProvider = async () => {
    try {
      const appleProvider = new OAuthProvider('apple.com');
      await signInWithPopup(auth, appleProvider)
      const userClass = new User();
      await userClass.firstOrCreateUser();
      setUpdated(!updated);
      return {
        status: true,
        message: "Login successfully!"
      }
    } catch (error) {
      return {
        status: true,
        message: error.message
      }
    }
  }

  const signUpWithFacebookProvider = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider)
      const userClass = new User();
      await userClass.firstOrCreateUser();
      setUpdated(!updated);
      return {
        status: true,
        message: "Login successfully!"
      }
    } catch (error) {
      return {
        status: true,
        message: error.message
      }
    }
  }


  const updateLoginUser = async (inputData, message = "User profile pic updated successfully!") => {
    try {
      if (user) {
        const userClass = new User();
        if (inputData?.username) {
          const checkUsername = await userClass.get([
            where('username', "==", (inputData?.username || "")),
            where("id", "!=", user.uid)
          ]);
          if (checkUsername.status) {
            if (checkUsername.data.length) {
              throw new Error('Username already exist!');
            }
          }
        }
        if (inputData?.name || inputData?.image) {
          await updateProfile(auth.currentUser, {
            displayName: inputData?.name ? inputData.name : user.name,
            photoURL: inputData?.image ? inputData.image : user.photoURL
          });
        }
        const result = await userClass.update(user.uid, {
          name: inputData?.name ? inputData.name : user.displayName,
          bio: inputData?.bio ? inputData.bio : user.bio,
          username: inputData?.username ? inputData.username : user.username,
          phoneNumber: inputData?.phoneNumber ? inputData.phoneNumber : user.phoneNumber,
          photoURL: inputData?.image ? inputData.image : user.photoURL,
          theme: inputData?.theme ? inputData?.theme : (user.theme || "light"),
        });
        if (result.status) {
          setUpdated(!updated);
          toast(message, { type: "success" });
        } else {
          throw new Error(result.message);
        }
      } else {
        throw new Error('User not authenticated!');
      }
    } catch (error) {
      toast(error.message, { type: "error" });
    }
  }

  const signIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userClass = new User();
      await userClass.firstOrCreateUser();
      setUpdated(!updated);
      return {
        status: true,
        message: "Login successfully!",
        data: result
      }
    } catch (error) {
      var message = error?.message || "Something went wrong";
      switch (error.code) {
        case 'auth/wrong-password':
          message = 'Invalid password!';
          break;
        case 'auth/user-not-found':
          message = 'Invalid email!';
      }
      return {
        status: false,
        message: message
      }
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(false);
    setIsLoading(false);
  }

  return (
    <UserContext.Provider value={{
      user,
      logout,
      signIn,
      updateLoginUser,
      signUpWithEmailAndPassword,
      signUpWithGoogleProvider,
      signUpWithAppleProvider,
      signUpWithFacebookProvider,
      userLoading: isLoading,
      useLoginPopup: () => useLoginPopup,
    }}>
      {children}
      {/* {
        isLoading ? (
          <SiteLoader />
        ) : children
      } */}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};