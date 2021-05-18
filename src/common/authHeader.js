export default function authHeader() {
    let token = localStorage.getItem("token");
    if (token === null)
        return null;
    return 'Bearer ' + token;
}