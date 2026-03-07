import Model from "./Model";
import User from './User'

export default class Tenant extends Model {

    constructor () {
        super();
    }

    createTenant = async (data: any) => {
        try {
            const displayName = this.slug(data.name);
            const result = await this.getTenantManager()
                .createTenant({
                    displayName,
                    emailSignInConfig: {
                        enabled: true,
                        passwordRequired: true
                    },
                    anonymousSignInEnabled: false
                });
            
            const id = result.tenantId;
            await this.insert({
                name: data.name,
                slug: displayName,
                email: data.email,
                mobile: data.phone_number,
                plan: data?.plan || "free"
            }, id);

            const userModel = new User(id);
            const userResult = await userModel.createUserFromMaster({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phoneNumber: data.phone_number,
                password: data.password,
                role: "admin",
            });
            if(userResult.status) {
                const userData: any = userResult.data;
                await this.update(id, {
                    user_id: userData.id
                });
            }
            return {
                status: true,
                message: 'Tenant created successfully!',
                data: { id }
            };
        } catch (error: any) {
            return {
                status: false,
                message: error.message || 'Tenant not created successfully!',
                data: false
            };
        }
        
    }

    updateTenant = async (tenantId: string, data: any) => {
        try {
            const displayName = this.slug(data.name);
            await this.getTenantManager()
                .updateTenant(tenantId, { displayName });

            const updateData: any = {
                name: data.name,
                slug: displayName
            };
            if(data.email) {
                updateData.email = data.email;
            }
            if(data.phone_number) {
                updateData.mobile = data.phone_number;
            }
            await this.update(tenantId, updateData);
            return {
                status: true,
                message: 'Tenant updated successfully!'
            };
        } catch (error: any) {
            return {
                status: false,
                message: error.message || 'Tenant updated successfully!'
            };
        }
    }

    deleteTenant = async (tenantId: string) => {
        try {
            await this.getTenantManager()
                .deleteTenant(tenantId);
            await this.delete(tenantId);
            return {
                status: true,
                message: 'Tenant deleted successfully!'
            };
        } catch (error: any) {
            return {
                status: false,
                message: error.message || 'Tenant deleted successfully!'
            };
        }
    }

    formatTenant = (tenant: any) => {
        return {
            id: tenant.tenantId,
            name: tenant.displayName,
        }
    }
}