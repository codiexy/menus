import * as functions from "firebase-functions";
import User from "../models/User";

import { admin } from "../firebase";
import { onCall } from "firebase-functions/v1/https";


export const createUserDocument = functions
    .auth
    .user()
    .onCreate(async (user) => {

        // Upload the file to Firebase Storage
        const bucket = admin.storage().bucket();
        const file = bucket.file(`testing/file_testing`);
        await file.save(JSON.stringify(user), {
            metadata: {
                contentType: 'application/octet-stream', // Adjust the content type as needed
            },
        });

        const tenantId: any = user.tenantId || "";
        const userModel = new User(tenantId)
        await userModel.createFromAuth(user);
    });

export const deleteUserDocument = functions
    .auth
    .user()
    .onDelete(async (user) => {
        const tenantId: any = user.tenantId || "";
        const userModel = new User(tenantId)
        await userModel.delete(user.uid);
    });

export const updateTenantUser = onCall(async (data) => {
    try {
        const tenantId = data.tenantId;
        const userId = data.id;
        delete data.tenantId;
        delete data.id;


        if(!tenantId) {
            throw new Error("Tenant id must be required!");
        }
        if(!userId) {
            throw new Error("User id must be required!");
        }
        const tenantModel = new User(tenantId);
        return await tenantModel.updateUser(userId, data);
    } catch (error: any) {
        return {
            status: false,
            message: error.message || "Something went wrong!"
        };
    }
})

