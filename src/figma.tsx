import axios from "axios";
import React, { useState } from "react";

import { ChatOverlay } from "./components/ChatOverlay";

type Props = {
    children?: React.ReactNode;
};

const createTask = async (props: { [key: string]: string; type: string; frameUrl: string }) => {
    try {
        console.log("Creating Flex task");
        await axios({
            method: "post",
            url: process.env.REACT_APP_TASK_API,
            responseType: "json",
            data: props
        }).then(({ data }) => {
            console.log("Created task", data);
        });
    } catch (err) {
        console.error("Could not create task", err);
    }
};

const Figma: React.FC<Props> = ({ children }) => {
    const [chatActive, setChatActive] = useState(true);

    React.useEffect(() => {
        console.log(`Chat Active Now ${chatActive}`);
    }, [chatActive]);

    React.useEffect(() => {
        window.addEventListener("keyup", (event) => {
            // Listen for key events
            console.log(event);
            if (event.code === "BracketRight") {
                console.log(`Chat active was: ${chatActive} now ${!chatActive}`);
                setChatActive(!chatActive);
            }
            if (event.code === "BracketLeft") {
                console.log(`Chat Active forcing false`);
                setChatActive(false);
            }

            if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
                console.log(`Chat Active forcing false`);
                setChatActive(false);
            }
        });

        // Add iframe message listener
        const iframe = document.getElementById("figdemo") as HTMLIFrameElement;
        const childWindow = iframe.contentWindow;

        window.addEventListener("message", (message) => {
            if (message.source !== childWindow) {
                return; // Skip message in this event listener
            }

            // console.log("Post message", message.data);
            if (message.data.type === "PRESENTED_NODE_CHANGED") {
                console.log("Target Node ID", message.data.data.presentedNodeId);

                // Fragile as all else, hard coded IDs
                if (message.data.data.presentedNodeId === "26:363") {
                    setChatActive(true);
                }

                // First Flex screen
                if (message.data.data.presentedNodeId === "26:286") {
                    // Create task here
                    createTask({
                        name: "Mortgage Application",
                        type: "application",
                        frameUrl: "https://online.macquarie.com.au/originations/homeloan"
                    });
                }
            }
        });
    }, []);

    return (
        <>
            <div style={{ display: chatActive ? "block" : "none" }}>
                <ChatOverlay>{children}</ChatOverlay>
            </div>

            <div
                style={{
                    height: "100vh",
                    display: chatActive ? "none" : "block"
                }}
            >
                <iframe
                    id="figdemo"
                    title="Figma"
                    src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FTyPhkWwjZIH8x9xAOJLkX6%2FCX-Revolution-v2%3Fpage-id%3D0%253A1%26node-id%3D39%253A38780%26viewport%3D519%252C358%252C0.07%26scaling%3Dscale-down%26starting-point-node-id%3D39%253A38780"
                    style={{
                        width: "100%",
                        minWidth: "100%",
                        height: "100%",
                        border: "none"
                    }}
                />
                <div>..</div>
            </div>
        </>
    );
};

export default Figma;
