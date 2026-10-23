import { EmailWorkspace } from "./components/EmailWorkspace";
import { Sidebar } from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex justify-center bg-[#f6f8fc]">
      <Sidebar />
      <EmailWorkspace />
    </div>
  );
}