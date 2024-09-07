package com.chat_room.ChatRoomApp.models;

public class Message {

     private String name;
     private String content;
     private String EmailId;
     
  
     
     public Message(String name, String content, String emailId) {
		super();
		this.name = name;
		this.content = content;
		EmailId = emailId;
	}


	public String getName() {
		return name;
	}


	public String getContent() {
		return content;
	}


	public String getEmailId() {
		return EmailId;
	}


	public void setName(String name) {
		this.name = name;
	}


	public void setContent(String content) {
		this.content = content;
	}


	public void setEmailId(String emailId) {
		EmailId = emailId;
	}


     
       
}
