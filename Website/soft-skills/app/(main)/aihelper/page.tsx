import { FeedWrapper } from "@/components/feed-wrapper";
import Image from "next/image";

const AIHelperPage = async () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src="/ai.svg"
                        alt="AI"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        AI Helper
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Test your Soft Skills with AI!
                    </p>
                </div>
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