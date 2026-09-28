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
        runDemoBtn.addEventListener('click', function () {
            const selectedOption = modelSelect.options[modelSelect.selectedIndex].text;
            const selectedValue = modelSelect.value;

            resultModelName.textContent = selectedOption;

            if (selectedValue === 'loan') {
                resultBiasScore.textContent = 'Low (0.12)';
                resultFairness.textContent = 'Good';
                resultStatus.textContent = 'Model demonstrates minimal disparity across age and gender groups.';
            } else if (selectedValue === 'hiring') {
                resultBiasScore.textContent = 'Moderate (0.28)';
                resultFairness.textContent = 'Needs Review';
                resultStatus.textContent = 'Slight disparity detected in candidate screening across demographic features.';
            } else if (selectedValue === 'admission') {
                resultBiasScore.textContent = 'Low (0.08)';
                resultFairness.textContent = 'Excellent';
                resultStatus.textContent = 'High demographic parity score achieved across economic brackets.';
            }

            demoResult.style.display = 'block';
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
