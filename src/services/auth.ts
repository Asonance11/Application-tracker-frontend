import { API_URL } from "@/lib/config";
import { User, UserInput } from "@/types/index";
import axios from "axios";
import { toast } from "sonner";

export async function login(values: UserInput): Promise<User | null> {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        username: values.username,
        password: values.password,
      },
      {
        withCredentials: true, // This is important for handling cookies
      },
    );

    if (response.data.user) {
      toast.success("Logged in successfully");
      return response.data.user;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);

    if (axios.isAxiosError(error) && error.response?.data?.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Something went wrong, please try again");
    }

    return null;
  }
}

export async function getUser(): Promise<User | null> {
  try {
    const response = await axios.get(`${API_URL}/api/user`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data.user;
    } else {
      throw new Error("Unexpected response from server");
    }
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);

    if (axios.isAxiosError(error) && error.response?.data?.error) {
      console.log(error.response.data.error);
    } else {
      console.log("Something went wrong, please try again");
    }

    return null;
  }
}
