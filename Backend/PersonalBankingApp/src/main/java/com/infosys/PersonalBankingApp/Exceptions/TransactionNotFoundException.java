package com.infosys.PersonalBankingApp.Exceptions;

public class TransactionNotFoundException extends Exception{

    public TransactionNotFoundException(String message) {
        super(message);
    }
}
