import tkinter as tk
from tkinter import scrolledtext
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

class FakeNewsDetectorGUI:
    def __init__(self, master):
        self.master = master
        master.title("Fake News Detector")

        # Load the trained model and TF-IDF vectorizer
        try:
            self.model = joblib.load('fake_news_model.pkl')
            self.tfidf = joblib.load('tfidf_vectorizer.pkl')
        except FileNotFoundError:
            print("Error: Model files not found. Make sure 'fake_news_model.pkl' and 'tfidf_vectorizer.pkl' are in the correct directory.")
            exit()

        # GUI components
        self.label = tk.Label(master, text="Enter News Article Text:")
        self.label.pack(pady=5)

        self.text_area = scrolledtext.ScrolledText(master, wrap=tk.WORD, width=60, height=10)
        self.text_area.pack(padx=10, pady=5)

        self.predict_button = tk.Button(master, text="Predict", command=self.predict)
        self.predict_button.pack(pady=10)

        self.result_label = tk.Label(master, text="")
        self.result_label.pack(pady=5)

    def predict(self):
        text = self.text_area.get("1.0", tk.END).strip()
        if not text:
            self.result_label.config(text="Please enter some text.")
            return

        # Transform the input text using the loaded TF-IDF vectorizer
        text_tfidf = self.tfidf.transform([text])

        # Predict using the loaded model
        prediction = self.model.predict(text_tfidf)[0]

        # Display the result
        if prediction == 1:
            result = "Real News"
        else:
            result = "Fake News"
        self.result_label.config(text="Prediction: " + result)


# Main function to run the GUI
if __name__ == '__main__':
    root = tk.Tk()
    gui = FakeNewsDetectorGUI(root)
    root.mainloop()
