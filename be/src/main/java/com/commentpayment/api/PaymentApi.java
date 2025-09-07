package com.commentpayment.api;

import com.commentpayment.businesslogic.PaymentLogic;
import com.commentpayment.data.repo.CommentsRepo;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class PaymentApi {

    private PaymentLogic paymentLogic;
    private CommentsRepo commentsRepo;


    @PostMapping("/paymentsuccess")
    public ResponseEntity<Map<String,Object>> updateStatus(@RequestBody Map<String, Object> requestBody){
        String orderId = requestBody.get("order_id").toString();
        String paymentId = requestBody.get("payment_id").toString();
        String paymentSignature = requestBody.get("payment_signature").toString();

        if(!paymentLogic.verifyPayment(orderId,paymentId,paymentSignature))
            return ResponseEntity.badRequest().body(Map.of("error_message", "Payment Verification Failed"));

        int updateCount = commentsRepo.updatePaymentDone(orderId,paymentId);

        return (updateCount > 0) ? ResponseEntity.ok(Collections.singletonMap("status","success")) : ResponseEntity.status(400).body(Map.of("error_message","Comment couldn't be sent!"));
    }
}
