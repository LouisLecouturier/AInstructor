# """chat bot sur la page de lecture du cours"""
# import openai
# openai.api_key = "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"


# models = openai.Model.list()
# #print(models.data[0].id)
# #print(models)

# MODEL = "gpt-3.5-turbo"
# course = "Pantheism is the philosophical religious belief that reality,[1] the universe and the cosmos are identical to divinity and a supreme being or entity. The physical universe is thus understood as an immanent creator deity, still expanding and creating, which has existed since the beginning of time.[2] The term 'pantheist' designates one who holds both that everything constitutes a unity and that this unity is divine, consisting of an all-encompassing, manifested god or goddess.[3][4] All astronomical objects are thence viewed as parts of a sole deity.The worship of all gods of every religion is another definition, but it is more precisely termed Omnism.[5] Pantheist belief does not recognize a distinct personal god,[6] anthropomorphic or otherwise, but instead characterizes a broad range of doctrines differing in forms of relationships between reality and divinity.[7] Pantheistic concepts date back thousands of years, and pantheistic elements have been identified in various religious traditions. The term pantheism was coined by mathematician Joseph Raphson in 1697."
# question = "who invented the pantheime"

# def chat_bot_on_course(course, question) :
#     return 

#     mode = {"swear" : "You are a swearring, vulgare and snarky assistant that swear at each phrase,helping a fucking student", 
#             "simplification": "You are a helpfull assistant that simplify for student",
#             "expert":"You are a helpfull assistantfor expert"}


#     response = openai.ChatCompletion.create(
#         model=MODEL,
#         messages=[
#                 {"role": "system", "content": mode["simplification"]},
#                 {"role": "user", "content": "here is the course we are studying :  %s , please answer the question :  %s" % (course, question)},
#         ],
#         temperature=0,
#         max_tokens = 256,
#     )
    
#     #print(response.choices)
#     message_content = response.choices[0].message['content']
#     print(message_content)
#     return (message_content)


