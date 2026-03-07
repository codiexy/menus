import { admin, serviceAccount } from "../firebase";

export default class Model {

    protected firebase = admin;

    protected config = serviceAccount;

    protected user = false;

    protected tenantId: string = "";

    protected database: string = "";

    protected collection: string = "";

    protected path: string = "";

    constructor(tenantId: string = "", path: string = "", isParent: Boolean = true) {
        // this.request = request;
        this.path = this.trim(path);
        this.database = isParent ? "tenants" : "";
        this.setTenantId(tenantId);
        this.setCollection()
    }

    setTenantId = (tenantId: string = "") => {
        this.tenantId = tenantId;
    }

    setCollection = (path: string = "") => {
        path = this.trim(path) ? this.trim(path) : this.path;
        let collection = this.database;
        if(this.tenantId) {
            collection += `/${this.tenantId}`;
        }
        if(path) {
            collection += `/${path}`;
        }
        this.collection = collection; 
    }

    getTenantManager = () => {
        return this.firebase.auth().tenantManager();
    }

    getFirestoreDB = (collection: string = "") => {
        collection = collection.trim() ? collection.trim() : this.collection;
        return this.firebase.firestore().collection(collection);
    }

    getTenantByName = async (name: string = "") => {
        name = this.trim(name, " ");
        if(!name) throw new Error("Something went wrong!");
        return await this.getFirestoreDB("tenants")
            .where('slug', '==', name)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const snapshot = querySnapshot.docs[0];
                    return {
                        id: snapshot.id,
                        ...snapshot.data()
                    };
                } else {
                    return false
                }
            })
            .catch((error) => {
                throw error;
                
            });
    }

    tenantAuth = (tenantId: string = "") => {
        if(tenantId.trim()) {
            tenantId = tenantId.trim();
        } else {
            tenantId = this.tenantId;
        }
        if(!tenantId) throw new Error("Something went wrong!");
        return this.firebase
            .auth()
            .tenantManager()
            .authForTenant(tenantId);
    }

    find = async (value: string, column = 'id') => {
        try {
            var result: any = false;
            if (column === "id") {
                result = await this.getFirestoreDB()
                    .doc(value)
                    .get();
            } else {
                result = await this.getFirestoreDB()
                    .where(column, '==', value)
                    .get();
                result = result.docs.shift() || false;
            }
            if (result) {
                return {
                    id: result.id,
                    ...result.data()
                }
            }
            throw new Error("Something went wrong!");
        } catch (error: any) {
            console.error(error)
            return false;
        }
    }

    get = async (options: any = {}) => {
        const {
            whereConditions = [],
            orderBy = "ASC",
            orderColumn = "createdAt",
            limit = 0,
            offset = 0,
            count = false,
            pagination = false
        } = options;
        try {
            let query: any = this.getFirestoreDB();
            for (let i = 0; i < whereConditions.length; i++) {
                const { column, seperator = "==", value } = whereConditions[i];
                query.where(column, seperator, value);
            }
            query.orderBy(orderColumn, orderBy);
            if (limit > 0) {
                query.limit(limit)
                    .offset(offset);
            }
            if (count && !pagination) {
                return await query.count();
            }
            const results = await query.get();
            const data = results.docs.map((document: any) => this._format(document));

            if (pagination) {
                const totalCount = await query.count();
                return {
                    count: totalCount,
                    start: offset + limit,
                    limit,
                    data
                }
            } else {
                return data;
            }
        } catch (error: any) {
            console.error(error)
            return [];
        }
    }

    insert = async (inputData: any, id = "") => {
        try {
            if (Object.keys(inputData).length) {
                let result;
                if (id) {
                    result = await this.getFirestoreDB()
                        .doc(id)
                        .set({
                            ...inputData,
                            status: inputData?.status ? inputData.status : "active",
                            createdAt: inputData?.createdAt ? inputData.createdAt : new Date(),
                            updatedAt: inputData?.createdAt ? inputData.createdAt : new Date()
                        });
                } else {
                    result = await this.getFirestoreDB()
                        .add({
                            ...inputData,
                            status: inputData?.status ? inputData.status : "active",
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    id = result.id;
                }
                return id;
            }
            throw new Error("Data not found!");
        } catch (error: any) {
            throw error;
        }
    }

    update = async (id: string, inputData: any) => {
        try {
            if (Object.keys(inputData).length) {
                return await this.getFirestoreDB()
                    .doc(id)
                    .update({
                        ...inputData,
                        updatedAt: new Date()
                    });
            }
            throw new Error("Data not found!");
        } catch (error: any) {
            throw error;
        }
    }

    delete = async (id: string) => {
        try {
            if (id) {
                return await this.getFirestoreDB()
                    .doc(id)
                    .delete();
            }
            throw new Error('Id not found!')
        } catch (error) {
            throw error;
        }
    }

    trim = (str: string, seperator: string = "/") => {
        const regex = new RegExp(`^[${seperator}]+|[${seperator}]+$`, 'g');
        return str.replace(regex, '');
    }

    slug = (str: string, seperator: string = "-") => {
        str = str.trim().toLowerCase();

        // Remove special characters
        str = str.replace(/[^\w\s]/g, '');

        // Replace spaces with hyphens
        str = str.replace(/\s+/g, seperator);

        return str;
    }

    _format = (document: any) => {
        return document ? {
            id: document.id,
            ...document.data()
        } : false
    }
}