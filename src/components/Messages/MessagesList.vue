<!--
    Shows all sent messages
    Username, date, message
    Edit/delete buttons for user's own messages
    Profs/TAs can delete any messages
-->
<template>
  <ul v-for="message in messages" :key="message.id" class="container flex flex-wrap bg-gray-100">
      <li :id="'mes'+message.id" class="text-black p-2">
        <p v-if="message.reply" v-text="isReply(message.reply)" class="bg-gray-400"></p>
        <p :id="'text'+message.id">{{message.text}}</p>
        <p>{{message.email}}</p>
        <button :id="'reply'+message.id">Reply</button>
        <button v-on:click="edit(message.id)" :id="'edit'+message.id" v-if="ownMessage">✎</button>
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
      {text:"Angular sucks.", id:5, email:"darrick@sfu.ca"},
      {text:"Lol no.", id:6, reply:3, email:"bobby@sfu.ca"}
    ]);
    let ownMessage=new Boolean(true);
    let isInstructor=new Boolean(true);
    return{messages, ownMessage, isInstructor};
  },
  methods:{
    reply(id){


    },

    isReply(replyId){
      let reply="REPLY ID NOT FOUND. 'TIS BAD.";
      for(let i=0;i<this.messages.length;i++)
      {
        if(this.messages[i].id==replyId)
        {
          reply=this.messages[i].text;
          console.log("fuck."+reply);
        }
      }
      console.log(this.messages[1].id);
      //shorten to first 20 characters
      console.log("thingy: "+"text"+replyId.toString());
      if(reply!=null){
        return(reply);
      }
      else{
        return("REPLY ID NOT FOUND. 'TIS BAD.");
        //return(reply.textContent);
      }
    },

    edit(id){
      if(document.getElementById("newTextarea")){
        document.getElementById("newTextarea").remove();//remove other reply/edit boxes
      };
      const edit=document.createElement("textarea");
      const message=document.getElementById("mes"+id);
      const oldText=document.getElementById("text"+id);
      edit.id="newTextarea";
      edit.textContent=oldText.textContent;
      edit.classList.add("bg-white");
      message.appendChild(edit);
    }
  }
};
</script>

<style scoped>
  .textarea{
    background-color:white;
  }

</style>
