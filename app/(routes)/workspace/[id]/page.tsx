"use client"
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import Canvas from "../_components/Canvas";

export interface FILE {
    archive: boolean;
    createdBy: string;
    document: string;
    fileName: string;
    _id: string;
    teamId: string;
    updatedAt: string;
    whiteboard: string;
    _creationTime: number;
}

export default function Workspace({ params }: any) {
    const [triggerSave, setTriggerSave] = useState(false);
    const [fileData, setFileData] = useState<FILE | any>();
    const [leftWidth, setLeftWidth] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const convex = useConvex();

    useEffect(() => {
        params.id && getFileData();
    }, []);

    const getFileData = async () => {
        const result = await convex.query(api.files.getFileById, {
            _id: params.id,
        });
        setFileData(result);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const newWidth = (e.clientX / window.innerWidth) * 100;
        setLeftWidth(newWidth > 10 && newWidth < 90 ? newWidth : leftWidth);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="flex flex-col h-screen w-full">
            <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} fileId={params.id} />
            {/* Workspace Layout */}
            <div className="flex h-full px-6">
                {/* Document */}
                <div className="relative" style={{ width: `${leftWidth}%` }}>
                    <Editor onSaveTrigger={triggerSave} fileId={params.id} fileData={fileData} />
                </div>

                {/* Draggable Divider */}
                <div
                    className="w-1 bg-gray-100 cursor-col-resize"
                    onMouseDown={handleMouseDown}
                ></div>

                {/* Whiteboard/Canvas */}
                <div className="border-l" style={{ width: `${100 - leftWidth}%` }}>
                    <Canvas onSaveTrigger={triggerSave} fileId={params.id} fileData={fileData} />
                </div>
            </div>
        </div>
    );
}
