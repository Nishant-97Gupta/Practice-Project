package com.chat_room.ChatRoomApp.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chat_room.ChatRoomApp.models.Message;

@RestController
public class MessageController {

	@MessageMapping("/message")
	@SendTo("/topic/return-to")
	public Message getcontent(Message message) {
	    try {
	        Thread.sleep(200);
	    } catch (InterruptedException e) {
	        e.printStackTrace();
	    }
	    return message;
	}



	
	
}
