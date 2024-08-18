import sys
from newspaper import Article
import nltk
# nltk.download('punkt')

url = sys.argv[1]

article = Article(url)
article.download()

article.parse()
authors = article.authors
text = article.text

# print(authors)
print(text)