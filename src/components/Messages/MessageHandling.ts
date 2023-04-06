import axios from "axios";

class MessageRestController{
    static async getMessage(facultyName:string, courseID:string){
        await axios.get(process.env.DATABASE_URL + '/api/messages',{
            params:{
                courseID: courseID,
                facultyName: facultyName
            },
        }).then((response)=>{
             return JSON.parse(response.data);
        }).catch((err)=>{
            if(err.response.status === 404){

            }
        })
    }

    static async postMessage(facultyName:string, courseID:string, email:string, text:string){
        await axios.post(process.env["DATABASE_URL"] + '/api/messages', {
            params: {
                courseID: courseID,
                facultyName: facultyName,
                email: email,
                text: text
            }
        })
    }


    async handleCourseNotExist(facultyName:string, courseID:string){
        axios.post(process.env["DATABASE_URL"] + `/api${facultyName.toUpperCase()}`).then(
            (response) =>{
                if(response.status === 500){
                    console.log("Something went wrong. Please try again");
                }
                axios
            }
        )
    }
}