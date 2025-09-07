package com.commentpayment.data.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "Creators")
@Data
public class Creator {

    @Id
    @Column(name = "email_id", nullable = false, length = 255)
    private String emailId;

    @Column(name = "full_name", length = 255)
    private String fullName;

    @Column(name = "upi_id", length = 255)
    private String upiId;

    @Column(name = "username", unique = true, length = 255)
    private String username;

    @Column(name = "img_url", unique = true, length = 255)
    private String imageURL;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "status", length = 255)
    private String status;
}

