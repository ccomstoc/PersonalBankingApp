package com.infosys.PersonalBankingApp.Exceptions;

public class InsufficientBalanceException extends  Exception{

    public InsufficientBalanceException(String message) {
        super(message);
    }
}
