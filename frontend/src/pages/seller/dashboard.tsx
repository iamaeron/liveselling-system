import { sessionQueryOptions } from "@/lib/session";
import { useQuery } from "@tanstack/react-query";

const SellerDashboard = () => {
  const { data: user } = useQuery(sessionQueryOptions);
  return <div>Welcome, {user?.name}</div>;
};

export default SellerDashboard;
