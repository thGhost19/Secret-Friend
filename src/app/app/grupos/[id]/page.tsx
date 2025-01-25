import {createClient} from "@/utils/supabase/server";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Separator} from "@/components/ui/separator";
import {TextRevealCard, TextRevealCardTitle} from "@/components/ui/text-reveal-card";

export default async function GroupIdPage({params}: { params: { id: string } }) {
    const supabase = await createClient();
    const {data: authUser} = await supabase.auth.getUser();

    const groupId = (await params).id;

    const {data, error} = await supabase.from('groups').select(
        `
            name,
            participants (*)
        `
    )
        .eq("id", groupId)
        .single();

    if (error) {
        return <p>Erro ao carregar o grupo</p>;
    }

    const assignedParticipantId = data.participants.find(
        (p) => authUser?.user?.email === p.email,
    )?.assigned_to;

    const assignedParticipant = data.participants.find(
        (p) => p.id === assignedParticipantId
    );


    return (
        <main className={"container mx-auto py-6"}>
            <Card className={"w-auto max-w-3xl mx-auto"}>
                <CardHeader>
                    <div className={"flex items-center justify-between"}>
                        <CardTitle className={"text-2xl"}>
                            Grupo{" "}
                            <span className={"font-light underline decoration-red-400"}>
                             {data.name}
                         </span>
                        </CardTitle>
                    </div>
                    <CardDescription>
                        Informações do grupo e participantes
                    </CardDescription>
                    <CardContent>
                        <h2 className={"text-xl font-semibold mb-4"}></h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Email</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.participants.map((participant) => (
                                        <TableRow key={participant.id}>
                                            <TableCell>{participant.name}</TableCell>
                                            <TableCell>{participant.email}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        <Separator className={"my-6"}/>
                        <TextRevealCard
                            text="Passe o mouse ou dedo para revelar"
                            revealText={assignedParticipant.name}
                            className={"w-full"}
                        >
                            <TextRevealCardTitle>
                                Seu Amigo Secreto
                            </TextRevealCardTitle>
                        </TextRevealCard>
                    </CardContent>
                </CardHeader>
            </Card>
        </main>
    )
}
