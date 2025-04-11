import { Suspense } from "react";
import ClientPage from "@/components/ClientPage";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading page...</div>}>
            <ClientPage />
        </Suspense>
    );
}
