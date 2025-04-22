from flask import Flask, render_template, request
import joblib
import os

app = Flask(__name__)

# Paths to model and vectorizer
model_path = r"S:/MCA PRACTICAL/2nd sem practicle/MACHINE LEARNING/project 2/myProject/FakeNewsDetectionProject/web_app/fake_news_model.pkl"
vectorizer_path = r"S:/MCA PRACTICAL/2nd sem practicle/MACHINE LEARNING/project 2/myProject/FakeNewsDetectionProject/web_app/tfidf_vectorizer.pkl"

# Load model and vectorizer
model = None
vectorizer = None

if os.path.exists(model_path) and os.path.exists(vectorizer_path):
    try:
        model = joblib.load(model_path)
        vectorizer = joblib.load(vectorizer_path)
        print(" Model and vectorizer loaded successfully!")
    except Exception as e:
        print(f"Error loading model/vectorizer: {e}")
else:
    print(" Model or vectorizer file not found. Please check the paths.")

@app.route("/", methods=["GET", "POST"])
def index():
    prediction = ""
    warning = ""
    confidence = 0

    if request.method == "POST":
        news_text = request.form.get("news", "").strip()

        if not news_text:
            warning = " Please enter some news text to check!"
        elif model and vectorizer:
            try:
                transformed_text = vectorizer.transform([news_text])
                
                # Get the probability of each class
                prob = model.predict_proba(transformed_text)[0]
                
                # Get the predicted class and the corresponding confidence
                result = model.predict(transformed_text)[0]
                confidence = max(prob) * 100  # Convert to percentage

                prediction = "Real News" if result == 1 else "Fake News"
            except Exception as e:
                warning = f" Prediction failed: {e}"
        else:
            warning = " Model or vectorizer not loaded properly."

    return render_template("index.html", prediction=prediction, warning=warning, confidence=confidence)

if __name__ == "__main__":
    app.run(debug=True)
