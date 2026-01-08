// src/crm/pages/LeadsPage.jsx
import useLeads from "../hooks/useLeads";
import LeadForm from "../components/LeadForm";
import LeadsTable from "../components/LeadsTable";

export default function LeadsPage() {
  const { leads, loading, createLead, convertLead } = useLeads();

  if (loading) return <p>Loading leads...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>CRM Leads</h2>

      <LeadForm onSubmit={createLead} />
      <LeadsTable leads={leads} onConvert={convertLead} />
    </div>
  );
}
