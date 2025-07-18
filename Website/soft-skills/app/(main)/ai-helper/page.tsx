import { FeedWrapper } from "@/components/feed-wrapper";
import Image from "next/image";

const AIHelperPage = async () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <FeedWrapper>
                <iframe
                        src="https://www.chatbase.co/chatbot-iframe/PdZDVMZeCwItf-I0gWh4j"
                        width="80%"
                        height="175%"
                        className="rounded-xl mx-auto"
                />
            </FeedWrapper>
        </div>
    );
};

export default AIHelperPage;