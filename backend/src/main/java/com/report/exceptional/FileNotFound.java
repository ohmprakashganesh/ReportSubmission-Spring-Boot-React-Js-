package com.report.exceptional;

import java.io.File;

public class FileNotFound extends  RuntimeException{
    public FileNotFound(String msg){
        super(msg);
    }
    
}
