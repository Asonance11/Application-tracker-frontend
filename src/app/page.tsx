import { getUser } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
