package com.commentpayment.data.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Comments")
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;

    @Column(name = "creator_id", nullable = false)
    private String creatorId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "comment", nullable = false, columnDefinition = "TEXT CHARACTER SET utf8mb4")
    private String comment;

    @Column(name = "create_timestamp", nullable = false, updatable = false)
    private LocalDateTime createTimestamp;

    @Column(name = "update_timestamp", nullable = false)
    private LocalDateTime updateTimestamp;

    @Column(name = "amount", precision = 10, scale = 2)
    private Integer amount;

    @Column(name = "currency", length = 10)
    private String currency;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    @Column(name = "order_id", length = 50)
    private String order_id;

    @Column(name = "payment_id", length = 50)
    private String payment_id;
}
