import { DashboardLayout } from "@/components/dashboard-layout";
import { DashboardOverview } from "@/components/dashboard-overview";


export default function HomePage() {
  console.log(111111);
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}
