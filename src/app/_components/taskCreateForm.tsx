// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { zodTaskCreate, typeTaskCreate } from "~/zod";

// import { Button } from "../../components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../components/ui/form";
// import { Input } from "../../components/ui/input";
// import { useEffect } from "react";
// import { signIn, useSession } from "next-auth/react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Select } from "~/components/ui/select";
// import { Textarea } from "~/components/ui/textarea";

// function TaskForm() {

//     const session = useSession()
//   const router = useRouter()
  
//   const form = useForm<typeTaskCreate>({
//     resolver: zodResolver(zodTaskCreate),
//     defaultValues: {
//       title: "",
//       description: "",
//       deadline:new Date(),
//       priority:"",
//       status:"",
//       completed: false,
//       userId: session.data?.user.id
//     },
//   });

//   // 2. Define a submit handler.
//   async function onSubmit(values: typeTaskCreate) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     try {
//       const res = await signIn('credentials',{
//         email: values.email,
//         password: values.password,
//         // callbackUrl:"/dashboard"
//         redirect: false
//      });
//      console.log(res)
//      if(!res?.ok){
//       toast.error("Login Failed!", {
//         position: "top-center",
//       });
//      }else{
//       router.push("/dashboard")
//      }
      
//     } catch (error) {
//       console.log(error)
//     }
     
//   }

//   return (
//     <Form {...form}>
//       <div className="w-3/4 rounded-md border-2 border-gray-500 p-10 drop-shadow-sm">
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <h2 className="text-mycolor text-center text-4xl font-bold">
//             Create Task
//           </h2>
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   <h2 className="text-xl">Title</h2>
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     type="text"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   <h2>Description (Optional)</h2>
//                 </FormLabel>
//                 <FormControl>
//                 <Input
//                     type="text"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* Deadline Field (Optional) */}
//           <FormField
//             control={form.control}
//             name="deadline"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   <h2>Deadline (Optional)</h2>
//                 </FormLabel>
//                 <FormControl>
//                   <DatePicker {...field} />  {/* Assuming you have a DatePicker component */}
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* Priority Field (Dropdown or Select) */}
//           <FormField
//             control={form.control}
//             name="priority"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   <h2>Priority</h2>
//                 </FormLabel>
//                 <FormControl>
//                   <Select {...field} options={["HIGH", "MEDIUM", "LOW"]} />  {/* Assuming you have a Select component */}
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           {/* Status Field (Dropdown or Select) */}
//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   <h2>Status</h2>
//                 </FormLabel>
//                 <FormControl>
//                   <Select {...field} options={["TO DO", "IN PROGRESS", "DONE"]} />  {/* Assuming you have a Select component */}
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button variant={"default"} size={"lg"} type="submit">
//             Submit
//           </Button>
//         </form>
//         <h3 className="my-4 text-center text-lg">
//           New here?
//           <Link className="ml-2" href="http://localhost:3000/signup">
//             Sign up
//           </Link>
//         </h3>
//       </div>
//       <ToastContainer />
//     </Form>
//   );
// }

// export default TaskForm;