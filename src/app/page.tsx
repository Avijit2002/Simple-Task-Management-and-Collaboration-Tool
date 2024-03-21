import Link from "next/link";
import LampDemo from "./_components/lampHeading";

export default async function Home() {
  return (
    <main className="grid h-screen w-screen grid-cols-2">
      <div className="bg-purple-50 flex flex-col gap-5 justify-center text-center">
        <Link href={"/signup"} className="border-2 border-gray-400 w-96 px-2 py-6 my-8 mx-auto text-center hover:bg-purple-100">
          <p className="text-2xl font-medium">New here? Sign up</p>
        </Link>
        <Link href={"/signin"} className="border-2 border-gray-400 w-96 px-2 py-6 my-8 mx-auto text-center hover:bg-purple-100">
          <p className="text-2xl font-medium">Already Registered? Sign in</p>
        </Link>
      </div>
      <div className=" bg-purple-400">
        <LampDemo />
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.read();

//   return (
//     <div className="w-full max-w-xs">
//       <CreatePost />
//       <h2>Your posts:</h2>
//       {latestPost ? (
//         latestPost.map(x=>{
//           return(
//             <div>
//               <p key={x.id} className="truncate"> {x.name}</p>
//             </div>
//           )
//         })
//       ) : (
//         <p>You have no posts yet.</p>
//       )}
//     </div>
//   );
// }
