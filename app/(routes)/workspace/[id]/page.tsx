"use client"
import WorkspaceHeader from "../_components/WorkspaceHeader"
import Editor from "../_components/Editor"
import { useEffect, useState } from "react"
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

export interface FILE {
    archive: boolean,
    createdBy: string,
    document: string,
    fileName: string,
    _id: string,
    teamId: string,
    updatedAt: string,
    whiteboard: string,
    _creationTime: number
}

export default function Workspace({ params }: any) {
    const [triggerSave, setTriggerSave] = useState(false);
    const [fileData, setFileData] = useState<FILE | any>();
    const convex = useConvex();

    useEffect(() => {
        params.id && getFileData()
    }, [])

    const getFileData = async () => {
        const result = await convex.query(api.files.getFileById, {
            _id: params.id
        })
        setFileData(result);
    }

    return (
        <div className="flex flex-col h-screen w-full">
            <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} fileId={params.id} />
            {/* Workspace Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-full p-6">
                {/* Document */}
                <div className="">
                    <Editor onSaveTrigger={triggerSave} fileId={params.id} fileData={fileData} />
                </div>
                {/* Whiteboard/Canvas */}
                <div className="">
                    Whiteboard
                </div>
            </div>
        </div>
    )
}
