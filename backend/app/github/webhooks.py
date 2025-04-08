from flask import Blueprint, request, jsonify
import hmac
import hashlib
from github import Github

github_blueprint = Blueprint('github', __name__)

@github_blueprint.route('/webhook', methods=['POST'])
def handle_webhook():
    # Verify signature
    signature = request.headers.get('X-Hub-Signature-256')
    if not signature:
        return jsonify({'error': 'Missing signature'}), 403
    
    secret = current_app.config['GITHUB_WEBHOOK_SECRET']
    payload = request.data
    
    expected_signature = 'sha256=' + hmac.new(
        secret.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    if not hmac.compare_digest(signature, expected_signature):
        return jsonify({'error': 'Invalid signature'}), 403
    
    event = request.headers.get('X-GitHub-Event')
    payload = request.get_json()
    
    # Handle different GitHub events
    if event == 'issues':
        handle_issue_event(payload)
    elif event == 'pull_request':
        handle_pull_request_event(payload)
    
    return jsonify({'status': 'success'})

def handle_issue_event(payload):
    action = payload.get('action')
    issue = payload.get('issue')
    # Implement your issue handling logic here
    print(f"Issue {action}: {issue['title']}")

def handle_pull_request_event(payload):
    action = payload.get('action')
    pr = payload.get('pull_request')
    # Implement your PR handling logic here
    print(f"PR {action}: {pr['title']}")