import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function RoleGuard({ children, requiredRoles = [], redirectTo = '/login' }) {
    // Vérification du token
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to={redirectTo} />;
    }

    try {
        const decoded = jwtDecode(token);
        const hasRequiredRole = requiredRoles.some(role =>
            decoded.role && decoded.role.includes(role)
        );

        if (!hasRequiredRole) {
            return <Navigate to={redirectTo} />;
        }

        return children;
    } catch (error) {
        console.error('Erreur de vérification du token:', error);
        return <Navigate to={redirectTo} />;
    }
}

export default RoleGuard;