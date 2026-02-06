import { createContext, useEffect, useReducer, ReactNode } from 'react';
import { setSession } from 'src/guards/jwt/Jwt';
import useSWRMutation from 'swr/mutation';

// Types
interface JwtUser {
  id: string;
  email: string;
  displayName: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: JwtUser | null;
  platform: 'JWT';
}

interface AuthContextType extends AuthState {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, userName: string) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  platform: 'JWT',
};

const reducer = (state: AuthState, action: any): AuthState => {
  switch (action.type) {
    case 'AUTH_STATE_CHANGED':
      return { ...state, ...action.payload, isInitialized: true };
    default:
      return state;
  }
};

// Context
export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  signin: async () => {},
  signup: async () => {},
  logout: () => {},
});

// JWT helper
const authFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
};

const postfetcher = (
  url: string,
  { arg }: { arg: { email: string; password: string; firstName?: string; lastName?: string } },
) =>
  authFetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { trigger } = useSWRMutation('/api/account/login', postfetcher);

  useEffect(() => {
    const jwtUser = localStorage.getItem('jwtUser');

    const user = jwtUser ? JSON.parse(jwtUser) : null;

    if (user) {
      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } else {
      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const data = await trigger({ email, password });

      const statusCode = data[0];
      const payload = data[1];

      if (statusCode === 200 && payload?.user) {
        const { accessToken, user } = payload;

        // Optionally override displayName if you want demo fixed name

        setSession(accessToken); // Save access token
        localStorage.setItem('jwtUser', JSON.stringify(user)); // Save user info

        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        // Handle errors, e.g. show message from payload.message
        console.error('Login failed:', payload.message);
        throw new Error(payload.message);
      }
    } catch (err) {
      console.error('JWT Signin failed:', err);
      throw err;
    }
  };

  const signup = async (email: string, password: string, userName: string) => {
    try {
      const res = await authFetch('/api/account/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          username: userName,
        }),
      });

      const [status, data] = res;

      if (status !== 200 || !data || !data.accessToken || !data.user) {
        throw new Error('Signup failed');
      }

      const { accessToken, user } = data;

      setSession(accessToken);
      localStorage.setItem('jwtUser', JSON.stringify(user));

      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: true,
          user,
        },
      });
    } catch (error: unknown) {
      console.error('JWT Signup failed:', error);
      throw new Error((error as Error).message || 'Signup failed');
    }
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem('jwtUser');
    dispatch({
      type: 'AUTH_STATE_CHANGED',
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signin,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
