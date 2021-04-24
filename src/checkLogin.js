import axios from 'axios';

async function checkLogin() {    
    let isLoggedIn = false;
    try {
        let response = await axios.get('http://localhost:8080/student');
        if (response.status === 200) {
            isLoggedIn = true;
        }
    } catch(error) {
        console.log(error);
    }
    
    return isLoggedIn;
}

export default checkLogin;