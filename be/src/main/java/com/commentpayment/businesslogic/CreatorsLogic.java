package com.commentpayment.businesslogic;

import com.commentpayment.data.model.Creator;
import com.commentpayment.data.repo.CreatorRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class CreatorsLogic {

    private CreatorRepo creatorRepo;

    public Map<String,Object> getCreatorDetails(String email, String fullName, String profilePictureURI){

        Map<String,Object> response = new HashMap<>();
        response.put("email",email);
        response.put("full_name",fullName);
        response.put("profile_picture",profilePictureURI);

        //CreatorDetailsProjection creatorDetails = creatorRepo.getCreatorDetails(email);
        Creator creatorDetails = creatorRepo.findByEmailId(email);

        if(creatorDetails == null){ // There's no data with this email id in the table. This means user has logged in for the first time.
            // Insert the Creator data
            Creator creator = new Creator();
            creator.setEmailId(email);
            creator.setFullName(fullName);
            creator.setImageURL(profilePictureURI);
            creator.setCreatedAt(LocalDateTime.now());
            creator.setUpdatedAt(LocalDateTime.now());
            creator.setStatus("INACTIVE");

            creatorRepo.save(creator);

            // Response will have null for upi_id and username
            response.put("upi_id",null);
            response.put("username",null);

        }else if(creatorDetails.getUpiId() == null){ // This means that the user hasn't provided the UPI id yet

            response.put("upi_id",null);
            response.put("username",null);

        }else{

            response.put("upi_id",creatorDetails.getUpiId());
            response.put("username",creatorDetails.getUsername());

        }

        return response;
    }

    public int addUPIAndUsername(String email, String upiId){
        // Generate UserName
        String username = generateUsername(email);
        int updateCount = creatorRepo.addUPIAndUsername(upiId,username,email);
        return updateCount;
    }

    private String generateUsername(String email) {
        // Extract the part before '@'
        String localPart = email.split("@")[0];

        // Remove all special characters except letters, digits, underscores, and hyphens to make it URL friendly
        String sanitizedUsername = localPart.replaceAll("[^a-zA-Z0-9_-]", "");

        return sanitizedUsername;
    }
}
