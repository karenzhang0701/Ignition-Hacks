import sys
import nltk
# nltk.download('punkt')
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

# text = "Before 7 p.m. MT on July 24, the south fire was burning in the town. The flames, officials have said, reached more than 100 metres high and forced many first responders to relocate to Hinton, Alta. The fire destroyed 358 of the 1,113 total structures in Jasper. Most of those homes and businesses were in the west end. All critical infrastructure was saved. Jasper residents return to wildfire-ravaged townsite as re-entry begins One person died because of the fire: Morgan Kitchen, a 24-year-old wildland firefighter from Calgary. His funeral is being held on Saturday. After several weeks from home, Jasper residents were allowed back into the community on Friday. Officials do not have hard numbers regarding how many returned, said Nadon, the incident commander for the Municipality of Jasper. ATCO crews, however, restored service in 330 to 350 homes on Friday, and between 500 and 700 people visited the Red Cross support centre, Nadon said. A good share of the residents in the unaffected area came back, she said. Others are waiting because of personal reasons, or [they are] further away or prefer to wait before coming back to Jasper. The municipality should have more accurate numbers in the coming days, Nadon said."

text = sys.stdin.read()

# summarizer
parser = PlaintextParser.from_string(text, Tokenizer("english"))
summarizer = LsaSummarizer()
summary = summarizer(parser.document, 5)

result = " ".join(str(sentence) for sentence in summary)
# for sentence in summary:
    # print(sentence)
    # result += summary
    # result += " "

print(result)