'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SearchBar from './SearchBar';
import UserCircle from './UserCircle';
import { getClients } from '@/app/lib/clients';
import { getProjects } from '@/app/lib/projects';
import { getDeliveryNotes } from '@/app/lib/deliveryNotes';

export default function NavBar() {
    const pathname = usePathname();

    const handleSearch = async (query) => {
        if (!query) return [];

        if (pathname?.includes('clients')) {
            const clients = await getClients();
            return clients.filter(client =>
                client.name.toLowerCase().includes(query.toLowerCase())
            );
        } else if (pathname?.includes('projects')) {
            const projects = await getProjects();
            return projects.filter(project =>
                project.name.toLowerCase().includes(query.toLowerCase())
            );
        } else if(pathname?.includes('delivery')){
            const deliveries = await getDeliveryNotes();

            return deliveries.filter(delivery =>
                delivery.description.toLowerCase().includes(query.toLowerCase())
            );
        }
        return [];
    };

    return (
        <nav className="sticky top-0 bg-white shadow-sm w-full z-50">
            <div className="container mx-auto flex justify-between items-center h-20">
                <div className="flex gap-4 mt-3">
                    <Link className="text-black font-bold text-4xl" href="/">
                        MyApp
                    </Link>
                </div>

                <div className="flex-1 flex justify-center relative">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder={
                            pathname?.includes('clients')
                                ? 'Search clients...'
                                : pathname?.includes('projects')
                                ? 'Search projects...'
                                : pathname?.includes('delivery')
                                ? 'Search delivery notes...'
                                : 'Search...'
                        }
                    />
                </div>

                <UserCircle />
            </div>
        </nav>
    );
}
