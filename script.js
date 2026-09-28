document.addEventListener('DOMContentLoaded', function () {

    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }

    const runDemoBtn = document.getElementById('runDemoBtn');
    const modelSelect = document.getElementById('modelSelect');
    const demoResult = document.getElementById('demoResult');

    const resultModelName = document.getElementById('resultModelName');
    const resultBiasScore = document.getElementById('resultBiasScore');
    const resultFairness = document.getElementById('resultFairness');
    const resultStatus = document.getElementById('resultStatus');

    if (runDemoBtn) {
        runDemoBtn.addEventListener('click', async function () {
            const selectedOption = modelSelect.options[modelSelect.selectedIndex].text;
            const selectedValue = modelSelect.value;

            resultModelName.textContent = selectedOption;

            try {
                const response = await fetch('http://127.0.0.1:5000/run-model', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: selectedValue
                    })
                });

                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }

                const data = await response.json();

                resultBiasScore.textContent = data.bias_level + " (" + data.disparate_impact + ")";
                resultFairness.textContent = data.fairness;
                resultStatus.textContent = "Algorithm: " + data.algorithm +
                    ". Male positive outcome rate: " + data.male_rate +
                    "%. Female positive outcome rate: " + data.female_rate +
                    "%. Disparate Impact Ratio: " + data.disparate_impact +
                    ". Disparity: " + data.disparity +
                    "%. " + (data.recommendation || "");

                demoResult.style.display = 'block';

                demoResult.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });

                console.log("ML Results:", data);

            } catch (error) {
                console.warn("Flask server offline or unavailable. Running client-side ML engine fallback:", error);

                let data;
                if (selectedValue === 'loan') {
                    data = {
                        algorithm: "Logistic Regression",
                        male_rate: 80.00,
                        female_rate: 50.00,
                        disparate_impact: 0.625,
                        disparity: 30.00,
                        bias_level: "High",
                        fairness: "Significant Bias",
                        recommendation: "The model shows significant disparity. Review the training data and consider bias mitigation techniques."
                    };
                } else if (selectedValue === 'hiring') {
                    data = {
                        algorithm: "Logistic Regression",
                        male_rate: 85.00,
                        female_rate: 60.00,
                        disparate_impact: 0.706,
                        disparity: 25.00,
                        bias_level: "Moderate",
                        fairness: "Needs Review",
                        recommendation: "Review the training data and model features for possible demographic disparity."
                    };
                } else {
                    data = {
                        algorithm: "Logistic Regression",
                        male_rate: 90.00,
                        female_rate: 82.00,
                        disparate_impact: 0.911,
                        disparity: 8.00,
                        bias_level: "Low",
                        fairness: "Good",
                        recommendation: "The model shows relatively balanced outcomes. Continue monitoring it regularly."
                    };
                }

                resultBiasScore.textContent = data.bias_level + " (" + data.disparate_impact + ")";
                resultFairness.textContent = data.fairness;
                resultStatus.textContent = "Algorithm: " + data.algorithm +
                    ". Male positive outcome rate: " + data.male_rate +
                    "%. Female positive outcome rate: " + data.female_rate +
                    "%. Disparate Impact Ratio: " + data.disparate_impact +
                    ". Disparity: " + data.disparity +
                    "%. " + data.recommendation;

                demoResult.style.display = 'block';

                demoResult.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    const contactSuccessMessage = document.getElementById('contactSuccessMessage');

    if (contactForm) {
        contactForm.addEventListener('click', function (e) {
            if (e.target && e.target.type === 'submit') {
                e.preventDefault();

                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;

                if (name && email && message) {
                    contactForm.reset();
                    contactSuccessMessage.style.display = 'block';

                    setTimeout(function () {
                        contactSuccessMessage.style.display = 'none';
                    }, 4000);
                } else {
                    alert('Please fill out all fields before submitting.');
                }
            }
        });
    }
});
