package com.commentpayment.data.repo;

import com.commentpayment.data.model.Comment;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CommentsRepo extends CrudRepository<Comment, Integer> {

    // Method to find all comments for a given creator_id where comment_id is greater than a specified id
    List<Comment> findByCreatorIdAndStatusAndCommentIdGreaterThan(String creatorId, String status, Integer id);

    @Modifying
    @Transactional
    @Query("UPDATE Comment c SET c.status = 'PAYMENT_DONE', c.payment_id = :payment_id WHERE c.order_id = :order_id AND c.status = 'PAYMENT_PENDING'")
    int updatePaymentDone(@Param("order_id") String order_id, @Param("payment_id") String payment_id);


    @Modifying
    @Transactional
    @Query("UPDATE Comment c SET c.status = 'DELETED' WHERE c.commentId = :comment_id AND c.creatorId = :email")
    int updateStatusToDelete(@Param("comment_id") Integer comment_id, @Param("email") String email);
}
