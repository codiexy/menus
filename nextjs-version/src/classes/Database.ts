import { auth, db } from "@/firebase";
import {
    collection, query, getDocs, where, doc, getDoc,
    addDoc, setDoc, updateDoc, deleteDoc, Timestamp
} from "firebase/firestore";
import User from "./User";
import { getBaseUrl, trim } from "@/helper";
import { getFunctions, httpsCallable } from "firebase/functions";

export default class Database {

    protected user = auth?.currentUser;
    protected database: string = "tenants";

    protected collection: string = this.database;

    protected db = db;

    protected auth = auth;

    protected location = window.location;
    protected localStorage = window.localStorage;

    public tenantId: string | null = null;

    protected path: string = "";

    public is404: boolean = false;

    public tenant: any = false;

    public base_url: string = "";

    constructor(tenantId: string | null, path: string = "", isParent: boolean = true) {
        this.path = path.trim() ? path.trim() : "";
        if (!isParent) {
            this.database = "";
        }
        this.setTenantId(tenantId);
        this.setCollection()
        this.base_url = getBaseUrl();
    }

    setTenantId = (tenantId: string | null) => {
        if (typeof tenantId == "string") {
            tenantId = tenantId.trim();
        }
        this.tenantId = tenantId;
        this.auth.tenantId = tenantId;
    }

    setCollection = (path: string = "") => {
        path = path.trim() ? path.trim() : this.path;
        let collection = this.database;
        if (this.tenantId) {
            collection += `/${this.tenantId}`;
        }
        if (path) {
            collection += `/${path}`;
        }
        this.collection = collection;
    }

    // constructor(tenantId: string | null, path: string = "") {
    //     this.path = path.trim() ? path.trim() : "";
    //     this.setTenantId(tenantId);
    //     this.setCollection()
    //     this.base_url = getBaseUrl();
    // }

    // setTenantId = (tenantId: string | null) => {
    //     if (typeof tenantId == "string") {
    //         tenantId = tenantId.trim();
    //     }
    //     this.tenantId = tenantId;
    //     this.auth.tenantId = tenantId;
    // }

    // setCollection = (path: string = "") => {
    //     path = path.trim() ? path.trim() : this.path;
    //     this.collection = `${this.database}/${this.auth.tenantId}/${path}`;
    // }

    first = async (value: string, column: string = 'id') => {
        try {
            if (column === "id") {
                let res = await getDoc(
                    doc(this.db, this.collection, value)
                );
                return this._format(res);
            } else {
                const res = await this.get([
                    where(column, '==', value)
                ]);
                return res.shift() || false;
            }
        } catch (error: any) {
            return false;
        }
    }

    get = async (options: any = []) => {
        try {
            let results = await getDocs(
                query(
                    collection(this.db, this.collection),
                    ...options
                )
            );
            return results.docs.map(document => {
                return this._format(document);
            });
        } catch (error: any) {
            return [];
        }
    }

    insert = async (inputData: any, id = "") => {
        let message;
        try {
            if (Object.keys(inputData).length) {
                inputData.status = inputData?.status ? inputData.status : "active";
                inputData.createdAt = typeof inputData.createdAt == "string" ? inputData.createdAt : Timestamp.now().toDate();
                inputData.updatedAt = Timestamp.now().toDate();
                if (id) {
                    await setDoc(
                        doc(this.db, this.collection, id),
                        inputData
                    );
                } else {
                    const result = await addDoc(
                        collection(this.db, this.collection),
                        inputData
                    )
                    id = result.id;
                }
                return {
                    status: true,
                    message: "Inserted successfully!",
                    id
                }
            }
            message = "Data not found!";
        } catch (error: any) {
            message = error.message;
        }
        return {
            status: false,
            message,
            id: ""
        }
    }

    update = async (id: string, updateData: any) => {
        let message;
        try {
            if (Object.keys(updateData).length) {
                updateData.updatedAt = Timestamp.now().toDate();
                await updateDoc(
                    doc(this.db, this.collection, id),
                    updateData
                )
                return {
                    status: true,
                    message: "Updated successfully!"
                }
            }
            message = "Data not found!";
        } catch (error: any) {
            message = error.message;
        }
        return {
            status: false,
            message
        }
    }

    delete = async (id: string) => {
        try {
            if (!id) throw new Error("Id not found!");
            await deleteDoc(
                doc(this.db, this.collection, id)
            );
            return {
                status: true,
                message: "Delete successfully!"
            }
        } catch (error: any) {
            return {
                status: false,
                message: error.message
            }
        }
    }

    pagination = async (limit: number = 25, start: number = 0, otherQueries: any = []) => {
        try {
            // total docs of the collection
            const data = await this.get(otherQueries);
            return {
                status: true,
                message: "",
                data: {
                    data: data.slice(start, start + limit),
                    count: data.length,
                    limit: limit,
                    start: start + limit
                }
            }
        } catch (error: any) {
            return {
                status: false,
                message: error.message,
                data: {
                    data: [],
                    count: 0,
                    limit,
                    start
                }
            }
        }
    }

    execute = async (funcName: string, ...data: any) => {
        const functions = getFunctions(this.auth.app);
        const callableReturnMessage = httpsCallable(functions, funcName);
        return await callableReturnMessage(...data)
            .then((result) => {
                return result.data
            }).catch((error) => {
                throw error;
            });
    }

    getTenantSlug = () => {
        let path = this.location.pathname;
        return path.split("/").filter(p => p).shift() || "admin";
    }

    // firstOrCreate = async (params, inputData) => {
    //     try {
    //         if (typeof params === "object", Object.keys(params).length) {
    //             console.log(params, inputData);
    //             const keys = Object.keys(params);
    //             if (keys.length === 1) {
    //                 const result = await this.first(params[keys[0]], keys[0]);
    //                 if (result.status) {
    //                     return await this.update(result.data.id, inputData);
    //                 }
    //             }
    //             const result = await this.get()
    //         } else {
    //             return this.insert(inputData);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         return {
    //             status: false,
    //             message: error.message,
    //             data: false
    //         }
    //     }

    // }

    _format = (document: any) => {
        return document?.data() ? {
            id: document.id,
            ...document.data()
        } : false
    }

    isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }


}