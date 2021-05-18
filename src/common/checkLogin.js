import axios from 'axios';

async function checkLogin() {    
    let isLoggedIn = false;
    let token = localStorage.getItem("token")
    if (token === null)
        return false;
    try {
        let response = await axios.get('http://localhost:8080/student', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        if (response.status === 200) {
            isLoggedIn = true;
        }
    } catch(error) {
        localStorage.removeItem("token");
    }
    
    return isLoggedIn;
}

export default checkLogin;