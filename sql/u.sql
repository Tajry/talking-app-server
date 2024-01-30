create extension if not exists citext;


create table if not exists public.users (
    id bigserial primary key,
    username citext unique not null,
    password text ,
    avatar text,
    created_at timestamp default now(),
    updated_at timestamp default now()
);


create table if not exists public.posts (
    id bigserial primary key ,
    user_id bigint references public.users (id),
    content text,
    created_at timestamp default now(),
    updated_at timestamp default now()
);


create table if not exists public.comment (
    id bigserial primary key,
    user_id bigint references public.users (id),
    posts_id bigint references public.posts (id),
    content text,
    created_at timestamp default now(),
    updated_at timestamp default now()
)