import { Session } from "@supabase/supabase-js";


type ContextType = {
    session: Session | null;
    loading: boolean;
}

type Props = {
    children: React.ReactNode;
};

type Todo = {
    user_id: string;
    task: string;
    is_completed: boolean;
    date_created: string;
};

type ProfileUpdateInfo = {
    username: string;
    email: string;
    full_name: string;
    password: string;
    website: string;
    bio: string;
    avatar_url: string;
};



export type { ContextType, Props, Todo, ProfileUpdateInfo };