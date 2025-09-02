from flask import Blueprint, jsonify
from src.models.user import db, User

demo_bp = Blueprint('demo', __name__)

@demo_bp.route('/demo/setup', methods=['POST'])
def setup_demo_data():
    """Setup demo users for testing"""
    try:
        # Check if demo users already exist
        existing_users = User.query.filter(User.username.in_(['john_doe', 'jane_smith', 'mike_wilson'])).all()
        if existing_users:
            return jsonify({'message': 'Demo users already exist', 'users': [user.to_dict() for user in existing_users]})
        
        # Create demo users
        demo_users = [
            User(username='john_doe', email='john.doe@example.com'),
            User(username='jane_smith', email='jane.smith@example.com'),
            User(username='mike_wilson', email='mike.wilson@example.com'),
            User(username='sarah_johnson', email='sarah.johnson@example.com'),
            User(username='alex_brown', email='alex.brown@example.com')
        ]
        
        for user in demo_users:
            db.session.add(user)
        
        db.session.commit()
        
        return jsonify({
            'message': 'Demo users created successfully',
            'users': [user.to_dict() for user in demo_users]
        })
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

