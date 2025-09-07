package com.commentpayment.data.repo;

import com.commentpayment.data.model.Creator;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface CreatorRepo extends CrudRepository<Creator, String> {

    @Query("SELECT c.emailId AS email, c.fullName AS full_name, c.imageURL AS profile_picture FROM Creator c WHERE c.username = :creator_username AND c.status = 'ACTIVE'")
    public Map<String, Object> findDetailsByUserName(@Param("creator_username") String creator_username);

    @Query("SELECT c.username FROM Creator c WHERE c.status = 'ACTIVE'")
    public List<String> findActiveUsernames();

    public Creator findByEmailId(String emailId);

    @Modifying
    @Transactional
    @Query("UPDATE Creator c SET c.status = 'ACTIVE', c.upiId = :upi_id, c.username = :username WHERE c.emailId = :email_id")
    int addUPIAndUsername(@Param("upi_id") String upiId, @Param("username") String username, @Param("email_id") String email_id);
}
