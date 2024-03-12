
import { loginAPI } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";

const LoginUser = async (username, password) => {
    const dispatch = useAppDispatch();
    try {
      console.log("inside LoginUser")
        const res = await dispatch(loginAPI(username, password));
        return res.json();
      } catch (error) {
        console.error('Error during loginAPI dispatch', error);
        throw error;
      }
}

export default LoginUser
