"use client"
import WorkspaceHeader from "../_components/WorkspaceHeader"
import Editor from "../_components/Editor"
import { useState } from "react"

export default function Workspace({ params }: any) {
    const [triggerSave, setTriggerSave] = useState(false);

    return (
        <div className="flex flex-col h-screen w-full">
            <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />
            {/* Workspace Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Document */}
                <div className="">
                    <Editor onSaveTrigger={triggerSave} fileId={params.id} />
                </div>
                {/* Whiteboard/Canvas */}
                <div className="">
                    Whiteboard
                </div>
            </div>
        </div>
    )
}
