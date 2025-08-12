import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import Main from "./main";
export default function Home() {
  return (
    <ProtectedRoute>
      <Main />
    </ProtectedRoute>
  );
}
