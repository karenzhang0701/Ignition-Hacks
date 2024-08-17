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
article.nlp()

authors = article.authors
text = article.text

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

#bias score


# Function to determine the slider color based on the bias score
def get_slider_color(bias_score):
    if bias_score <= 3:
        return "#FF0000"  # Red for low bias
    elif bias_score <= 6:
        return "#FFFF00"  # Yellow for medium bias
    else:
        return "#00FF00"  # Green for high bias

# Create a custom slider using HTML and JavaScript
st.markdown("""
    <style>
    .slider {
        -webkit-appearance: none;
        width: 100%;
        height: 15px;
        border-radius: 5px;
        background: #ddd;
        outline: none;
        opacity: 0.7;
        transition: opacity .2s;
    }
    
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
    }
    
    .slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
    }
    </style>
    <input type="range" min="1" max="10" value="5" class="slider" id="biasSlider">
    <p>Bias Score: <span id="biasValue">5</span></p>
    <script>
    const slider = document.getElementById("biasSlider");
    const output = document.getElementById("biasValue");
    slider.oninput = function() {
        output.innerHTML = this.value;
        const color = this.value <= 3 ? "#FF0000" :
                      this.value <= 6 ? "#FFFF00" : "#00FF00";
        this.style.background = color;
    }
    </script>
    """, unsafe_allow_html=True)