package com.commentpayment.businesslogic;

import com.commentpayment.data.model.Comment;
import com.commentpayment.data.repo.CommentsRepo;
import com.commentpayment.util.RazorpayDenominationConvertor;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@AllArgsConstructor
public class CommentsLogic {

    private CommentsRepo commentsRepo;
    private PaymentLogic paymentLogic;

    public Map<String,Object> addComment(String creatorId, String userId, String comment, Integer amount, String currency) throws RazorpayException {

        Integer convertedDenominationAmount = RazorpayDenominationConvertor.convert(amount, currency);
        Order order = paymentLogic.getOrderDetails(convertedDenominationAmount, currency);

        Comment commentInstance = new Comment();
        commentInstance.setCreatorId(creatorId);
        commentInstance.setUserId(userId);
        commentInstance.setComment(comment);
        commentInstance.setAmount(amount);
        commentInstance.setCurrency(currency);
        commentInstance.setStatus("PAYMENT_PENDING");
        commentInstance.setOrder_id(order.get("id"));
        commentInstance.setCreateTimestamp(LocalDateTime.now());
        commentInstance.setUpdateTimestamp(LocalDateTime.now());

        commentsRepo.save(commentInstance);

        return Map.of("order_id",order.get("id"), "converted_amount_for_razorpay", convertedDenominationAmount);
    }
}
