import Swal from "sweetalert2";

const postImageRequest = async (imageFile:any) => {
    const url = process.env.REACT_APP_BACKEND+"/assets/images";
    const body = new FormData();
    body.append('image', imageFile)
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'gzip, deflate, br', 
            },
            body: body
        })
        if (response.status === 401)
            throw new Error("Unathorized user")
        return await response.json();
    } catch(error:any) {
        Swal.fire({
            icon: 'error',
            title: 'Incorrect Credentials!',
            confirmButtonColor: "#4db6ac",
            text: error
          });
        return null;
    }
}

export {
    postImageRequest,
}