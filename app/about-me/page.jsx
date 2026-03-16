"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { Cinzel, Cormorant_Garamond, Playfair_Display } from "next/font/google";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500"],
});


const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
});

export default function AboutSection() {

    const fadeLeft = {
        hidden: { opacity: 0, x: -80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
    };

    const fadeRight = {
        hidden: { opacity: 0, x: 80 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
    };

    const pop = {
        hidden: { opacity: 0, scale: 0.7 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } }
    };

    return (
        <section className="w-full bg-[#e8e6df] py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* IMAGE SIDE */}
                <motion.div
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative order-1 md:order-2 flex justify-center py-10 md:py-16"
                >

                    {/* HELLO TEXT */}
                    <h2 className={`${playfair.className} absolute top-0 md:-top-3 text-[38px] md:text-[80px] italic text-gray-300 z-0 whitespace-nowrap`}>
                        Hello There
                    </h2>

                    {/* MAIN IMAGE */}
                    <motion.div
                        variants={pop}
                        className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden z-10"
                    >
                        <Image
                            src="/YP-Profile.png"
                            alt="Yashasvi Prasad"
                            fill
                            className="object-cover "
                        />
                    </motion.div>

                    {/* WRITING DECOR */}
                    <motion.div
                        variants={fadeRight}
                        className="absolute -right-5 md:-right-20 top-16 md:top-20 z-20 w-24 sm:w-32 md:w-56"
                    >
                        <Image
                            src="/writting.png"
                            alt="decor"
                            width={260}
                            height={260}
                        />
                    </motion.div>

                    {/* BOOKS DECOR */}
                    <motion.div
                        variants={fadeRight}
                        className="absolute right-2 md:-right-16 bottom-5 z-20 w-24 sm:w-32 md:w-56"
                    >
                        <Image
                            src="/Aboutmebooksrev.png"
                            alt="decor"
                            width={260}
                            height={260}
                        />
                    </motion.div>

                    {/* GLASSES DECOR */}
                    <motion.div
                        variants={fadeLeft}
                        className="absolute left-2 md:left-5 bottom-6 md:bottom-10 z-20 w-24 sm:w-32 md:w-40"
                    >
                        <Image
                            src="/Aboutmeglassesrev.png"
                            alt="decor"
                            width={160}
                            height={160}
                        />
                    </motion.div>

                </motion.div>

                {/* TEXT SIDE */}
                <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`${cormorant.className} order-2 md:order-1 w-full`}
                >

                    <h1 className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl font-serif mb-6 tracking-wide`}>
                        I am Yashasvi Prasad
                    </h1>

                    <p className=" leading-relaxed text-justify max-w-xl space-y-4">

                        Writes about decision-making, judgment, and the hidden costs of staying too long in situations that no longer evolve. His work focuses on how people evaluate choices under pressure, when risk, identity, financial constraint, and social expectation intersect.

                        <br /><br />

                        Rather than offering motivation or prescriptive advice, he examines how decisions drift over time, how persistence becomes automatic, and how clarity often arrives long before action feels permitted. His frameworks are shaped by years of observing real-world patterns in careers, organisations, and high-accountability environments where outcomes matter and errors carry consequences.

                        <br /><br />

                        His writing emphasises structure over urgency, explanation over encouragement, and judgment over endurance. The aim is not to tell readers what to do, but to help them recognise what they already know and decide without guilt, fear, or self-betrayal.

                    </p>

                </motion.div>

            </div>




            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 md:gap-16 items-center md:py-8">

                {/* IMAGE SIDE */}
                <motion.div
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative order-1 md:order-2 flex justify-center py-10 md:py-16"
                >

                    <Image
                        src="/book1.png"
                        // alt={blog.title}
                        alt='book'
                        width={500}
                        height={400}

                        className="w-full h-125 object-contain  group-hover:scale-105 transition duration-500"
                    />
                </motion.div>

                {/* TEXT SIDE */}
                <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`${cormorant.className} order-1 md:order-2 w-full`}
                >

                    <h1 className={`${cinzel.className} text-3xl sm:text-4xl md:text-5xl font-serif mb-6 tracking-wide`}>
                        The Book
                    </h1>

                    <p className=" leading-relaxed text-justify max-w-xl space-y-4">

                        Staying isn’t always strength. Sometimes it’s avoidance. <br />
                        When Staying Stops Making Sense is a clear, grounded guide for people who feel stuck in careers, roles, or situations they can no longer justify but are afraid to leave. Drawing on decision-making psychology and real-world reasoning, the book helps readers distinguish between patience and inertia, resilience and self-betrayal. <br />
                        Rather than offering motivational slogans, it provides a practical framework for making decisions under uncertainty, recognising burnout, and understanding when quitting is not failure but strategy. <br />
                        This book is for thoughtful professionals who don’t want permission, drama, or regret, just clarity.

                    </p>

                </motion.div>

            </div>
        </section>
    );
}