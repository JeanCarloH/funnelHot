export const mockLogin = (email: string, password: string) => {
    const MOCK_USER = {
      email: 'jeancarlocj14@gmail.com',
      password: '123456',
    };
  
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      return { success: true, user: { email: MOCK_USER.email } };
    }
  
    return { success: false };
  };
  