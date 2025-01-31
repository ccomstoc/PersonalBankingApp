package com.infosys.PersonalBankingApp.Exceptions;

public class TransactionAlreadyPaid extends Exception{

    public TransactionAlreadyPaid(String message) {
        super(message);
    }
}
