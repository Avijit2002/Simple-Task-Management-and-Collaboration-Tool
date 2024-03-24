import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import TaskForm from "../_components/taskCreateForm";

import { typeTaskUpdate } from "~/zod";
import TaskUpdateForm from "../_components/taskUpdateForm";
import { ToastContainer, toast } from "react-toastify";

function Dashboard() {
  const session = useSession();
  console.log(session);

  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState<{
    open: boolean;
    task: typeTaskUpdate;
  }>();
  const [fetch, setFetch] = useState(true);

  const getTask = api.task.read.useMutation();
  const deleteTask = api.task.delete.useMutation();

  const router = useRouter();

  useEffect(() => {
    getTask.isError &&
      toast.error(getTask.error.message, {
        position: "top-center",
      });
    function getData() {
      if (session.data) {
        getTask.mutate({
          userId: session.data.user.id,
        });
        console.log(getTask.data?.result[0]);
      }
    }

    if (fetch) {
      getData();
      setFetch(false);
    }
  }, [fetch]);

  if (session.status == "unauthenticated") {
    return router.push("/signin");
  }

  return (
    <>
      {" "}
      <ToastContainer />
      {isCreate && <TaskForm isopen={setIsCreate} setFetch={setFetch} />}
      {isUpdate?.open && (
        <TaskUpdateForm
          Taskdata={isUpdate.task}
          setTaskData={setIsUpdate}
          setFetch={setFetch}
        />
      )}
      <div className="grid h-screen w-screen justify-items-center bg-gray-300">
        <div className="m-10 grid w-9/12 grid-rows-10 bg-gray-100 p-10">
          <div className="flex justify-between">
            <Button onClick={() => setIsCreate((isCreate) => !isCreate)}>
              Create Task
            </Button>
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
            <div className="my-8 grid grid-cols-3 gap-6 bg-purple-100">
              {getTask.data?.result?.map((task) => {
                const deadline = task.deadline?.toDateString();

                return (
                  <div
                    key={task.id}
                    className="m-5 rounded-md bg-green-200 p-4"
                  >
                    <h2 className="text-lg font-bold">Title: {task.title}</h2>
                    <div className="my-2">
                      <p>Description: {task.description}</p>
                      <p>Priority: {task.priority}</p>
                      <p>Status: {task.status}</p>
                      <p>Deadline: {deadline}</p>
                      <p>
                        <span className="underline">Teammate</span>:{" "}
                        {task.users.map((user) => {
                          return (
                            <h3 key={user.id} className="ml-2 mt-1">
                              {user.email}
                            </h3>
                          );
                        })}
                      </p>
                      <button
                        className="mr-2 mt-4 w-24 border-spacing-3 rounded-md border-2 border-gray-800 px-3 py-1 text-gray-800"
                        onClick={() => {
                          setIsUpdate({
                            open: true,
                            task: {
                              id: task.id,
                              title: task.title,
                              description: task.description,
                              deadline: task.deadline,
                              priority: task.priority!,
                              status: task.status,
                              completed: task.completed,
                              userId: session.data?.user.id,
                              teamUserId:
                                session.data?.user.id != task.users[0]?.id
                                  ? task.users[0]?.id
                                  : task.users[1]?.id,
                            },
                          });
                        }}
                      >
                        Update
                      </button>

                      <button
                        className="mt-4 w-24 border-spacing-3 rounded-md border-2 border-red-600 px-3 py-1 text-red-600"
                        onClick={() => {
                          deleteTask.mutate(task.id);
                          setFetch(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
