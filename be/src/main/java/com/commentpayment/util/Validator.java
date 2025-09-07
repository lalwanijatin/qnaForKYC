package com.commentpayment.util;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.regex.Pattern;


public class Validator {

    // UPI ID pattern: e.g., "user@upi"
    private static final Pattern UPI_ID_PATTERN = Pattern.compile("^[a-zA-Z0-9.\\-_]{2,256}@[a-zA-Z]{2,64}$");

    // Allowed currency types
    //private static final Pattern CURRENCY_PATTERN = Pattern.compile("^(INR|USD|EUR|CAD|GBP)$");
    private static final Pattern CURRENCY_PATTERN = Pattern.compile("^(INR)$");

    public static void validateUsername(Object username) {
        if (!(username instanceof String) || !username.toString().matches("[\\p{L} ]{1,30}")) {
            throw new IllegalArgumentException("Please enter a valid name");
        }
    }

    public static void validateUpiId(Object upiId) {
        if (!(upiId instanceof String) || !UPI_ID_PATTERN.matcher((String) upiId).matches()) {
            throw new IllegalArgumentException("Invalid UPI ID format");
        }
    }

    public static void validateComment(Object comment) {
        if (!(comment instanceof String)) {
            throw new IllegalArgumentException("Invalid Comment format");
        }else if(comment.toString().length() > 400){
            throw new IllegalArgumentException("Character limit is 400");
        }
    }

    public static void validateAmount(Object amount, Object currency) {
        if (!(amount instanceof Number) || ((Number) amount).intValue() <= 0) {
            throw new IllegalArgumentException("Amount must be a positive integer");
        }else if(convertToINR(amount, currency) < 40){
            throw new IllegalArgumentException("Amount is less than INR 40");
        }
    }

    public static void validateCurrency(Object currency) {
        if (!(currency instanceof String) || !CURRENCY_PATTERN.matcher((String) currency).matches()) {
            //throw new IllegalArgumentException("Invalid currency type. Allowed values: INR, USD, EUR, GBP, CAD");
            throw new IllegalArgumentException("Invalid currency type. Allowed values: INR");
        }
    }

    private static final Map<String, Integer> exchangeRates = Map.of("INR",1,"USD",83,"EUR",90,"GBP",106,"CAD",61);

    private static int convertToINR(Object amount, Object currency){
        return ((int) amount) * exchangeRates.get(currency.toString());
    }
}
