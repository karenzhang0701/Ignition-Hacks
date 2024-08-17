import sys
import newspaper
import nltk
# nltk.download('punkt')

url = sys.argv[1]

article = newspaper.Article(url)
article.download()

article.parse()
authors = article.authors
text = article.text

# print(authors)
print(text)