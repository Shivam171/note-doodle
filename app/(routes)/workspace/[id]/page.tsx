import WorkspaceHeader from "../_components/WorkspaceHeader"
import Editor from "../_components/Editor"
export default function Workspace() {
    return (
        <div className="flex flex-col h-screen w-full">
            <WorkspaceHeader />
            {/* Workspace Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Document */}
                <div className="">
                    <Editor />
                </div>
                {/* Whiteboard/Canvas */}
                <div className="">
                    Whiteboard
                </div>
            </div>
        </div>
    )
}
