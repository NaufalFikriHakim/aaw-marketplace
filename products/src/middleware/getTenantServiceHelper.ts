export const getTenantService = async (tenantId: string, token: string) => {
    try {
      const response = await fetch(`${process.env.TENANT_SERVICE_URL}/api/tenant/${tenantId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        return { status: response.status, data: null };
      }
  
      const payload = await response.json();
      return { status: response.status, data: payload };
    } catch (error) {
      console.error("Error fetching tenant:", error);
      return { status: 500, data: null };
    }
  };
  