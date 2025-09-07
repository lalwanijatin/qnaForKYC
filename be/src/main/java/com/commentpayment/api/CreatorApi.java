package com.commentpayment.api;

import com.commentpayment.businesslogic.CreatorsLogic;
import com.commentpayment.data.repo.CreatorRepo;
import com.commentpayment.util.Validator;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class CreatorApi {

    private CreatorRepo creatorRepo;
    private CreatorsLogic creatorsLogic;

    @GetMapping("/creator/usernames")
    public ResponseEntity<List<String>> getCreatorUsernames(){
        return ResponseEntity.ok(creatorRepo.findActiveUsernames());
    }

    // This will be used by the Dashboard to get the data of the creator and show the details on the dashboard
    @GetMapping("/creator")
    public ResponseEntity<Map<String,Object>> getCreatorDashboardInfo(Authentication authentication){
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String email = oauth2User.getAttributes().get("email").toString();
        String fullName = oauth2User.getAttributes().get("name").toString();
        String profilePictureURI = oauth2User.getAttributes().get("picture").toString();

        return ResponseEntity.ok(creatorsLogic.getCreatorDetails(email, fullName, profilePictureURI));
    }

    @PutMapping("/creator/addupi")
    public ResponseEntity<Map<String,Object>> addUPI(@RequestBody Map<String, Object> requestBody, Authentication authentication){
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        String upiId = requestBody.get("upi_id").toString();
        Validator.validateUpiId(upiId);
        String email = oauth2User.getAttributes().get("email").toString();

        int updateCount = creatorsLogic.addUPIAndUsername(email,upiId);

        return (updateCount > 0) ? ResponseEntity.ok(Collections.singletonMap("status","success")) : ResponseEntity.status(400).build();
    }

    // This is used by the page that's used by the viewers to pay and send the comments.
    // This validates if the link used by the viewer does actually belong to an active creator or not
    @GetMapping("/creatorisvalid/{creator_username}")
    public ResponseEntity<Map<String,Object>> creatorIsValid(@PathVariable("creator_username") String creator_username){
        Map<String,Object> creatorDetails = creatorRepo.findDetailsByUserName(creator_username);

        return creatorDetails == null || creatorDetails.isEmpty()? ResponseEntity.notFound().build() : ResponseEntity.ok(creatorDetails) ;
    }
}
