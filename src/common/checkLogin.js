import axios from 'axios';

async function checkLogin() {    
    let isLoggedIn = false;
    if (localStorage.getItem("token") === null)
        return false;
    try {
        let response = await axios.get('http://localhost:8080/student', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        });
        if (response.status === 200) {
            isLoggedIn = true;
        }
    } catch(error) {
        console.log("INJA");
        console.log(error);
    }
    
    return isLoggedIn;
}

export default checkLogin;