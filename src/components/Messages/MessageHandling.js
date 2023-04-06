import axios from "axios";

export class MessageRestController {
    static DATABASE_URL = "http://34.95.17.81";
    static async getMessage(facultyName, courseID) {
        try {
            const response = await axios.get(this.DATABASE_URL +"/api/messages/",
        {
                    params:{
                        courseID: courseID,
                        facultyName: facultyName,
                    }
                },
            );
            console.log(response);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.log("Server error:", error.response.data);
            } else if (error.request) {
                console.log("Network error:", error.request);
            } else {
                console.log("Error:", error.message);
            }
            console.log("Please try again later.");
            throw error;
        }
    }

    static async postMessage(facultyName, courseID, email, text) {
        console.log({
            facultyName: facultyName,
            courseID: courseID,
            email: email,
            text: text
        });
        try {
            const response = await axios.post(this.DATABASE_URL +"/api/messages/",null,
                {
                    params:{
                        courseID: courseID,
                        facultyName: facultyName,
                        email: email,
                        text: text
                    }
                },
            );
            console.log(response);
            return response.data;
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                switch (status) {
                    case 500:
                        await this.handleFacultyNotExist(facultyName);
                        await this.handleCourseNotExist(facultyName, courseID);
                        // resend message?
                        break;
                    // handle other status codes if needed
                    default:
                        throw new Error(`Unexpected error: ${error.message}`);
                }
            } else if (error.request) {
                throw new Error(`No response received: ${error.message}`);
            } else {
                throw new Error(`Request failed: ${error.message}`);
            }
        }
    }


    static async handleFacultyNotExist(facultyName) {
        await axios.post(this.DATABASE_URL + `/api/${facultyName.toUpperCase()}`).then(
            (response) => {
                if (response.status === 500) {
                    console.log("Something went wrong. Please try again");
                }
            }
        );
    }


    static async handleCourseNotExist(facultyName, courseID) {
        await axios.post(this.DATABASE_URL + `/api/${facultyName.toUpperCase()}/${courseID.toUpperCase()}`).then(
            (response) => {
                if (response.status === 500) {
                    console.log("Something went wrong. Please try again");
                }
            }
        );
    }
}
