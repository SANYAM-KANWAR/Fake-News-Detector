import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import os
import matplotlib.pyplot as plt
import seaborn as sns

file_path = r"S:\\MCA PRACTICAL\\2nd sem practicle\\MACHINE LEARNING\\project 2\\myProject\\FakeNewsDetectionProject\\model_training\\News.csv"
data = pd.read_csv(r"S:\\MCA PRACTICAL\\2nd sem practicle\\MACHINE LEARNING\\project 2\\myProject\\FakeNewsDetectionProject\\model_training\\News.csv")

# Fill missing text and drop missing 'class'
data['text'] = data['text'].fillna('')
data = data.dropna(subset=['class'])
data['text'] = data['text'].str.lower()

X = data['text']
y = data['class']

# Split data 
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# TF-IDF Vectorizer for text data
tfidf = TfidfVectorizer(stop_words='english', max_df=0.7, ngram_range=(1, 2))  # Added ngrams
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)


model = MultinomialNB()
model.fit(X_train_tfidf, y_train)


y_pred = model.predict(X_test_tfidf)


print("Accuracy:", accuracy_score(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))


conf_matrix = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(6, 4))
sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues', xticklabels=['Fake', 'Real'], yticklabels=['Fake', 'Real'])
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()

# Save the model and vectorizer
model_path = r'../web_app/fake_news_model.pkl'
vectorizer_path = r'../web_app/tfidf_vectorizer.pkl'

os.makedirs(os.path.dirname(model_path), exist_ok=True)

try:
    joblib.dump(model, model_path)
    joblib.dump(tfidf, vectorizer_path)
    print("Model and vectorizer saved successfully!")
except Exception as e:
    print(f"Error saving model and vectorizer: {e}")


