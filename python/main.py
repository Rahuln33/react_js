import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import csv

app = Flask(__name__)
CORS(app)

# Define the folder path where your CSV files are located
FOLDER_PATH = r'C:\Users\RAHUL N\OneDrive\Desktop\FLASK'

@app.route('/', methods=['GET'])
def save_folder_path():
    try:
        # Process CSV files in the folder and return data
        csv_data = process_csv_files(FOLDER_PATH)
        return jsonify(csv_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def process_csv_files(folder_path):
    csv_data = []
    for filename in os.listdir(folder_path):
        if filename.endswith('.csv'):
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    csv_data.append(row)
    return csv_data

if __name__ == '__main__':
    app.run(debug=True)
