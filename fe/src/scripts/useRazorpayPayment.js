import axios from "axios";
import script_loader from "../utils/script_loader";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PaymentDetailsState } from "../state/PaymentDetailsState";
import { failMessageState, failModalOpen } from "../state/FailModal";
import { creatorInfoState, successModalOpen } from "../state/SuccessModal";
import { UserCommentState } from "../state/UserComment";
import {baseURL, razorpayKeyId} from '../utils/properties';

export function useRazorpayPayment(){

    const setPaymentDetailsState = useSetRecoilState(PaymentDetailsState);
    const setSuccessModal = useSetRecoilState(successModalOpen);
    const setFailModal = useSetRecoilState(failModalOpen);
    const setFailMessage = useSetRecoilState(failMessageState);
    const createInfo = useRecoilValue(creatorInfoState);
    const setComment = useSetRecoilState(UserCommentState);


    function handleRazorpayPayment(username, creatorEmail, comment, amount, currency){

        let data = JSON.stringify({
          amount,
          currency,
          creator_id: creatorEmail,
          username, 
          comment
        })
    
        let config = {
          method: "post",
          url: `${baseURL}api/addcomment`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        }
    
        axios.request(config)
        .then((response) => {
          handleRazorpayScreen(amount, response.data.order_id, response.data.converted_amount_for_razorpay, currency);
        }).catch(e => alert(e.response.data.error_message))
    }
    
    const handleRazorpayScreen = async(amount,orderId, convertedAmountForRazorpay, currency) => {
        const res = await script_loader("https://checkout.razorpay.com/v1/checkout.js")
    
        if (!res) {
          alert("Some error at razorpay screen loading")
          return;
        }
    
        const options = {
          key: razorpayKeyId,
          amount: convertedAmountForRazorpay,
          currency: currency,
          name: "Bharat QNA",
          order_id:orderId,
          handler: (response) => handleSuccessfulPayments(response),
          notes:{
            email : createInfo ? createInfo.email : 'NA',
            currency: currency,
            amount: amount
          },
          theme: {
            color: "#F4C430"
          }
        }
    
        const paymentObject = new window.Razorpay(options)
    
          // Handle payment failures
        paymentObject.on("payment.failed", function (response) {
          console.error("Payment failed:", response);
          alert(
            `Payment failed!\nReason: ${response.error.description}\nCode: ${response.error.code}`
          );
        });
    
        function handleSuccessfulPayments(response){
           const payment_details = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            payment_signature: response.razorpay_signature
          }

          /* const payment_details = {
            order_id: "order_PWo5TJIFm1lNct",
            payment_id: "pay_PWo5zkBgkvyKSH",
            payment_signature: "e7d712ef91dd4fa2001ed8fcc344cd8e2608242be35900c1c66b361994b5b8eaa"
            } */

          setPaymentDetailsState(payment_details);
    
            
          
          const request = {
            method: 'post',
            url: `${baseURL}api/paymentsuccess`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: payment_details
          };

            axios.request(request)
          .then(response => {setFailModal(false); setSuccessModal(true); setComment('');})
          .catch(e => {
            setSuccessModal(false)
            setFailModal(true);
            if(e.response.data.error_message){
                setFailMessage(e.response.data.error_message)
            }
          } )
        }
    
        paymentObject.open()
      }


      return {handleRazorpayPayment};
}