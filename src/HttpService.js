import axios from "axios"

export default{
    async getMessages(){
        let url="http://localhost:3000"
        let res=await axios.get(url+)
    }
}

//app.post(USER_URL, (request, response) => {
//app.get(USER_URL, (request, response) => {
/*
export class HttpserviceService {

  constructor(private http:HttpClient){
  }
  url='http://localhost:3001/';

  getAllNotes(){
    return this.http.get(this.url);
  }
  addNote(note:any){
    return this.http.post(this.url,note);
  }
  editNote(note:any){
    return this.http.put(this.url+note.id,note)
  }
  deleteNote(note:any){
    return this.http.delete(this.url+note.id,note);
  }
}

*/