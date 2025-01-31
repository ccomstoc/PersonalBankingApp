package com.infosys.PersonalBankingApp.Controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptions {
    protected static final Logger log = LoggerFactory.getLogger(ControllerExceptions.class);
    @ExceptionHandler
    public ResponseEntity<String> handleAllExceptions(Exception e){
        log.warn(e.getMessage());
        return ResponseEntity.status(400).body(e.getMessage());
    }
}
