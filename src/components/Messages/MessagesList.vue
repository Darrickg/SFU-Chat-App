<!--
    Shows all sent messages
    Username, date, message
    Edit/delete buttons for user's own messages
    Profs/TAs can delete any messages
-->
<template>
  <ul v-for="message in messages" :key="message.id" class="container flex flex-wrap bg-gray-100 text-left">
      <li :id="'mes'+message.id" class="text-black p-3">
        <div :id="'reply'+message.id" v-if="message.reply" class="bg-gray-400 text-white ml-2">
          <p v-text="isReply(message.reply)[0]">
          </p>
          <p v-text="isReply(message.reply)[1]"></p>
        </div>
        <p :id="'text'+message.id">{{message.text}}</p>
        <p :id="'author'+message.id">{{message.email}}</p>
        <button v-on:click='openTextarea(message.id,"reply")' :id="'reply'+message.id">Reply</button>
        <button v-on:click='openTextarea(message.id,"edit")' :id="'edit'+message.id" v-if="ownMessage">✎</button>
        <button :id="'del'+message.id" v-if="ownMessage || isInstructor">X</button>
      </li>
  </ul>
</template>

<script>
import {ref} from "vue";
export default {
  name: 'MessagesList',
  setup(){
    const messages=ref([//get messages from api
      {text:"Can I get an extension? Pls?", id:3, email:"aiya@sfu.ca"},
      {text:"How do you center a div?", id:4, email:"sarah@sfu.ca"},
      {text:"Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", id:5, email:"darrick@sfu.ca"},
      {text:"Lol no.", id:6, reply:3, email:"bobby@sfu.ca"},
      {text:"Mood.", id:7, reply:5, email:"aiya@sfu.ca"}
    ]);
    let ownMessage=new Boolean(true);
    let isInstructor=new Boolean(true);
    return{messages, ownMessage, isInstructor};
  },
  methods:{
    isReply(replyId){
      let reply="REPLY ID NOT FOUND. 'TIS BAD.";
      let replyAuthor="AUTHOR NOT FOUND EITHER";
      for(let i=0;i<this.messages.length;i++)
      {
        if(this.messages[i].id==replyId)
        {
          reply=this.messages[i].text;
          replyAuthor=this.messages[i].email;
        }
      }
      //shorten to first 30 characters
      if(reply.length>30){
        reply=reply.slice(0,30)+"...";
      }
      return([reply,replyAuthor]);
    },

    openTextarea(id,action){
      if(document.getElementById("newTextarea")){
        document.getElementById("newTextarea").remove();//remove other reply/edit boxes
      };
      if(document.getElementById("replyingTo")){
        document.getElementById("replyingTo").remove();
      };
      const textbox=document.createElement("textarea");
      textbox.id="newTextarea";
      textbox.classList.add("bg-white");
      const message=document.getElementById("mes"+id);
      if(action=="edit"){
        const oldText=document.getElementById("text"+id);
        textbox.textContent=oldText.textContent;
        //match textarea size to contents
      }
      else if(action=="reply"){
        const replyingTo=document.createElement("p");
        const author=document.getElementById("author"+id.toString());
        replyingTo.id="replyingTo";
        replyingTo.classList.add("bg-gray-500");
        replyingTo.textContent="Replying to "+author.textContent;
        message.appendChild(replyingTo);
      }
      message.appendChild(textbox);
    }
  }
};
</script>

<style scoped>
  .textarea{
    background-color:white;
  }

</style>
