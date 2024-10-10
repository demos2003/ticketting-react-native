
import config from "@/api/config"; // Assuming config file is in the parent directory

export const logout = async () => {
  try {
    const response = await fetch(`${config.baseURL}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are sent with the request
    });
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
