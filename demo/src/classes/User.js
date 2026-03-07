import { updateProfile } from "firebase/auth";

import Database from "./Database";
import Notification from './Notification';

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

    constructor() {
        super('Users')
    }

    getRandom = () => {
        return this.fastFoodCharacters[Math.floor(Math.random() * this.fastFoodCharacters.length)];
    }

    getRandomUsername = (inputData = {}, type = "username") => {
        var name = inputData?.name || this.user?.displayName || "";
        if (!name) {
            if (inputData?.firstname) {
                let lastName = inputData?.lastname?.trim() || "";
                name = inputData?.firstname?.trim() || "";
                name = name ? `${name}${lastName ? ' ' + lastName : ""}` : this.getRandom();
            } else {
                name = this.getRandom();
            }
        }
        if (type === "username") {
            return name.toLocaleLowerCase().replace(' ', "").substring(0, 7) + Date.now();
        }
        return name;
    }



    firstOrCreateUser = async (data = {}) => {
        try {
            if (this.user) {
                if (this.user.displayName !== data?.name) this.updateData.displayName = data?.name || this.user.displayName;
                if (this.user.photoURL !== data?.photoURL) this.updateData.photoURL = data?.photoURL || this.user.photoURL;
                if (Object.keys(this.updateData).length) {
                    await updateProfile(this.user, this.updateData);
                }
                const result = await this.first(this.user.uid);
                if (result.status) {
                    const userData = result.data;
                    const name = this.updateData?.displayName || this.user?.displayName || "";
                    const mobile = data?.mobile || this.user?.phoneNumber || "";
                    delete this.updateData.displayName;
                    if (userData.name !== name) this.updateData.name = name ? name : this.getRandom();
                    if (!userData?.username) this.updateData.username = data?.username ? data.username : this.getRandomUsername();
                    if (!userData?.email) this.updateData.email = this.user.email;
                    if (mobile && userData.phoneNumber !== mobile) this.updateData.phoneNumber = mobile;
                    if (!userData?.bio) this.updateData.bio = "";
                    if (!userData?.isAnonymous) this.updateData.isAnonymous = this.user.isAnonymous;
                    if (!userData?.emailVerified) this.updateData.emailVerified = this.user.emailVerified;
                    if (!userData?.isAdmin) this.updateData.isAdmin = false;
                    if (Object.keys(this.updateData).length) {
                        const result = await this.update(this.user.uid, this.updateData);
                        this.updateData = {};
                        if (!result.status) throw new Error(result.message);
                    }

                } else {
                    const result = await this.insert({
                        name: data?.name || this.getRandom(),
                        username: this.getRandomUsername(data),
                        email: this.user.email,
                        photoURL: this.user.photoURL || "",
                        phoneNumber: data?.mobile || this.user.phoneNumber,
                        bio: "",
                        isAnonymous: this.user.isAnonymous,
                        emailVerified: this.user.emailVerified,
                        isAdmin: false,
                        createdAt: new Date(this.user.metadata.creationTime),
                        // customClaims: { admin: false }
                    }, this.user.uid);
                    if (result.status) {
                        const notificationClass = new Notification();
                        await notificationClass.create({
                            refrenceId: this.user.uid,
                            refrenceName: this.user.displayName,
                            type: 'user',
                            action: "create"
                        });
                    }
                    if (!result.status) throw new Error(result.message);
                }
            } else {
                throw new Error("User not authenticated!");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

}