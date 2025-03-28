export const verifyAdminTokenService = async (token: string) => {
    try {
      const response = await fetch(`${process.env.AUTH_SERVICE_URL}/api/auth/verify-admin-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        return { status: response.status, data: null };
      }
  
      const payload = await response.json();
      return payload;
    } catch (error) {
      console.error("Error verifying admin token:", error);
      return { status: 500, data: null };
    }
  };
  