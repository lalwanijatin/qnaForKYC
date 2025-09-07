package com.commentpayment.util;

public class RazorpayDenominationConvertor {

    public static Integer convert(Integer amount, String currency){
        return amount * 100;
    }
}
