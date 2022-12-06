const axios = require('axios');
require("dotenv").config();
const headers= {
    'X-DEVICE-ID':"123-123-123-123-21",
    'X-OS-TYPE': 'web',
    'X-OS-VERSION': '1.0',
    'X-APP-VERSION': '1.0',
    'X-DEVICE-NAME': "IOS"
    // 'authorization': `Bearer`
  }
const url = process.env.SERVER_GATEWAY
module.exports = {
/**
     * @Author Nguyễn Tiến Tài
     * @Created_at 12/05/2022
     * @Description Call api Route login user
*/
    login_User_Test: async ( user_name, password ) => {
        try {
            const res = await axios.post(`${url}/user/user/login`,
            {
                input: {
                    user_login_input: {
                        email: user_name,
                        password: password
                    }
                }
            },{
                headers
            })
            return res
        } catch (error) {
            return error;
        }
    }
}