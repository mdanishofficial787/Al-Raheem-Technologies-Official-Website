<script>
  document.getElementById("quoteForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value
    };

    try {
      let response = await fetch("https://alraheem-backend.vercel.app/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      let result = await response.json();
      if (result.success) {
        alert("Quote request sent successfully!");
      } else {
        alert("Failed to send request. Try again.");
      }
    } catch (error) {
      alert("Error sending request.");
    }
  });
</script>
