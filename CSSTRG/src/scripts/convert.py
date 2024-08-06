# Convert Scoreboard.csv to Scoreboard.json

import csv
import json

# Read CSV file
with open('Scoreboard.csv', 'r') as f:
	reader = csv.reader(f)

	json_data = {}
	for row in reader:
		if row[0] == "Timestamp": continue
		json_data[row[0]] = {
			"timestamp": row[0],
			"name": row[2],
			"question": row[4],
			"score": row[-1],
			"house": row[3]
		}

# Write JSON file
with open('../Submissions.json', 'w') as f:
	json.dump(json_data, f, indent=4)
