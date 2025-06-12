package com.report.exceptional;

import com.report.entities.User;

public class UserNotFound  extends  RuntimeException{
    public UserNotFound(String msg){
        super(msg);
    }
    
}
