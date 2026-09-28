from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)
CORS(app)

data = {
    "age": [
        22, 25, 28, 31, 35,
        40, 45, 50, 55, 60,
        24, 27, 30, 33, 37,
        42, 47, 52, 57, 62
    ],
    "gender": [
        "Male", "Male", "Male", "Male", "Male",
        "Male", "Male", "Male", "Male", "Male",
        "Female", "Female", "Female", "Female", "Female",
        "Female", "Female", "Female", "Female", "Female"
    ],
    "income": [
        30000, 35000, 40000, 45000, 50000,
        55000, 60000, 65000, 70000, 75000,
        30000, 35000, 40000, 45000, 50000,
        55000, 60000, 65000, 70000, 75000
    ],
    "approved": [
        0, 0, 1, 1, 1,
        1, 1, 1, 1, 1,
        0, 0, 0, 1, 0,
        1, 0, 1, 1, 1
    ]
}

df = pd.DataFrame(data)

X = df[["age", "gender", "income"]]
y = df["approved"]

preprocessor = ColumnTransformer(
    transformers=[
        ("gender", OneHotEncoder(handle_unknown="ignore"), ["gender"])
    ],
    remainder="passthrough"
)

model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("classifier", LogisticRegression(max_iter=1000))
    ]
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=df["gender"]
)

model.fit(X_train, y_train)

def calculate_fairness(predictions, test_data):
    results = test_data.copy()
    results["prediction"] = predictions

    male_predictions = results[results["gender"] == "Male"]["prediction"]
    female_predictions = results[results["gender"] == "Female"]["prediction"]

    male_rate = male_predictions.mean() if len(male_predictions) > 0 else 0
    female_rate = female_predictions.mean() if len(female_predictions) > 0 else 0

    if male_rate > 0:
        disparate_impact = female_rate / male_rate
    else:
        disparate_impact = 1.0

    disparity = abs(male_rate - female_rate)

    if disparate_impact >= 0.80 and disparity <= 0.15:
        bias_level = "Low"
        fairness = "Good"
        recommendation = "The model shows relatively balanced outcomes. Continue monitoring it regularly."
    elif disparate_impact >= 0.65:
        bias_level = "Moderate"
        fairness = "Needs Review"
        recommendation = "Review the training data and model features for possible demographic disparity."
    else:
        bias_level = "High"
        fairness = "Significant Bias"
        recommendation = "The model shows significant disparity. Review the training data and consider bias mitigation techniques."

    return {
        "male_rate": round(float(male_rate) * 100, 2),
        "female_rate": round(float(female_rate) * 100, 2),
        "disparate_impact": round(float(disparate_impact), 3),
        "disparity": round(float(disparity) * 100, 2),
        "bias_level": bias_level,
        "fairness": fairness,
        "recommendation": recommendation
    }

@app.route("/run-model", methods=["POST"])
def run_model():
    request_data = request.get_json() or {}
    selected_model = request_data.get("model", "loan")

    predictions = model.predict(X_test)
    fairness_results = calculate_fairness(predictions, X_test)
    fairness_results["model"] = selected_model
    fairness_results["algorithm"] = "Logistic Regression"

    return jsonify(fairness_results)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
