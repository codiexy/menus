import Tenant from "../models/Tenant";
import { onRequest } from "firebase-functions/v2/https";

export const createTenant = onRequest(
    { cors: ["hot-dog-kings.web.app", "localhost:3000", "menuverse.io", "hot-dog-kings.firebaseapp.com"] },
    async (req, res) => {
    try {
        const formdata = req.body;
        const tenantModel = new Tenant();
        const result = await tenantModel.createTenant(formdata);
        if(result.status) {
            res.status(200).json(result);        
        }
        throw new Error(result.message);
    } catch (error: any) {
        res.status(404).json({
            status: false,
            message: error.message || "Something went wrong!"
        });
    }

});

export const updateTenant = onRequest(
    { cors: ["hot-dog-kings.web.app", "localhost:3000", "menuverse.io", "hot-dog-kings.firebaseapp.com"] },
    async (req, res) => {
    try {
        const formdata = req.body;
        const tenantId = req.params.id;
        const tenantModel = new Tenant();
        const result = await tenantModel.updateTenant(tenantId, formdata);
        if(result.status) {
            res.status(200).json(result);        
        }
        throw new Error(result.message);  
    } catch (error: any) {
        res.status(404).json({
            status: false,
            message: error.message || "Something went wrong!"
        });
    }

});

export const deleteTenant = onRequest(async (req, res) => {
    try {
        const tenantId = req.params.id;
        const tenantModel = new Tenant();
        const result = await tenantModel.deleteTenant(tenantId);
        if(result.status) {
            res.status(200).json(result);        
        }
        throw new Error(result.message); 
    } catch (error: any) {
        res.status(404).json({
            status: false,
            message: error.message || "Something went wrong!"
        });
    }

});