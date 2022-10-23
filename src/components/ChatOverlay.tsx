import { AspectRatio } from "@twilio-paste/core";

type Props = {
    children?: React.ReactNode;
};

export const ChatOverlay: React.FC<Props> = ({ children }) => {
    return (
        <div
            style={{
                margin: "calc(12px + 48px)",
                height: "100%",
                alignContent: "center"
            }}
        >
            <AspectRatio ratio="19:9">
                <div
                    style={{
                        //   height: "auto",
                        height: "calc(100vh - (48px * 2) - (20px))",
                        margin: "0 auto",
                        position: "relative",
                        width: "380px",
                        backgroundColor: "#212226"
                    }}
                >
                    {children}
                </div>
            </AspectRatio>
        </div>
    );
};
