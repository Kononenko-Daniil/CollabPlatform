import axios from "axios";
import constants from "./Constants";

class Service{
    constructor(){
        this.errorCatcher = this.errorCatcher.bind(this);
    }
    static getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static CheckCookies(){
        axios({
            method: 'GET',
            url: constants.apiPort + "/cookie/check-cookies",
            withCredentials: true
        }).then(res => {}).catch(this.errorCatcher)
    }

    static errorCatcher(error){
        const errorType = error.response.data.errorType;
        console.log(error.response);
        if(errorType === "Unsigned"){
            window.location.href = constants.reactAppPort + '/sign-in';
        }
    }
}

export default Service;