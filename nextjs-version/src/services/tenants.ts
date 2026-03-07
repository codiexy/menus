
import { getBaseUrl } from "@/helper";
import axios from "axios";


export const requestTenant = async (params: any) => {
    let results = await axios({
        method: 'POST',
        url: getBaseUrl('api/demo-requests'),
        data: params
    })
        .then(result => result)
        .catch(error => {
            return {
                status: "error",
                message: error.message
            };
        });
    return results;
}