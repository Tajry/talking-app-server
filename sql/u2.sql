create table if not exists public.comment (
    id bigserial primary key,
    user_id bigint references public.users (id),
    posts_id bigint references public.posts (id),
    content text,
    created_at timestamp default now(),
    updated_at timestamp default now()
)