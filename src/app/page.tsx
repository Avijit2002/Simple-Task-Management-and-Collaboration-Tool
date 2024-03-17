import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const latestPost = await api.post.read();

  return (
    <div className="w-full max-w-xs">
      <CreatePost />
      <h2>Your posts:</h2>
      {latestPost ? (
        latestPost.map(x=>{
          return(
            <div>
              <p key={x.id} className="truncate"> {x.name}</p>
            </div>
          )
        })
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
}
