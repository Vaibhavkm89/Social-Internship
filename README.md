# FairAI - Fairness Testing in AI Models

FairAI is a simple, responsive web application built to demonstrate basic fairness testing concepts in Artificial Intelligence models. This project was developed as a first-year B.Tech academic student project using fundamental web technologies.

## About the Project

Artificial Intelligence systems are increasingly used to make impactful decisions in fields such as hiring, loan processing, and academic admissions. However, AI models can inherit human biases present in historical training data. 

FairAI provides a simple user interface to help users understand how bias is detected in AI models, why demographic parity matters, and how fairness metrics are evaluated.

## Key Features

- Bias Detection Overview: Explains how disparity is measured across demographic groups.
- Interactive Model Demo: Select sample AI models (Loan Approval, Hiring Screener, College Admission) and run test simulations to view bias scores and fairness ratings.
- Responsive Design: Works across desktop, tablet, and mobile devices using clean CSS flexbox layouts.
- Zero External Dependencies: Built using native web standards without external libraries or heavy frameworks.

## Technology Stack

- HTML5: Semantic markup and structure
- CSS3: Flexbox layout, styling, and basic responsive design
- JavaScript (ES6): Interactive menu toggle, demo test simulation, and contact form handling

## Project Structure

```
Social Intership/
│
├── index.html      # Main HTML document containing all website sections
├── style.css       # Custom stylesheet for layout, colors, and responsiveness
├── script.js       # Client-side JavaScript for interactive elements
└── README.md       # Project documentation
```

## Website Sections

1. Header: Navigation links and project title logo.
2. Hero Section: Brief summary and call to action.
3. About Section: Detailed explanation of AI fairness and its importance.
4. Features Section: Overview of core capabilities in card layout.
5. How It Works: 3-step process (Upload Data, Run Test, View Results).
6. Demo Section: Dropdown model simulator displaying fairness test results.
7. Contact Section: Simple contact form for feedback.
8. Footer: Copyright information and academic project notice.

## How to Run Locally

1. Clone or download the repository to your local machine.
2. Open `index.html` directly in any web browser.

Alternatively, you can serve the files using Python built-in HTTP server:

```bash
python -m http.server 8000
```

Then navigate to `http://localhost:8000` in your web browser.

## Academic Note

This project is created for educational and demonstration purposes as a B.Tech 1st Year student submission.
