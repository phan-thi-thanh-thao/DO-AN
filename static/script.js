document.addEventListener("DOMContentLoaded", function () {
    const analyzeButton = document.getElementById("analyze-button");
    analyzeButton.addEventListener("click", function () {
        const emailContent = document.getElementById("email-content").value;
        fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ emailContent: emailContent })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").textContent = data.spamStatus;
        })
        .catch(error => console.error("Error:", error));
    });

    const emailForm = document.getElementById("email-form");
    emailForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(emailForm);
        fetch("/upload", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").textContent = data.spamStatus;
        })
        .catch(error => console.error("Error:", error));
    });
});
document.getElementById('analyze-button').addEventListener('click', function() {
    var emailContent = document.getElementById('email-content').value;
    var resultTextarea = document.getElementById('result');
    var resultIcon = document.getElementById('result-icon');
    var warningMessage = document.getElementById('warning-message');

    // Giả sử bạn có một hàm phân loại email là Spam hoặc Ham
    var result = classifyEmail(emailContent); // Hàm này cần được định nghĩa

    if (result === "Spam") {
        resultTextarea.value = "Spam";
        resultIcon.innerHTML = '<i class="fas fa-times-circle" style="color: red;"></i>';
        warningMessage.style.display = 'block';
    } else if (result === "Ham") {
        resultTextarea.value = "Ham";
        resultIcon.innerHTML = '<i class="fas fa-check-circle" style="color: green;"></i>';
        warningMessage.style.display = 'none';
    }
});

function classifyEmail(emailContent) {
    // Đây là nơi bạn thêm logic phân loại email
    // Ví dụ đơn giản:
    if (emailContent.includes("free") || emailContent.includes("win")) {
        return "Spam";
    } else {
        return "Ham";
    }
}
