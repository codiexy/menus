import { FacebookAuthProvider, OAuthProvider, createUserWithEmailAndPassword, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithEmailLink, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import Database from "./Database";
import Notification from './Notification';
import { gmailProvider } from "@/firebase";

export default class User extends Database {

    insertData = {}
    updateData = {}
    fastFoodCharacters = [
        'Burger',
        'Fish and Chips',
        'Sandwiches',
        'Pitas',
        'Hamburgers',
        'Fried Chicken',
        'French Fries',
        'Onion Rings',
        'Chicken Nuggets',
        'Hot dogs'
    ]

    constructor(tenantId: string | null) {
        super(tenantId, 'users')
    }

    login = async (email: string, password: string, data: any = {}) => {
        try {
            const res = await signInWithEmailAndPassword(this.auth, email, password);
            this.user = res.user;
            return this.createOrUpdateUser({
                ...data,
                email
            })
        } catch (error: any) {
            var message = error?.message || "Something went wrong";
            switch (error.code) {
                case 'auth/wrong-password':
                    message = 'Invalid password!';
                    break;
                case 'auth/user-not-found':
                    message = 'Invalid email!';
            }
            return {
                id: "",
                status: false,
                message: message
            }
        }
    }

    register = async (email: string, password: string, data: any = {}) => {
        try {
            const res = await createUserWithEmailAndPassword(this.auth, email, password);
            this.user = res.user;

            const result = await this.execute('updateTenantUser', {
                ...data,
                email,
                tenantId: this.tenantId,
                id: this.user.uid
            });
            console.log(result)
            return {
                status: true,
                message: "Your account created successfully!",
                id: res.user.uid
            }
            // return this.createOrUpdateUser({
            //     ...data,
            //     email
            // })
        } catch (error: any) {
            return {
                id: "",
                status: false,
                message: error.message
            }
        }
    }

    loginWithProvider = async (type: string = "gmail") => {
        try {
            let provider: any = null;
            switch (type) {
                case "gmail":
                    provider = gmailProvider;
                    break;
                case "apple":
                    provider = new OAuthProvider('apple.com');
                    break;
                case "facebook":
                    provider = new FacebookAuthProvider();
                    break;
                default:
                    break;
            }
            if (provider) {
                const res = await signInWithPopup(this.auth, provider);
                this.user = res.user;
                const email = res.user?.email || "";
                return this.createOrUpdateUser({
                    email
                });
            }
            return {
                id: "",
                status: false,
                message: "Provider not found!"
            }
        } catch (error: any) {
            return {
                id: "",
                status: false,
                message: error.message
            }
        }
    }

    logout = async () => {
        try {
            await signOut(this.auth);
            return {
                status: true,
                message: "Logout successfully!"
            }
        } catch (error: any) {
            return {
                status: false,
                message: error.message
            }
        }
    }


    getRandom = () => {
        return this.fastFoodCharacters[Math.floor(Math.random() * this.fastFoodCharacters.length)];
    }

    getRandomName = (data: any = {}, type = "username") => {
        const { firstname = "", lastname = "", name = "" } = data;
        let full_name = name;
        if (!name) {
            if (firstname & lastname) {
                full_name = `${firstname} ${lastname}`;
            } else if (firstname) {
                full_name = firstname;
            } else {
                full_name = data?.displayName ? data.displayName : this.getRandom();
            }
        }
        if (type === "username") {
            return full_name.toLocaleLowerCase().replace(' ', "").substring(0, 7) + Date.now();
        }
        return full_name;
    }



    createOrUpdateUser = async (data: any = {}) => {
        try {
            let inputData: any = {};
            const currentUser: any = this.user;
            if (!currentUser?.email) {
                if (typeof data?.email == "undefined" || !data.email) {
                    return {
                        status: false,
                        message: "Email is required!",
                        id: ""
                    };
                }
            }

            const name = this.getRandomName({
                name: data?.name || currentUser?.displayName
            }, "");
            const username = data?.username?.trim() ? data.username.trim() : this.getRandomName({ name });
            const mobile = data?.mobile || currentUser?.phoneNumber || "";
            const photoUrl = data?.photoURL || currentUser?.photoURL || "";
            const role = data?.role || currentUser.role || "user";

            if (currentUser?.displayName !== name) {
                inputData.displayName = name;
            }
            if (currentUser?.photoURL !== photoUrl) {
                inputData.photoURL = photoUrl;
            }
            if (Object.keys(inputData).length) {
                await updateProfile(currentUser, inputData);
            }
            const userData = await this.first(currentUser.uid);
            if (userData) {
                delete inputData.displayName;

                inputData.name = name;
                if (!userData.username) inputData.username = username;
                // if(!userData.email) inputData.email = currentUser.email;
                if (mobile && userData.phoneNumber !== mobile) {
                    inputData.phoneNumber = mobile;
                }
                if (!userData?.bio) inputData.bio = data?.bio || "";
                if (typeof userData?.isAnonymous != "boolean") inputData.isAnonymous = currentUser.isAnonymous;
                if (typeof userData?.emailVerified != "boolean") inputData.emailVerified = currentUser.emailVerified;
                if (typeof userData?.isAdmin != "boolean") inputData.isAdmin = false;
                if (typeof userData?.theme == "undefined" || !userData.theme) inputData.theme = data?.theme || "light";

                const res = await this.update(currentUser.uid, inputData);
                return {
                    ...res,
                    id: currentUser.uid
                }
            } else {
                const res = await this.insert({
                    name,
                    username,
                    email: data.email,
                    photoURL: photoUrl,
                    phoneNumber: mobile,
                    bio: data?.bio || "",
                    isAnonymous: currentUser?.isAnonymous || false,
                    emailVerified: currentUser?.emailVerified || false,
                    isAdmin: false,
                    role: role,
                    theme: data?.theme || "light",
                    createdAt: new Date(currentUser.metadata.creationTime),
                }, currentUser.uid);

                if (res.status) {
                    const notificationClass = new Notification(this.tenantId);
                    await notificationClass.create({
                        refrenceId: currentUser.uid,
                        refrenceName: currentUser.displayName,
                        type: 'user',
                        action: "create"
                    });
                }
                return res;
            }
        } catch (error: any) {
            return {
                status: false,
                message: error.message,
                id: ""
            };
        }
    }

    sendLoginLinkToEmail = async (email: string) => {
        try {
            if (!this.isValidEmail(email)) {
                return {
                    status: false,
                    message: "Email must be valid!"
                }
            }
            await sendSignInLinkToEmail(this.auth, email, {
                url: this.base_url, // Change this to your app's URL
                handleCodeInApp: true,
            })
            this.localStorage.setItem('emailForSignIn', email)
            return {
                status: true,
                message: "Login link has been sent to your email!"
            }
        } catch (error: any) {
            console.log("eoror", error)
            return {
                status: false,
                message: error.message
            }
        }
    };

    loginWithEmailLink = async () => {
        try {
            if (isSignInWithEmailLink(this.auth, this.location.href)) {
                let email: any = this.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Please provide your email for confirmation');
                }

                await signInWithEmailLink(this.auth, email.trim(), this.location.href);
                this.localStorage.setItem('emailForSignIn', email);

                return {
                    status: true,
                    message: "Login successfully with email!"
                }
            }

            return {
                status: false,
                message: "You are not authenticated!"
            }
        } catch (error: any) {
            return {
                status: false,
                message: error.message
            }
        }
    };

}