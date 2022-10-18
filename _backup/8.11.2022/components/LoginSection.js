import {
        useLogin,
        useLogout       
      } from "../context/store-context-selector";
      
      const LoginSection = () => {
        const login = useLogin();
        const logout = useLogout();
      
        return (
          <div>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
          </div>
        );
      };
      export default LoginSection