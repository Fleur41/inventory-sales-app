from flask import Blueprint, request, jsonify, current_app
import hmac
import hashlib

github_blueprint = Blueprint('github', __name__)

@github_blueprint.route('/webhook', methods=['POST'])
def handle_webhook():
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
    
    # Process events
    return jsonify({'status': 'success'})