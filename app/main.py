from flask import Flask, request, jsonify, send_from_directory
from holistic_anagram import Anagram
from flask_cors import CORS, cross_origin
import holistic_anagram

anagram = Anagram()
print("ANAGRAM VERSION", holistic_anagram.__version__)
anagram.init_app(heroku=True)

app = Flask(__name__, static_folder="../client/build", static_url_path="")

cors = CORS(app, support_credentials=True)


@app.route("/")
@cross_origin()
def serve():
    
    return send_from_directory(app.static_folder, "index.html")



@app.route("/anagram_check", methods = ["POST"])
@cross_origin()
def anagram_check():
    
    body = request.get_json()

    data = anagram.enter_words_json(body["words"])

    return jsonify({"data": data})
    
    

if __name__ == "__main__":
    app.run(debug = False)








