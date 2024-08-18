import sys
import google.generativeai as genai
import os
import json
import warnings
warnings.filterwarnings("ignore", category=UserWarning, module='urllib3')
sys.stderr = open(os.devnull, 'w')

text = sys.stdin.read()

genai.configure(api_key=os.environ.get("API_KEY"))

model=genai.GenerativeModel(
  model_name="gemini-1.5-flash",
    system_instruction="For each of the texts you receive, your response will be a JSON object containing 4 topics. A topic object has the following schema:\n- name: The name of the topic. This should be no longer than 4 words. \n- score: A number between 1 and 100 with 100 being the most positive and 1 being the most negative. This score will represent the author's attitude towards that topic. \n- explanation: The explanation for the score. This explanation should be no longer than 1 sentence.\n\nThe first three topic objects will contain the topics of three attitudes that the author of the input text possesses that would most likely affect the impartiality of the text. The topic should be a concept or entity that the author may feel positively or negatively toward. An example of a topic would be the author's attitude towards the LGBTQ+ community.  \n\nThe last topic object will have a name of \"Impartiality Score\" and the score will represent the author's overall impartiality with 100 being the most impartial. ",
)

response = model.generate_content(text)

result = json.dumps(response.text)
print(result)