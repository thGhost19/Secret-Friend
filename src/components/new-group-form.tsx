"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Mail,
    Trash2
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Participant {
    name: string;
    email: string;
}

export default function NewGroupForm({
    loggedUser }: {
    loggedUser: {
        email: string,
        id: string;
    }}) {
    const [participants, setParticipants] = useState<Participant[]>([
        { name: "", email: loggedUser.email }
    ]);

    const [groupName, setGroupName] = useState("");

    function updateParticipant(
        index: number,
        field: keyof Participant,
        value: string
    ) {
        const updatedParticipant = [ ...participants ];
        updatedParticipant[index][field] = value;
        setParticipants(updatedParticipant);
    }

    function removeParticipant(index: number) {
        setParticipants(
            participants.filter((_, i) => i !== index)
        )
    }

    function addParticipant() {
        setParticipants(participants.concat({name: "", email: ""}))
    }

    return (
        <Card className={"w-full max-w-2xl mx-auto"}>
            <CardHeader>
                <CardTitle>Novo Grupo</CardTitle>
                <CardDescription>Convide seus amigos para participar</CardDescription>
            </CardHeader>
            <form action={() => {}}>
                <CardContent className={"space-y-4"}>
                    <div className={"space-y-2"}>
                        <Label htmlFor={"group-name"}>Nome do grupo</Label>
                        <Input
                            id={"group-name"}
                            name={"group-name"}
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder={"digite o nome do grupo"}
                            required
                        />
                    </div>

                    <h2 className={"!mt-12"}>Participantes</h2>
                    {participants.map((participant, index) => (
                        <div key={index}
                             className={"flex flex-col md:flex-row items-end space-y-4 md:space-y-0 md:space-x-4"}>
                            <div className={"flex-row space-y-2 w-full"}>
                                <Label htmlFor={`name-${index}`}>Nome</Label>
                                <Input
                                    id={`name-${index}`}
                                    name={"name"}
                                    value={participant.name}
                                    onChange={(e) => {
                                        updateParticipant(index, "name", e.target.value);
                                    }}
                                    placeholder={"Digite o nome da pessoa!"}
                                    required
                                />
                            </div>

                            <div className={"flex-row space-y-2 w-full"}>
                                <Label htmlFor={`email-${index}`}>Email</Label>
                                <Input
                                    id={`email-${index}`}
                                    name={"email"}
                                    type={"email"}
                                    value={participant.email}
                                    onChange={(e) => {
                                        updateParticipant(index, "email", e.target.value);
                                    }}
                                    placeholder={"Digite o email da pessoa!"}
                                    className={"readonly:text-muted-foreground"}
                                    readOnly={participant.email === loggedUser.email}
                                    required
                                />
                            </div>

                            <div className={"min-w-9"}>
                                {participants.length > 1 && participant.email != loggedUser.email && (
                                    <Button
                                        type={"button"}
                                        variant={"outline"}
                                        size={"icon"}
                                        onClick={() => removeParticipant(index)}
                                    >
                                        <Trash2 className={"h-4 w-4"}/>
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
                <Separator className={"my-4"}/>
                <CardFooter className={"flex flex-col md:flex-row justify-between space-y-4 md:space-y-0"}>
                    <Button
                        type={"button"}
                        variant={"outline"}
                        onClick={addParticipant}
                        className={"w-full md:w-auto"}
                    >
                        Adicionar Amigo
                    </Button>

                    <Button
                        type={"submit"}
                        className={"flex items-center space-x-2 w-full md:w-auto"}
                    >
                        <Mail className={"w-3 h-3"}/> Criar grupo e enviar emails
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
