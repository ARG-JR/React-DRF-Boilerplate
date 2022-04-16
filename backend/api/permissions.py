from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsSelf(BasePermission):
    message = "Only admins can edit other users' profiles"

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return request.user.id == obj.id