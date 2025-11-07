from flask import jsonify
from extensions import db
from models.friendship import Friendship
from models.user import User
from helpers.helperFunctions import handle_db_error
from services.notificationService import NotificationService


class FriendshipService:
    
    @staticmethod
    def send_friend_request(requester_id, addressee_id):
        """Send friend request and create notification."""
        try:
            if not addressee_id:
                return jsonify({"error": "addressee_id is required"}), 400
            
            existing = db.session.execute(
                db.select(Friendship).filter(
                    ((Friendship.requester_id == requester_id) & (Friendship.addressee_id == addressee_id)) |
                    ((Friendship.requester_id == addressee_id) & (Friendship.addressee_id == requester_id))
                )
            ).scalar()
            
            if existing:
                if existing.status == 'accepted':
                    return jsonify({"error": "Already friends"}), 400
                return jsonify({"error": "Friend request already sent"}), 400
            
            friendship = Friendship(
                requester_id=requester_id,
                addressee_id=addressee_id,
                status='pending'
            )
            db.session.add(friendship)
            
            NotificationService.notify_friend_request_sent(addressee_id, requester_id)
            
            db.session.commit()
            
            return jsonify({"message": "Friend request sent"}), 201
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error sending friend request", e)
    
    @staticmethod
    def accept_friend_request(user_id, requester_id):
        """Accept friend request."""
        try:
            if not requester_id:
                return jsonify({"error": "requester_id is required"}), 400
            
            friendship = db.session.execute(
                db.select(Friendship).filter(
                    (Friendship.requester_id == requester_id) &
                    (Friendship.addressee_id == user_id) &
                    (Friendship.status == 'pending')
                )
            ).scalar()
            
            if not friendship:
                return jsonify({"error": "Friend request not found"}), 404
            
            friendship.status = 'accepted'
            db.session.commit()
            
            NotificationService.notify_friend_request_accepted(requester_id, user_id)
            
            return jsonify({"message": "Friend request accepted"}), 200
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error accepting friend request", e)
    
    @staticmethod
    def get_friendship_status(user_id, other_user_id):
        """Get friendship status between two users."""
        try:
            friendship = db.session.execute(
                db.select(Friendship).filter(
                    ((Friendship.requester_id == user_id) & (Friendship.addressee_id == other_user_id)) |
                    ((Friendship.requester_id == other_user_id) & (Friendship.addressee_id == user_id))
                )
            ).scalar()
            
            if not friendship:
                return jsonify({"status": "none"}), 200
            
            if friendship.status == 'accepted':
                return jsonify({"status": "friends"}), 200
            elif friendship.requester_id == user_id:
                return jsonify({"status": "pending_sent"}), 200 
            else:
                return jsonify({"status": "pending_received"}), 200
        except Exception as e:
            return handle_db_error("Error getting friendship status", e)
    
    @staticmethod
    def get_friends_list(user_id):
        """Get list of user's friends."""
        try:
            friendships = db.session.execute(
                db.select(Friendship).filter(
                    ((Friendship.requester_id == user_id) | (Friendship.addressee_id == user_id)) &
                    (Friendship.status == 'accepted')
                )
            ).scalars().all()
            
            friends = []
            for friendship in friendships:
                friend_id = friendship.addressee_id if friendship.requester_id == user_id else friendship.requester_id
                friend = db.session.get(User, friend_id)
                if friend:
                    friends.append(friend.to_dict())
            
            return jsonify(friends), 200
        except Exception as e:
            return handle_db_error("Error fetching friends list", e)
    
    @staticmethod
    def get_friend_ids(user_id):
        """Get list of friend IDs for filtering posts."""
        friendships = db.session.execute(
            db.select(Friendship).filter(
                ((Friendship.requester_id == user_id) | (Friendship.addressee_id == user_id)) &
                (Friendship.status == 'accepted')
            )
        ).scalars().all()
        
        friend_ids = []
        for friendship in friendships:
            friend_id = friendship.addressee_id if friendship.requester_id == user_id else friendship.requester_id
            friend_ids.append(friend_id)
        
        return friend_ids
    
    @staticmethod
    def remove_friend(user_id, friend_id):
        """Remove a friend."""
        try:
            friendship = db.session.execute(
                db.select(Friendship).filter(
                    ((Friendship.requester_id == user_id) & (Friendship.addressee_id == friend_id)) |
                    ((Friendship.requester_id == friend_id) & (Friendship.addressee_id == user_id))
                )
            ).scalar()
            
            if not friendship:
                return jsonify({"error": "Not friends"}), 404
            
            if friendship.status != 'accepted':
                return jsonify({"error": "No active friendship to remove"}), 400
            
            db.session.delete(friendship)
            db.session.commit()
            
            return jsonify({"message": "Friend removed"}), 200
        except Exception as e:
            db.session.rollback()
            return handle_db_error("Error removing friend", e)
