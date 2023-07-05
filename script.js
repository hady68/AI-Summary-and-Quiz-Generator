 // Get the button and content elements
 let simpleBtn = document.getElementById("simple-btn");
 let simplecontent = document.getElementById("simplecontent");
 let expertBtn = document.getElementById("expert-btn");
 let uploadBtn = document.getElementById("upload-button")
 let expertcontent = document.getElementById("expertcontent");
 let tabArea = document.getElementById("tab-area")
 const typewriter = document.getElementById('typewriter');
 const gitSummary = document.getElementById("git-summary");
 
 const text = gitSummary.textContent;
 let inputText = String;
  
 function generateSummary() {
   tabArea.style.display ="block";
   var inputText = document.getElementById("input-text").value;
   var xhr = new XMLHttpRequest();
 
       // Set up the request
       xhr.open("POST", "/process-text", true);
       xhr.setRequestHeader("Content-Type", "application/json");
 
       // Define the request payload
       var payload = {
         text: inputText
       };
 
       // Convert the payload to JSON string
       var payloadJson = JSON.stringify(payload);
 
       // Set up the event handler for when the response is received
       xhr.onreadystatechange = function () {
   if (xhr.readyState === 4 && xhr.status === 200) {
     var response = JSON.parse(xhr.responseText);
     var summary = response.summary; // Get the 'summary' property from the response object
     var expertsummary = response.expertsummary; // Get the expert property from response
 
 
     var summaryTextArea = document.getElementById("simplecontent");
     var paragraph = document.getElementById("git-summary"); // Get the existing paragraph element
 
       // Display otherValue in 'expertcontent' div
   var expertTextArea = document.getElementById("expertcontent");
   var expertparagraph = document.getElementById("expertsummary"); // Get the existing paragraph element
   
 
   var indexSummary = 0; // Current index of the summary text
   var indexExpertSummary = 0; // Current index of the expertsummary text
   var delay = 20; // Delay between each character (adjust as needed)
 
   // Function to update the text content with a delayed effect
   function updateSummaryText() {
     // Get a portion of the summary text based on the current index
     var partialSummary = summary.substring(0, indexSummary);
 
     // Update the text content of the paragraph
     paragraph.textContent = partialSummary;
 
     // Increment the index
     indexSummary++;
 
     // Check if there are more characters to update
     if (indexSummary <= summary.length) {
       // Call the function recursively after the delay
       setTimeout(updateSummaryText, delay);
     }
   }
 
   // Function to update the expertsummary text content with a delayed effect
   function updateExpertSummaryText() {
     // Get a portion of the expertsummary text based on the current index
     var partialExpertSummary = expertsummary.substring(0, indexExpertSummary);
 
     // Update the text content of the expertparagraph
     expertparagraph.textContent = partialExpertSummary;
 
     // Increment the index
     indexExpertSummary++;
 
     // Check if there are more characters to update
     if (indexExpertSummary <= expertsummary.length) {
       // Call the function recursively after the delay
       setTimeout(updateExpertSummaryText, delay);
     }
   }
 
   // Start updating the summary text content with a delayed effect
   updateSummaryText();
 
   // Start updating the expertsummary text content with a delayed effect
   updateExpertSummaryText();
 }
 };
 
 
 
       // Send the request
       xhr.send(payloadJson);
   
 }
 
 
 window.addEventListener("load",()=>{
   
   function toggleSimpleContent() {
     if(simpleBtn.value == "OFF"){
       simplecontent.style.display = "block";
       simpleBtn.value = "ON";
     }
     else if  (simpleBtn.value == "ON")
     {
       simplecontent.style.display = "none";
       simpleBtn.value = "OFF";
     }
   }
   
   // Function to toggle the display of the expert content
   function toggleExpertContent() {
     if (expertBtn.value == "OFF") {
       expertcontent.style.display = "block";
       expertBtn.value = "ON";
     }
     else if (expertBtn.value == "ON") {
       expertcontent.style.display = "none";
       expertBtn.value = "OFF";
     }
   }
   
   simpleBtn.addEventListener("click", toggleSimpleContent);
   expertBtn.addEventListener("click", toggleExpertContent);
   uploadBtn.addEventListener("click",generateSummary);
   
   // let index = 0;
   // function type() {
   //   if (index < text.length) {
   //     typewriter.innerHTML = text.slice(0, index) + '<span class="blinking-cursor">|</span>';
   //     index++;
   //     setTimeout(type, Math.random() * 100 +20 );
   //   } else {
   //     typewriter.innerHTML = text.slice(0, index) + '<span class="blinking-cursor">|</span>';
   //   }
   // }
   // // start typing
   // type();
   
   
 })
 
 // export { inputText };
 