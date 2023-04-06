import axios from "axios";

export class MessageRestController {
    static async getMessage(facultyName, courseID) {
        await axios.get(process.env.DATABASE_URL + '/api/messages', {
            params: {
                courseID: courseID,
                facultyName: facultyName
            },
        }).then((response) => {
            return JSON.parse(response.data);
        }).catch((err) => {
            if (err.response.status === 500) {
                console.log("Something went wrong. Please try again");
            }
        });
    }

    static async postMessage(facultyName, courseID, email, text) {
        await axios.post(process.env.DATABASE_URL + '/api/messages', {
            params: {
                courseID: courseID,
                facultyName: facultyName,
                email: email,
                text: text
            }
        }).catch((err) => {
            if (err.response.status === 500) {
                this.handleFacultyNotExist(facultyName);
                this.handleCourseNotExist(facultyName, courseID);
                // resend message?
            }
        });
    }


    static async handleFacultyNotExist(facultyName) {
        await axios.post(process.env.DATABASE_URL + `/api/${facultyName.toUpperCase()}`).then(
            (response) => {
                if (response.status === 500) {
                    console.log("Something went wrong. Please try again");
                }
            }
        );
    }


    static async handleCourseNotExist(facultyName, courseID) {
        await axios.post(process.env.DATABASE_URL + `/api/${facultyName.toUpperCase()}/${courseID.toUpperCase()}`).then(
            (response) => {
                if (response.status === 500) {
                    console.log("Something went wrong. Please try again");
                }
            }
        );
    }
}
