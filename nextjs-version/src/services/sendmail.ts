
import { getBaseUrl } from "@/helper";
import axios from "axios";


export const sendEmail = async () => {
    let results = await axios({
        method: 'POST',
        url: getBaseUrl('/api/sendemail'),
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