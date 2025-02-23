import { useSession } from "next-auth/react";

const HomeSection = () => {
    const { data: session, status } = useSession();
    const backgroundVideo = '/mashhead.mp4';

    return (
        <section id="home" className="relative min-h-[500px] flex flex-col justify-center items-center overflow-hidden">
            {/* Video Background */}
            <video 
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={backgroundVideo} type="video/mp4" />
            </video>

            {/* Overlay to make text more readable */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

            {/* Text Content */}
            <div className="relative z-10 text-5xl font-bold text-green-400 text-center font-razer uppercase tracking-widest">
                {status === "loading" 
                    ? "Loading..." 
                    : session?.user 
                    ? `Welcome back!! ${session.user.name}` 
                    : "Welcome to Razer shopping!"}
            </div>
        </section>
    );
};

export default HomeSection;



