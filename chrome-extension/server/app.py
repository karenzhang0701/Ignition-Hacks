import sys
import streamlit as st
import newspaper
import nltk
nltk.download('punkt')
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

url = 'https://www.theglobeandmail.com/opinion/editorials/article-a-golden-lesson-aim-for-excellence/'

article = newspaper.Article(url)
article.download()

article.parse()
authors = article.authors
text = article.text

# print(authors)
# print (text)

# summarizer
parser = PlaintextParser.from_string(text, Tokenizer("english"))
summarizer = LsaSummarizer()
summary = summarizer(parser.document, 10)

for sentence in summary:
    print(sentence)