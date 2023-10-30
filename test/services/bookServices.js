import axios from 'axios';

const BASE_URL = "https://bookstore.toolsqa.com";

class bookService {

    async generateToken(data) {
        try {
            let response = await axios.post(BASE_URL + "/Account/v1/GenerateToken", data, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                }
            })
            return response;
        } catch (err) {
            return err;
        }
    }

    async createBooks(data) {

        try {
            let response = await axios.post(BASE_URL + `/BookStore/v1/Books`, data, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${response.token}`
                },
            })
            return response;
        } catch (err) {
            return err;
        }
    }

    async deleteBooks(userId) {

        try {
            let response = await axios.delete(BASE_URL + `/BookStore/v1/Books?UserId=${userId}`, {
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${response.token}`
                }
            })
            return response;
        } catch (err) {
            return err;
        }
    }

}

export default new bookService();