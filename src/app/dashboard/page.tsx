"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function page() {
  const session = useSession();
  console.log(session);

  const router = useRouter();

  if (session.status == "unauthenticated") {
    return router.push("/signin");
  }

  return (
    <div>
      <p>Dashboard</p>
      <button onClick={() => signOut()}>Signout</button>
    </div>
  );
}

export default page;
