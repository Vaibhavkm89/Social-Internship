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

- Python (Flask): Machine learning backend server (`app.py`), Scikit-Learn LogisticRegression pipeline, dataset preprocessing (`ColumnTransformer`, `OneHotEncoder`), and fairness metrics endpoint.
- HTML5: Semantic markup and structure.
- CSS3: Flexbox layout, styling, and responsive design.
- JavaScript (ES6): Fetch API connection to ML server, interactive menu toggle, and contact form handling.

## Project Structure

```
Social Intership/
│
├── app.py          # Python Flask server containing ML model & fairness evaluation API
├── index.html      # Main HTML document containing all website sections
├── style.css       # Custom stylesheet for layout, colors, and responsiveness
├── script.js       # Client-side JavaScript connecting web UI to Flask ML API
└── README.md       # Project documentation
```

## How to Run Locally

### 1. Start the Python Flask Machine Learning Server

Make sure you have Flask, Flask-CORS, Pandas, and Scikit-Learn installed:

```bash
pip install flask flask-cors pandas scikit-learn
```

Run `app.py`:

```bash
python app.py
```

The ML server will start running on `http://127.0.0.1:5000`.

### 2. Launch the Web Interface

Open `index.html` directly in any web browser, or serve it using Python:

```bash
python -m http.server 8000
```

Then navigate to `http://localhost:8000` in your web browser. Click **Run Bias Test** to send requests to the live ML model!

## Academic Note

This project is created for educational and demonstration purposes as a B.Tech 1st Year student submission.
