import React from 'react'
import { Excalidraw, WelcomeScreen, MainMenu } from "@excalidraw/excalidraw";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function Canvas({ onSaveTrigger, fileId, fileData }: any) {
    const [whiteBoardData, setWhiteBoardData] = useState<any>();
    const updateWhiteboard = useMutation(api.files.updateWhiteboard);

    useEffect(() => {
        onSaveTrigger && saveWhiteboard();
    }, [onSaveTrigger])

    const saveWhiteboard = async () => {
        updateWhiteboard({
            _id: fileId,
            whiteboard: JSON.stringify(whiteBoardData),
        }).then((res) => {
            // console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='w-full h-full'>
            <div className='h-full'>
                {fileData &&
                    <Excalidraw
                        theme='light'
                        initialData={{
                            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard)
                        }}
                        onChange={(excalidrawElements, appState, files) => {
                            setWhiteBoardData(excalidrawElements);
                        }}
                        UIOptions={{
                            canvasActions: {
                                saveToActiveFile: false,
                                loadScene: false,
                                export: false,
                                toggleTheme: false
                            }
                        }}
                    >
                        <MainMenu>
                            <MainMenu.DefaultItems.ClearCanvas />
                            <MainMenu.DefaultItems.SaveAsImage />
                            <MainMenu.DefaultItems.ChangeCanvasBackground />
                        </MainMenu>
                        <WelcomeScreen>
                            <WelcomeScreen.Hints.ToolbarHint>
                                <p> ToolBar Area </p>
                            </WelcomeScreen.Hints.ToolbarHint>
                            <WelcomeScreen.Hints.MenuHint />
                            <WelcomeScreen.Hints.HelpHint />
                            <WelcomeScreen.Center>
                                <WelcomeScreen.Center.Logo>
                                    <Image src="/logo.png" loading='lazy' alt="logo" width={300} height={300} />
                                </WelcomeScreen.Center.Logo>
                                <WelcomeScreen.Center.Heading>
                                    Start bringing your ideas to life
                                </WelcomeScreen.Center.Heading>
                            </WelcomeScreen.Center>
                        </WelcomeScreen>
                    </Excalidraw>
                }
            </div>
        </div>
    )
}
