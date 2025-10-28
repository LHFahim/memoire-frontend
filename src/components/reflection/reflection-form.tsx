"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createReflectionAction,
  uploadReflectionImageAction,
} from "@/actions/reflection-actions";
import { IDashboard } from "@/interfaces/dashboard.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface ReflectionFormProps {
  boards: IDashboard[];
}

// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
  board: z.string().min(1, {
    message: "Please select a board.",
  }),
  image: z
    .custom<File | undefined>()
    .refine(
      (file) => !file || ACCEPTED_TYPES.includes(file.type),
      "Only JPG/PNG/WebP files are allowed."
    )
    // .refine(
    //   (file) => !file || file.size <= MAX_FILE_SIZE,
    //   "Image must be 5MB or smaller."
    // )
    .optional(),
});

export function ReflectionForm({ boards }: ReflectionFormProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: `Where does it come from?`,
      content: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
      board: "",
      image: undefined,
    },
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let urlObj = { url: "", message: "" };

    try {
      const fd = new FormData();
      if (values.image) fd.append("image", values.image);

      // sending form data to upload image endpoint
      urlObj = await uploadReflectionImageAction(fd);

      const reflectionObj = await createReflectionAction({
        title: values.title,
        content: values.content,
        image_url: urlObj.url,
        board: values.board,
      });

      // toast.success("Reflection created!");
      // setTimeout(
      //   () =>
      //     router.push(
      //       `/dashboard/${reflectionObj.board}/reflections/${reflectionObj.id}`
      //     ),
      //   1500
      // );

      router.push(
        `/dashboard/${reflectionObj.board}/reflections/${reflectionObj.id}`
      );
    } catch (error) {
      console.error("Error creating reflection:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="w-full sm:w-[500px] md:w-[800px] h-[40px]"
                  placeholder="Enter title here"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* board drop down */}
        <FormField
          control={form.control}
          name="board"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    {boards.map((board) => (
                      <SelectItem key={board.id} value={board.id!}>
                        {board.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your reflection..."
                  className="w-full min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* image picker */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="grid w-full max-w-sm items-center gap-3">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    // IMPORTANT: don't pass `value` for file inputs
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file); // store File in RHF state
                      // preview
                      if (preview) URL.revokeObjectURL(preview);
                      setPreview(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="preview"
                      className="h-40 w-auto rounded-md border"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
