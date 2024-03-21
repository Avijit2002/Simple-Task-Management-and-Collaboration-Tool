"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Dialog } from "~/components/ui/dialog";
import { api } from "~/trpc/react";

function page() {
  const session = useSession();
  console.log(session);

  const [isCreate, setIsCreate] = useState(false)

  const { mutate, data, error, isError, isSuccess, isPending } =
    api.task.create.useMutation();

    const getTask = api.task.read.useMutation()

  const router = useRouter();

  if (session.status == "unauthenticated") {
    return router.push("/signin");
  }

  async function handleSubmit(){
    // await mutate({
    //   title: "xyz",
    //   userId: session.data?.user.id as string,
    //   status: "DONE",
    //   completed: true,
    //   priority: "HIGH"
    // })

    const res = getTask.mutate({
      userId: session.data?.user.id as string,
    })
  }

  return (
    // <div>
    //   <p>Dashboard</p>
    //   <button onClick={() => signOut({
    //     callbackUrl:"/"
    //   })}>Signout</button>
    // </div>
    <>
      <Dialog defaultOpen={false} open={isCreate}/>
      <div className="grid h-screen w-screen justify-items-center bg-gray-300">
        <div className="m-10 grid w-9/12 grid-rows-10 bg-gray-100 p-10">
          <div className="flex justify-between">
            <button onClick={handleSubmit}>Create Task</button>
            <Button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              Logout
            </Button>
          </div>
          <div className="row-span-9">
            <h2 className="text-2xl font-bold underline">Tasks</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
