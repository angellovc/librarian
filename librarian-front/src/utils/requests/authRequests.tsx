import Swal from 'sweetalert2'

const loginRequest = async (email:string, password:string) => {
    const url = process.env.REACT_APP_BACKEND+"/auth/login";
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        });
        if (response.status === 401)
            throw new Error("Unathorized user")
        const {token, user} = await response.json();
        return {token, ...user};
    } catch(error:any){
        Swal.fire({
            icon: 'error',
            title: 'Incorrect Credentials!',
            confirmButtonColor: "#4db6ac",
            text: error,
          })
        return null;
    }
}


const refreshToken = async(token:string) => {
    const url = process.env.REACT_APP_BACKEND+"/auth/token-refresh";
    const headers = {
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers
        });
        if (response.status === 400) {
            const {message, error} = await response.json();
            throw Error(message||error);
        }
        return await response.json();
    } catch(error:any) {
        Swal.fire({
            icon: 'error',
            title: 'Incorrect Credentials!',
            confirmButtonColor: "#4db6ac",
            text: error,
        })
        return null;
    }
}

export {
    loginRequest,
    refreshToken
}