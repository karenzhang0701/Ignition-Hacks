from textblob import TextBlob
import sys

text = sys.stdin.read()

blob = TextBlob(text)
sentiment = blob.sentiment

print(f"Sentiment Analysis: {sentiment}")