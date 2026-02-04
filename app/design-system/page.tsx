"use client";

import React from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card, {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Checkbox from "@/components/ui/Checkbox";
import Switch from "@/components/ui/Switch";
import Skeleton from "@/components/ui/Skeleton";
import Table from "@/components/ui/Table";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";
import PageHeader from "@/components/layout/PageHeader";

export default function DesignSystemPage() {
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const tableData = [
        {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            status: "Active",
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            status: "Pending",
        },
        {
            id: "3",
            name: "Sam Wilson",
            email: "sam@example.com",
            status: "Inactive",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 flex flex-col gap-12">
            <PageHeader
                title="Design System"
                description="A showcase of the reusable components built for MsgBill."
                action={
                    <Button onClick={() => setIsModalOpen(true)}>
                        Open Modal
                    </Button>
                }
            />

            {/* Colors & Typography */}
            <section>
                <h2 className="text-2xl font-bold mb-4">
                    Typography & Design Tokens
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Text Styles</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <h1 className="text-5xl font-bold">Heading 1</h1>
                            <h2 className="text-4xl font-bold">Heading 2</h2>
                            <h3 className="text-3xl font-bold">Heading 3</h3>
                            <p className="text-base text-secondary-600">
                                Standard body text with secondary color.
                            </p>
                            <p className="text-sm font-medium">
                                Small medium weight text.
                            </p>
                            <code className="text-sm font-mono bg-secondary-100 p-1 rounded">
                                monospace_code_sample
                            </code>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Colors</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-5 gap-2">
                            <div className="h-12 bg-primary-600 rounded flex items-center justify-center text-white text-[10px]">
                                Primary
                            </div>
                            <div className="h-12 bg-secondary-600 rounded flex items-center justify-center text-white text-[10px]">
                                Secondary
                            </div>
                            <div className="h-12 bg-success-600 rounded flex items-center justify-center text-white text-[10px]">
                                Success
                            </div>
                            <div className="h-12 bg-error-600 rounded flex items-center justify-center text-white text-[10px]">
                                Error
                            </div>
                            <div className="h-12 bg-warning-600 rounded flex items-center justify-center text-white text-[10px]">
                                Warning
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Buttons */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Buttons</h2>
                <div className="flex flex-wrap gap-4 p-6 bg-white border rounded-xl">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button isLoading>Loading</Button>
                    <Button variant="outline" leftIcon={<span>🚀</span>}>
                        Icon Left
                    </Button>
                </div>
            </section>

            {/* Forms */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Form Elements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Inputs</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <Input
                                label="Name"
                                placeholder="Full Name"
                                required
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="john@example.com"
                                error="Please enter a valid email"
                            />
                            <Select
                                label="Plan"
                                options={[
                                    { label: "Free", value: "free" },
                                    { label: "Pro", value: "pro" },
                                    {
                                        label: "Enterprise",
                                        value: "enterprise",
                                    },
                                ]}
                            />
                            <Textarea
                                label="Bio"
                                placeholder="Tell us about yourself..."
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Controls</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <Checkbox
                                    label="Accept terms and conditions"
                                    defaultChecked
                                />
                                <Checkbox label="Subscribe to newsletter" />
                                <Checkbox label="Disabled option" disabled />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Switch label="Dark Mode" />
                                <Switch
                                    label="Enable Notifications"
                                    defaultChecked
                                />
                                <Switch
                                    label="Pro Feature"
                                    disabled
                                    size="sm"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Data Display */}
            <section>
                <h2 className="text-2xl font-bold mb-4">Data Display</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Badges</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Badge variant="primary">New</Badge>
                            <Badge variant="success" dot>Paid</Badge>
                            <Badge variant="warning" dot>Pending</Badge>
                            <Badge variant="error" dot>Overdue</Badge>
                            <Badge variant="secondary">Draft</Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Avatars</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4">
                            <Avatar size="lg" status="online" fallback="JD" />
                            <Avatar size="lg" status="busy" fallback="AS" />
                            <Avatar size="md" status="away" fallback="TW" />
                            <Avatar size="sm" status="offline" fallback="MK" />
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Data Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table headers={["Name", "Email", "Status"]}>
                            {tableData.map((row) => (
                                <tr key={row.id} className="border-b border-secondary-100 last:border-0 hover:bg-secondary-50">
                                    <td className="p-4">{row.name}</td>
                                    <td className="p-4">{row.email}</td>
                                    <td className="p-4">
                                        <Badge
                                            variant={row.status === "Active"
                                                ? "success"
                                                : "warning"}
                                        >
                                            {row.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    </CardContent>
                </Card>
            </section>

            {/* Feedback */}
            <section>
                <h2 className="text-2xl font-bold mb-4">
                    Feedback & Placeholders
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Toasts</CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={() =>
                                    addToast({
                                        title: "Success!",
                                        type: "success",
                                        message: "Profile updated.",
                                    })}
                            >
                                Success
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                    addToast({
                                        title: "Error!",
                                        type: "error",
                                        message: "Something went wrong.",
                                    })}
                            >
                                Error
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Skeletons</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <Skeleton
                                    variant="circular"
                                    width={48}
                                    height={48}
                                />
                                <div className="flex-1 space-y-2">
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" width="60%" />
                                </div>
                            </div>
                            <Skeleton height={100} />
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Modal Demo */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Sample Modal"
                description="This is a demonstration of the modal component."
                footer={
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                addToast({
                                    title: "Action Confirmed",
                                    type: "info",
                                });
                                setIsModalOpen(false);
                            }}
                        >
                            Confirm
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p>
                        Modals are great for focusing user attention on a
                        specific task or information.
                    </p>
                    <Input
                        label="Confirmation Code"
                        placeholder="Enter code..."
                    />
                </div>
            </Modal>
        </div>
    );
}
