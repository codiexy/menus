import { UserRecord } from "firebase-admin/auth"
import Model from "./Model"
import Notification from "./Notification"

export default class User extends Model {

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

    constructor(tenantId: string) {
        super(tenantId, "users")
    }

    createFromAuth = async (user: UserRecord) => {
        const role = user.customClaims?.role || "user";
        const username = user.customClaims?.username || this.getRandomName(user, 'username');
        const name = user.displayName ? user.displayName : this.getRandomName(user);
        const userData = await this.find(user.uid);
        if(userData) {
            const res = await this.insert({
                name,
                username,
                email: user.email,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber,
                bio: "",
                emailVerified: user.emailVerified,
                role: role,
                theme: "light",
                metadata: user.metadata,
                createdAt: new Date(user.metadata.creationTime),
            }, user.uid);
    
            if (res) {
                const notificationClass = new Notification(this.tenantId);
                await notificationClass.create({
                    refrenceId: user.uid,
                    refrenceName: user.displayName,
                    type: 'user',
                    action: "create"
                });
            }
            return res;
        }
        return user.uid;
    }

    createUserFromMaster = async (data: any) => {
        try {
            let { firstname = "", lastname = "", name = "", photoURL = null, phoneNumber = null } = data;

            name = this.trim(name, " ");
            firstname = this.trim(firstname, " ");
            lastname = this.trim(lastname, " ");
            if (name) {
                name = name;
            } else if (firstname && lastname) {
                name = `${firstname} ${lastname}`;
            } else if (firstname) {
                name = firstname;
            } else {
                name = this.getRandom();
            }
            const createUserData: any = {
                displayName: name,
                email: data.email,
                emailVerified: false,
                password: data.password,
                disabled: false,
            }
            if (photoURL) {
                createUserData.photoURL = photoURL;
            }
            if (phoneNumber) {
                createUserData.phoneNumber = phoneNumber;
            }
            const tenantAuth = this.tenantAuth();
            const user = await tenantAuth.createUser(createUserData)

            const role = data?.role || "user";
            const username = data?.username || this.getRandomName(user, 'username');
            await tenantAuth.setCustomUserClaims(user.uid, {
                role,
                username
            });
            return {
                status: true,
                message: 'User created successfully!',
                data: {
                    id: user.uid
                }
            }
        } catch (error: any) {
            return {
                status: false,
                message: error.message || 'Something went wrong!',
                data: false
            }
        }
    }

    updateUser = async (id: string, data: any) => {
        try {
            let updateData: any = {};
            if(data?.status && typeof data.status == "boolean") {
                updateData.disabled = data.status;
            }
            if(data?.name) {
                updateData.displayName = data.name;
            }
            if(data?.email) {
                updateData.email = data.email;
            }
            if(data?.emailVerified && typeof data.emailVerified == "boolean") {
                updateData.emailVerified = data.emailVerified;
            }
            if(data?.password) {
                updateData.password = data.password;
            }
            if(data?.phoneNumber) {
                updateData.phoneNumber = data.phoneNumber;
            }
            if(data?.photoURL) {
                updateData.photoURL = data.photoURL;
            }

            const tenantAuth = this.tenantAuth();
            let user: UserRecord | null = null;
            if(Object.keys(updateData).length) {
                user = await tenantAuth.updateUser(id, updateData);
            }
            let customClaims: any = {};
            if(user) {
                customClaims.role = user.customClaims?.role || "user";
                customClaims.username = user.customClaims?.username || this.getRandomName(user, 'username');
            }
            if(data?.role) { customClaims.role = data.role; }
            if(data?.username) { customClaims.username = data.username; }
            if(Object.keys(customClaims).length) {
                await tenantAuth.setCustomUserClaims(id, customClaims);
            }
            if(Object.keys(data).length) {
                if(updateData?.disabled) {
                    updateData.status = updateData.disabled ? "active" : "inactive";
                    delete updateData.disabled;
                }
                if(updateData?.displayName) {
                    updateData.name = updateData.displayName;
                    delete updateData.displayName;
                }
                if(customClaims?.role) { updateData.role = customClaims.role; }
                if(customClaims?.username) { updateData.username = customClaims.username; }
                if(data?.bio) { updateData.bio = data.bio; }
                if(data?.theme) { updateData.theme = data.theme; }
                
                if(Object.keys(updateData).length) {
                    await this.update(id, updateData)
                }
                return {
                    status: true,
                    message: 'User updated successfully!'
                }
            } 
            return {
                status: false,
                message: 'Data not found!'
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
        const { displayName = "" } = data;
        let full_name = displayName ? displayName : this.getRandom();
        if (type === "username") {
            return full_name.toLocaleLowerCase()
                .replace(' ', "")
                .substring(0, 7) + Date.now();
        }
        return full_name;
    }
}