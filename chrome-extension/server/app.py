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
num_sentences = st.slider("Number of sentences in the summary", 1, 20)
parser = PlaintextParser.from_string(text, Tokenizer("english"))
summarizer = LsaSummarizer()
summary = summarizer(parser.document, num_sentences)

st.title("Article Summary")
st.subheader("Authors: " + ", ".join(authors))

st.subheader("Summary:")

for sentence in summary:
    st.write(sentence)