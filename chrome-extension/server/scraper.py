import sys
import newspaper
import nltk
# nltk.download('punkt')

url = 'https://www.theglobeandmail.com/world/us-politics/article-will-fear-of-donald-trump-be-enough-to-send-kamala-harris-to-the-white/'

article = newspaper.Article(url)
article.download()

article.parse()
authors = article.authors
text = article.text

# print(authors)
print(text)