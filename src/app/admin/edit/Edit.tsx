"use client";
import dynamic from "next/dynamic";

const Editor = dynamic(
    () =>
        import("../../../components/Editor/Editor"),
    {
        ssr: false,
    },
);
export default function Edit() {
    return (
        <Editor holder="editor" onChange={(data) => console.log(data)} data={undefined}/>
    )
}