const TOKEN_KEY = 'expenses.access_token';

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn(): boolean {
    return getToken() !== null;
}

export async function login(username: string, password: string): Promise<void> {
    // The token endpoint follows the OAuth2 spec, so it takes form data instead of json
    const response = await fetch('/api/users/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username, password }),
    });
    if (!response.ok) {
        let detail = 'Login failed';
        try {
            detail = (await response.json()).detail ?? detail;
        } catch {
            // keep the fallback message
        }
        throw new Error(detail);
    }
    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.access_token);
}
