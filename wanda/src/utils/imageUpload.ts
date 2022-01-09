import axios from "axios";

export const imageUpload = async (image: File) => {
    try {
        let formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset','rba1gwwf')
        formData.append('cloud_name', 'duzm9in6w')
       
        const res = await axios.post('https://api.cloudinary.com/v1_1/duzm9in6w/image/upload', formData)

        return { public_id: res.data.public_id, url: res.data.secure_url }
        
    } catch (error: any) {
        console.log(error.response.data)
    }
       
}