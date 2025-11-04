from .helperFunctions import generate_file_url


class AuthorInfoMixin:
    def _get_author_name(self):
        return f"{self.author.first_name} {self.author.last_name}"
    
    def _get_author_avatar_url(self):
        return generate_file_url(self.author.avatar_filename)


class LikeableMixin:
    def _get_like_count(self):
        return self.likes.count()
    
    def _is_liked_by_user(self, user_id, likes_table):
        if not user_id:
            return False
        return self.likes.filter(likes_table.c.user_id == user_id).count() > 0
