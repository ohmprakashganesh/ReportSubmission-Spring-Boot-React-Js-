package com.report.exceptional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.File;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFound ex){
        return new ResponseEntity<>(ex.getMessage()+ ex.getCause(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    public ResponseEntity<String> handleFileNotFound(FileNotFound ex){
        return  new ResponseEntity<>(ex.getMessage()+ex.getCause(),HttpStatus.NOT_FOUND);
    }
}
