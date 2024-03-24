"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {typeTaskUpdate, zodTaskUpdate } from "~/zod";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

function TaskUpdateForm({
  Taskdata,
  setTaskData,
  setFetch,
}: {
  Taskdata: typeTaskUpdate;
  setTaskData : Dispatch<SetStateAction<{
    open: boolean;
    task: typeTaskUpdate;
} | undefined>>;
  setFetch: Dispatch<SetStateAction<boolean>>;
}) {

  const [teamuserid, setTeamuserid] = useState(Taskdata.teamUserId);

  const { mutate, data, error, isError, isSuccess, isPending } =
    api.task.update.useMutation();

    const searchedUser = api.user.searchuser.useMutation()

  const form = useForm<typeTaskUpdate>({
    resolver: zodResolver(zodTaskUpdate),
    defaultValues: Taskdata,
  });

  useEffect(() => {
    function triggerNotification() {
      if (isSuccess) {
        setFetch(true);
        toast.success(data?.message, {
          position: "top-center",
        });
        setTimeout(() => {
          setTaskData({
            open: false,
            task:{
                id:""
            }
          });
        }, 2000);
      }

      isError &&
        toast.error(error.message, {
          position: "top-center",
        });
    }
    triggerNotification();
  }, [isSuccess, isError]);
  // 2. Define a submit handler.
  async function onSubmit(values: typeTaskUpdate) {
    values.teamUserId=teamuserid
    console.log(values);
    mutate(values);
  }
  
  function handleChange(e: any) {
    setTeamuserid(e.target.value);
    searchedUser.mutate(teamuserid!)
  }

  return (
    <div className="absolute left-1/2 top-1/2 w-6/12 -translate-x-2/4 -translate-y-2/4 rounded-md border-2 border-gray-500 bg-blue-200 p-10 drop-shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h2 className="text-mycolor text-center text-4xl font-bold">
            Create Task
          </h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h2 className="text-xl">Title</h2>
                </FormLabel>
                <FormControl>
                  <input type="text" {...form.register("title")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h2>Description (Optional)</h2>
                </FormLabel>
                <FormControl>
                  <textarea {...form.register("description")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Deadline Field (Optional) */}
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h2>Deadline (Optional)</h2>
                </FormLabel>
                <FormControl>
                  <input type="date" {...form.register("deadline")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Priority Field (Dropdown or Select) */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h2>Priority</h2>
                </FormLabel>
                <FormControl>
                  <select id="" {...form.register("priority")}>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Status Field (Dropdown or Select) */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h2>Status</h2>
                </FormLabel>
                <FormControl>
                  <select id="" {...form.register("status")}>
                    <option value="TO DO">TO DO</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teamUserId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h2>Add Teammate (optional)</h2>
                </FormLabel>
                <FormControl>
                  <input
                    type="text"
                    onChange={handleChange}
                    value={teamuserid}
                  />
                </FormControl>
                <div>
                  <ul>
                    {searchedUser.data?.result &&
                      searchedUser.data?.result.map((x) => {
                        return <li key={x.id} onClick={()=>setTeamuserid(x.id)}>{x.email}</li>;
                      })}
                  </ul>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"default"} size={"lg"} type="submit">
            Submit
          </Button>
          <button
            className="ml-8 w-24 border-spacing-3 rounded-md border-2 border-gray-800 px-3 py-1"
            onClick={() =>  setTaskData({
                open: false,
                task:{
                    id:""
                }
              })}
          >
            Cancel
          </button>
        </form>

        <ToastContainer />
      </Form>
    </div>
  );
}



export default TaskUpdateForm;
