
        text = self.text_area.get("1.0", tk.END).strip()
        if not text:
            self.result_label.config(text="Please enter some text.")
            return

        # Transform the input text using the loaded TF-IDF vectorizer
        text_tfidf = self.tfidf.transform([text])

        # Predict using the loaded model
        prediction = self.model.predict(text_tfidf)[0]
