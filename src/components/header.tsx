import Link from "next/link";
import {Gift, UsersRound} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Header() {
    return (
        <header className="border-b">
            <div className={"container mx-auto p-4"}>
                <div className={"flex justify-between items-center"}>
                <Link href="/" className={"text-2xl font-bold flex items-center gap-2"} >
                    <Gift className={"h-6 w-6 text-red-400"}/>
                    <span>
                        Amigo
                        <span className={"font-thin"}>
                            Secreto
                        </span>
                    </span>
                </Link>

                    <nav className="flex items-center space-x-4">
                        <Link href="/app/grupos" className={"text-foreground text-sm flex gap-2 items-center"}>
                            <UsersRound className={"w-4 h-4"} />
                            Meus grupos
                        </Link>

                        <Button asChild variant={"outline"}>
                            <Link href={"/app/grupos/novo"}>
                                Novo grupo
                            </Link>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
