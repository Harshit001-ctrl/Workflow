from flask import Flask, request, jsonify
from flask_cors import CORS
from uuid import uuid4

app = Flask(__name__)
CORS(app)

# In-memory storage for tasks and workflows
tasks = []
workflows = []

@app.route('/api/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'POST':
        new_task = request.json
        new_task['id'] = str(uuid4())  # Generate a unique ID for the task
        tasks.append(new_task)
        return jsonify(new_task), 201
    else:
        return jsonify(tasks)

@app.route('/api/workflows', methods=['GET', 'POST'])
def handle_workflows():
    if request.method == 'POST':
        new_workflow = request.json
        workflows.append(new_workflow)
        return jsonify(new_workflow), 201
    else:
        return jsonify(workflows)

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    return jsonify({
        'total_tasks': len(tasks),
        'completed_tasks': sum(1 for task in tasks if task.get('status') == 'completed'),
        'active_workflows': len(workflows),
        'team_members': 12  # This would be dynamic in a real application
    })

if __name__ == '__main__':
    app.run(debug=True)