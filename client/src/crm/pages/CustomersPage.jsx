//src/crm/pages/CustomersPage.jsx
import useCustomers from "../hooks/useCustomers";
import CustomerTable from "../components/CustomerTable";

export default function CustomersPage() {
  const { customers, loading } = useCustomers();

  if (loading) return <p>Loading customers...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Customers</h2>
      <CustomerTable customers={customers} />
    </div>
  );
}
