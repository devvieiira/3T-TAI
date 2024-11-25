"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createLike } from "@/request/likes/create-like";
import { getPost } from "@/request/post/get";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search, ThumbsUp, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/img/logo.svg";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const { data: posts, refetch } = useQuery({
    queryKey: ["get-post"],
    queryFn: getPost,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["like"],
    mutationFn: (key: string) => createLike(key),
  });

  const filtered = posts?.filter((post) => {
    return post.title.toLowerCase().includes(search.toLowerCase());
  });

  const router = useRouter();

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <main className="min-h-screen bg-figma-background pb-10">
        <header className="bg-white">
          <div className="flex items-center justify-between space-x-2 px-4 py-6">
            <div className="w-5/6 2xl:w-4/5 flex items-center relative">
              <Input
                className="bg-figma-gray rounded-xl px-8"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-2 text-primary" size={18} />
            </div>
            <Link href="#">
              <Image className="w-16 h-16" src={logo} alt="logo" />
            </Link>
          </div>
        </header>
        <div className="flex flex-col items-center py-6 space-y-4">
          {(filtered || posts)?.map((item) => (
            <Card
              className="w-[380px] md:w-[500px] lg:w-[620px] xl:w-[780px] px-3 py-4 space-y-3"
              key={item.id}
            >
              <div className="space-y-3">
                <h1 className="font-semibold text-base break-words">{item.title}</h1>
                <span className="text-sm break-words">{item.content}</span>
                {item.imageUrl && item.imageUrl.length > 0 && (
                  <div
                    className="w-full h-[180px] md:h-[300px] lg:h-[360px] xl:h-[410px] bg-gray-400 rounded-sm relative cursor-pointer"
                    onClick={() => openModal(`${process.env.NEXT_PUBLIC_URL}/${item.imageUrl}`)}
                  >
                    <Image
                      className="rounded-sm object-cover"
                      src={`${process.env.NEXT_PUBLIC_URL}/${item.imageUrl}`}
                      alt="img"
                      fill
                    />
                  </div>
                )}
              </div>
              {/* LIKES */}
              <div className="flex items-center px-4 justify-end space-x-2 h-6">
                <span className="h-5 font-semibold">{item.likes}</span>
                <button
                  onClick={async () => {
                    await mutateAsync(item.id);
                    refetch();
                  }}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
        {/* BOTÃO DE CRIAÇÃO */}
        <div className="fixed bottom-20 right-5">
          <Button
            className="w-[50px] h-[50px] bg-gradient-to-r from-[#5418F2] via-[#9C40FD] to-[#C854FD] hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full"
            onClick={() => router.push("/post")}
          >
            <span className="text-xl text-center">+</span>
          </Button>
        </div>
      </main>
      {/* MODAL */}
      {isOpen && modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <button
              className="absolute top-3 right-3 text-white"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
            <Image
              src={modalImage}
              alt="Modal Image"
              width={800}
              height={600}
              className="rounded-md"
            />
          </div>
        </div>
      )}
    </>
  );
}
