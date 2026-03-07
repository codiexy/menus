import { PrivateLayout } from "../components/layouts";
import { Menus } from "../components/dish";

export default function Recommendations() {
    return (
        <PrivateLayout redirect={false}>
            <Menus recommendation={true} />
        </PrivateLayout>
    );
}