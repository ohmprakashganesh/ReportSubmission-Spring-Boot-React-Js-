package com.report.exceptional;

public class NotFoundObject extends  RuntimeException {
    public  NotFoundObject(String msg){
        super(msg);
    }
}
