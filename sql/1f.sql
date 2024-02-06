create extension if not exists citext;


create table if not exists public.follows (
    id bigserial primary key,
    follow_id bigint references public.users (id),
    follower bigint references public.users (id),
    created_at timestamp default now(),
    updated_at timestamp default now()
);







