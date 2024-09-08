"use client";
import React, {useEffect, useRef, useState} from "react";
import EditorJS, {EditorConfig, OutputData} from "@editorjs/editorjs";
// @ts-ignore
import CheckList from "@editorjs/checklist";
// @ts-ignore
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
// @ts-ignore
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
// @ts-ignore
import SimpleImage from "@editorjs/simple-image";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
// @ts-ignore
import Raw from "@editorjs/raw";

const EDITOR_TOOLS = {
    code: Code,
    header: Header,
    paragraph: {
        class: Paragraph,
        // shortcut: 'CMD+P',
        inlineToolbar: true,
    },
    checklist: CheckList,
    inlineCode: InlineCode,
    table: Table,
    list: List,
    quote: Quote,
    delimiter: Delimiter,
    raw: Raw,
} ;

type EditorProps = {
    data: EditorConfig["data"];
    onChange: (data: OutputData) => void;
    holder: string;
};


function Editor({data, onChange, holder}: EditorProps) {
    const ref = useRef<EditorJS>();
    useEffect(() => {
        if (!ref.current) {
            ref.current = new EditorJS({
                holder: holder,
                placeholder: "Start writting here..",
                tools: EDITOR_TOOLS,
                data,
                async onChange(api, event) {
                    const content = await api.saver.save();
                    // console.log(content, "sdfb");
                    onChange(content);
                },
            });
        }

        //add a return function handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, [data, holder, onChange]);

    return (
        <>
            <div
                id={holder}
                style={{
                    width: "100%",
                    minHeight: 500,
                    borderRadius: " 7px",
                    background: "fff",
                }}
            />
        </>
    );
}

export default Editor;