package com.commentpayment.api;

import com.commentpayment.businesslogic.CommentsLogic;
import com.commentpayment.data.model.Comment;
import com.commentpayment.data.repo.CommentsRepo;
import com.commentpayment.util.RazorpayDenominationConvertor;
import com.commentpayment.util.Validator;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class CommentsApi {

    private CommentsRepo commentsRepo;
    private CommentsLogic commentsLogicBusinessLogic;

    @GetMapping("/comments/{maxCommentIdOnFrontend}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable("maxCommentIdOnFrontend") Integer maxCommentIdOnFrontend, Authentication authentication){
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttributes().get("email").toString();

        return ResponseEntity.ok(commentsRepo.findByCreatorIdAndStatusAndCommentIdGreaterThan(email,"PAYMENT_DONE",maxCommentIdOnFrontend));
    }

    @PostMapping("/addcomment")
    public ResponseEntity<Map<String,Object>> addComment(@RequestBody Map<String, Object> requestBody) throws RazorpayException {
        String creatorId = requestBody.get("creator_id").toString();
        String userId = requestBody.get("username").toString();
        String comment = requestBody.get("comment").toString();
        Integer amount = Integer.parseInt(requestBody.get("amount").toString());
        String currency = requestBody.get("currency").toString();

        Validator.validateUsername(userId);
        Validator.validateCurrency(currency);
        Validator.validateAmount(amount,currency);
        Validator.validateComment(comment);

        Map<String, Object> orderIdAndConvertedAmount = commentsLogicBusinessLogic.addComment(creatorId, userId, comment, amount, currency);

        return ResponseEntity.ok(orderIdAndConvertedAmount);
    }


    @DeleteMapping("/deletecomment/{comment_id}")
    public ResponseEntity<Map<String,Object>> deleteComment(@PathVariable("comment_id") Integer commentId, Authentication authentication){
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttributes().get("email").toString();

        commentsRepo.updateStatusToDelete(commentId, email);

        return ResponseEntity.ok(Collections.singletonMap("status","success"));
    }
}
