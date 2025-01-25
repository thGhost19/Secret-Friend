'use client';

import {FlipWords} from "@/components/ui/flip-words";
import {BackgroundLines} from "@/components/ui/background-lines";
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const words = ["amigos", "presentes", "surpresas"];

    const handleClick = () => {
        router.push('/login');
    };

    return (
        <div>
            <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
                <div className="h-[40rem] flex justify-center items-center px-4">
                    <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
                        Organize seus
                        <FlipWords words={words}/> <br/>
                        e torne o amigo secreto mais divertido!
                    </div>
                </div>
                <button onClick={handleClick}
                    className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span
                    className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"/>
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Acesse
                    </span>
                </button>
            </BackgroundLines>

        </div>
    );
}
