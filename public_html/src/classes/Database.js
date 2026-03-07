import {
    collection, query, getDocs, where, doc, getDoc,
    addDoc, setDoc, updateDoc, deleteDoc, Timestamp
} from "firebase/firestore";

import { db, auth } from "../firebase";

export default class Database {

    user = auth?.currentUser || false;
    collectionName;

    constructor(collectionName = "") {
        this.collectionName = collectionName;
    }

    first = async (value, column = 'id') => {
        try {
            if (this.collectionName) {
                var result = false;
                if (column === "id") {
                    const docRef = doc(db, this.collectionName, value);
                    let queryResult = await getDoc(docRef);
                    result = queryResult?.data() ? {
                        id: queryResult.id,
                        ...queryResult.data()
                    } : false;
                } else {
                    const queryResult = await this.get([
                        where(column, '==', value)
                    ]);
                    result = queryResult?.data?.shift() || false;
                }
                if (result) {
                    return {
                        status: true,
                        message: "",
                        data: result
                    }
                }
                return {
                    status: false,
                    message: "No data found!"
                }
            }
            throw new Error('Invalid collection name!');
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: error?.message || "Something went wrong!"
            }
        }
    }

    get = async (options = []) => {
        try {
            if (this.collectionName) {
                let collectionRef = collection(db, this.collectionName);
                let results = await getDocs(query(collectionRef, ...options));
                results = results.docs.map(document => {
                    return this._format(document);
                });

                return {
                    status: results.length ? true : false,
                    message: results.length ? "" : "No data found!",
                    data: results
                }
            }
            throw new Error('Invalid collection name!');
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: error?.message || "Something went wrong!",
                data: []
            }
        }
    }

    insert = async (inputData, id = "") => {
        try {
            if (!this.user) {
                throw new Error('User not authenticated!');
            }
            if (Object.keys(inputData).length) {
                var data = false;
                if (id) {
                    const collectionRef = doc(db, this.collectionName, id);
                    await setDoc(collectionRef, {
                        ...inputData,
                        status: inputData?.status ? inputData.status : "active",
                        createdBy: this.user.uid,
                        updatedBy: this.user.uid,
                        createdAt: inputData?.createdAt ? inputData.createdAt : Timestamp.now().toDate(),
                        updatedAt: inputData?.createdAt ? inputData.createdAt : Timestamp.now().toDate()
                    });
                } else {
                    let collectionRef = collection(db, this.collectionName);
                    const result = await addDoc(collectionRef, {
                        ...inputData,
                        status: inputData?.status ? inputData.status : "active",
                        createdBy: this.user.uid,
                        updatedBy: this.user.uid,
                        createdAt: Timestamp.now().toDate(),
                        updatedAt: Timestamp.now().toDate()
                    })
                    id = result.id;
                }
                const dataRes = await this.first(id);
                data = dataRes?.data || false;
                return {
                    status: true,
                    message: "Inserted successfully!",
                    data: data
                }
            }
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: error.message,
                data: error
            }
        }
    }

    update = async (id, inputData) => {
        try {
            if (!this.user) {
                throw new Error('User not authenticated!');
            }
            if (Object.keys(inputData).length) {
                let collectionRef = doc(db, this.collectionName, id);
                await updateDoc(collectionRef, {
                    ...inputData,
                    updatedBy: this.user.uid,
                    updatedAt: Timestamp.now().toDate()
                })
                const data = await this.first(id);
                return {
                    status: true,
                    message: "Updated successfully!",
                    data: data
                }
            }
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: error.message,
                data: error
            }
        }
    }

    delete = async (id) => {
        try {
            if (!this.user) {
                throw new Error('User not authenticated!');
            }
            if (id) {
                await deleteDoc(doc(db, this.collectionName, id));
                return {
                    status: true,
                    message: "Deleted successfully!",
                    data: false
                }
            }
            throw new Error('Id not found!')
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: error.message,
                data: error
            }
        }
    }

    pagination = async (limit = 25, start = 0, otherQueries = []) => {
        try {
            // total docs of the collection
            const result = await this.get(otherQueries);
            const data = result?.data || [];
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
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: error.message,
                data: false
            }
        }
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

    _format = (document) => {
        return document ? {
            id: document.id,
            ...document.data()
        } : false
    }

}