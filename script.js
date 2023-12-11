
    function sendAlert(service) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          const alertMessage = `Emergency: ${service} arriving at (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`;
          alert(alertMessage);
        }, error => {
          console.error(`Error getting location: ${error.message}`);
        });
      } else {
        alert('Geolocation is not supported by your browser');
      }
    }

    function promptForPhoneNumber() {
      const phoneNumber = document.getElementById('phoneNumberInput').value;
      if (phoneNumber) {
        sendSMS(phoneNumber);
      } else {
        alert('Please enter a valid phone number.');
      }
    }

    function sendSMS(phoneNumber) {
      const alertMessage = 'Emergency:  SQUAD arriving stay where you are!';
      const accountSid = 'AC160e539f03da48934d12f32195618337';
      const authToken = '4941e42d4218022df1dd049cac84be77';
      const twilioPhoneNumber = '+12059948158';

      
      fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
        },
        body: new URLSearchParams({
          To: phoneNumber,
          From: twilioPhoneNumber,
          Body: alertMessage
        })
      })
      .then(response => {
        if (response.ok) {
          alert(`SMS sent to ${phoneNumber}`);
        } else {
          alert('Failed to send SMS. Please check your phone number and try again.');
        }
      })
      .catch(error => {
        console.error('Error sending SMS:', error);
        alert('An error occurred while sending the SMS. Please try again later.');
      });
    }
 