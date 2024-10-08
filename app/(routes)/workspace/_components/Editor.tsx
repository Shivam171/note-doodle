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
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../[id]/page';

export default function Editor({ onSaveTrigger, fileId, fileData }: { onSaveTrigger: any, fileId: any, fileData: FILE | any }) {
    const ref = useRef<EditorJS>();

    const updateDocument = useMutation(api.files.updateDocument);

    useEffect(() => {
        fileData && initEditor();
    }, [fileData])

    useEffect(() => {
        onSaveTrigger && onSaveDocument();
    }, [onSaveTrigger])

    const onSaveDocument = () => {
        if (ref.current) {
            ref.current.save().then((outputData) => {
                console.log('Article data: ', outputData);
                updateDocument({
                    _id: fileId,
                    document: JSON.stringify(outputData)
                });
            }).then(res => {
                toast('Document Updated!');
            }).catch((error) => {
                console.log('Saving failed: ', error);
                toast('Server error while saving document');
            });
        }
    }


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
            data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
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
        <>
            <div className="h-full" id="editorjs">
            </div>
        </>
    )
}
