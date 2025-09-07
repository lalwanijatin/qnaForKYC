package com.commentpayment.businesslogic;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.apache.commons.codec.digest.HmacUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentLogic {

    @Value("${razorpay.key.id}")
    private String apiKey;

    @Value("${razorpay.secret.id}")
    private String secretKey;


    public boolean verifyPayment(String orderId, String paymentId, String paymentSignature){
        String data = orderId + "|" + paymentId;
        String generatedSignature = HmacUtils.hmacSha256Hex(secretKey, data);
        return generatedSignature.equals(paymentSignature);
    }



    public Order getOrderDetails(int amount, String currency) throws RazorpayException {

        RazorpayClient client = new RazorpayClient(apiKey,secretKey);
        JSONObject options = new JSONObject();
        options.put("amount", amount); // Note: The amount should be in paise.
        options.put("currency", currency);
        Order order = client.orders.create(options);
        return order;

    }
}
