"use client"
import EditorJS, { ToolConstructable } from '@editorjs/editorjs';
import { useState, useEffect, useRef } from 'react';
import Header from '@editorjs/header';
import List from '@editorjs/list';
// @ts-ignore
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
import CodeTool from '@editorjs/code';

export default function Editor() {
    const ref = useRef<EditorJS>();
    useEffect(() => {
        initEditor();
    }, [])

    const rawDocument = {
        "time": 1628536000000,
        "blocks": [
            {
                data: {
                    text: 'Document Name',
                    level: 2
                },
                id: "123",
                type: "header",
            },
            {
                data: {
                    level: 4
                },
                id: "1234",
                type: "header",
            }
        ],
        "version": "2.18.0"
    }

    const [document, setDocument] = useState(rawDocument);

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            data: document,
            tools: {
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+P',
                    config: {
                        placeholder: 'Enter your paragraph',
                    }
                },
                header: {
                    class: Header as unknown as ToolConstructable,
                    shortcut: 'CMD+SHIFT+H',
                    config: {
                        placeholder: 'Enter a header',
                        levels: [2, 3, 4],
                        defaultLevel: 3
                    }
                },
                list: {
                    class: List as unknown as ToolConstructable,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+L',
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                checklist: {
                    class: Checklist,
                    shortcut: 'CMD+SHIFT+C',
                    inlineToolbar: true,
                },
                quote: {
                    class: Quote as unknown as ToolConstructable,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+Q',
                    config: {
                        quotePlaceholder: 'Enter a quote',
                        captionPlaceholder: 'Quote\'s author',
                    },
                },
                code: CodeTool,
            }
        });
        ref.current = editor;
    }

    return (
        <div>
            <div className="h-full" id="editorjs">

            </div>
        </div>
    )
}
