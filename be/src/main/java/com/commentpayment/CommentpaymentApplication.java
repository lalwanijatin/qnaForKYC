package com.commentpayment;

import com.commentpayment.businesslogic.PaymentLogic;
import com.commentpayment.data.model.Comment;
import com.commentpayment.data.repo.CommentsRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@SpringBootApplication
public class CommentpaymentApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommentpaymentApplication.class, args);
	}
}
