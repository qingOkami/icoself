(function(window) {

 var document = window.document,
   thankYouPage = '/thank-you-receive-updates',
   initEmailCaptureForm = function(form) {
     var submitButton = form.querySelector('.step-2 input[type=submit]'),
       emailInput = form.querySelector('input[name=email-address]'),
       amountSelect = form.querySelector('select[name=amount]'),
       referrerSelect = form.querySelector('select[name=refer]'),
       otherInput = form.querySelector('input[name=otherSelect]'),
       emailIsValid = function() {
         return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value);
       },
       amountIsValid = function() {
         return amountSelect.value != '0';
       },
       blurEvent = new Event('blur');

     emailInput.addEventListener('keyup', function() {
       if (emailIsValid()) {
         emailInput.style.background = '';
       }
     });
     emailInput.addEventListener('blur', function() {
       if (!emailIsValid()) {
         emailInput.style.background = '#ffb4b4';
       }
     });

     amountSelect.addEventListener('change', function() {
       if (amountIsValid()) {
         amountSelect.style.background = '';
       }
     });
     amountSelect.addEventListener('blur', function() {
       if (!amountIsValid()) {
         amountSelect.style.background = '#ffb4b4';
       }
     });

     referrerSelect.addEventListener('change', function() {
       if (otherInput) {
         otherInput.disabled = (this.value != '4');
       }
     });
     if ("createEvent" in document) {
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          referrerSelect.dispatchEvent(evt);
    } else {
      referrerSelect.fireEvent("onchange");
    }

     submitButton.addEventListener('click', function(event) {
       event.preventDefault();
       var validationError = false;

       if (!amountIsValid()) {
         amountSelect.dispatchEvent(blurEvent);
         validationError = true;
       }

       if (!emailIsValid()) {
         emailInput.dispatchEvent(blurEvent);
         validationError = true;
       }

       if (validationError) {
         return false;
       }

       var emailAddress = emailInput.value,
         amount = amountSelect.value,
         amountString = amountSelect.querySelector('option[value="'+amount+'"]').text,
         referrer = referrerSelect.value,
         referrerString = referrer == '4' ? otherInput.value : referrerSelect.querySelector('option[value="'+referrer+'"]').text,
         xhr = new XMLHttpRequest();

       xhr.onreadystatechange = function() {
         if(xhr.readyState == XMLHttpRequest.DONE && (xhr.status >= 200 || xhr.status < 300)) {
           var response = xhr.responseText;
           window.location.href = thankYouPage;
           form.reset();
         }
       }

       if (referrer == "0") eventRef = "Not Selected";
       else if (referrer == "1") eventRef = "Online Forums";
       else if (referrer == "2") eventRef = "Social Media";
       else if (referrer == "3") eventRef = "Word of Mouth";
       else if (referrer == "4") eventRef = `Other: ${referrerString}`;

       var queryParams = {
         email_address: emailAddress,
         amount: amount,
         amount_string: amountString,
         referrer: referrer,
         referred_by: eventRef,
       };
       var optionalParams = [
         'utm_source',
         'utm_medium',
         'utm_campaign',
         'ref'
       ];
       for (var i = 0; i < optionalParams.length; i++) {
         var input = form.querySelector('input[name='+optionalParams[i]+']');
         if (input) {
           queryParams[optionalParams[i]] = input.value;
         }
       }


       xhr.open(form.method, form.action, true);
       xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       xhr.send(makeQueryString(queryParams));

   /*Add by JL 2017-10-25 */
   if (amount == "0") eventAmt = "0";
   else if (amount == "1") eventAmt = "100";
   else if (amount == "2") eventAmt = "1000";
   else if (amount == "3") eventAmt = "10000";
   else if (amount == "4") eventAmt = "50000";
   else if (amount == "5") eventAmt = "100000";

   ga('send', 'event', 'signup', 'form-submit', 'wax-token', eventAmt);
   _paq.push(['trackEvent', 'signup', emailAddress, eventRef, eventAmt, {dimension1: 'emailAddress'}]);
   _paq.push(['trackGoal', 1, eventAmt, {dimension1: 'emailAddress'}]);

     });
   },
   makeQueryString = function(data) {
     var doubles = [];
     for (key in data) {
       doubles.push(key+'='+encodeURIComponent(data[key]));
     }
     return doubles.join('&');
   };

 window.addEventListener('DOMContentLoaded', function() {
   var forms = document.querySelectorAll('.email-capture-form');
   for (i = 0; i < forms.length; i++) {
     initEmailCaptureForm(forms[i]);
   }
 });

}(window));
