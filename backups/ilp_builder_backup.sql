--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'admin',
    'creator',
    'learner'
);


ALTER TYPE public."enum_Users_role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Paths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Paths" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    is_public boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    creator_id integer
);


ALTER TABLE public."Paths" OWNER TO postgres;

--
-- Name: Paths_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Paths_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Paths_id_seq" OWNER TO postgres;

--
-- Name: Paths_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Paths_id_seq" OWNED BY public."Paths".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    role public."enum_Users_role" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: certificates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificates (
    id integer NOT NULL,
    user_id integer,
    path_id integer,
    issue_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    certificate_link character varying
);


ALTER TABLE public.certificates OWNER TO postgres;

--
-- Name: certificates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.certificates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.certificates_id_seq OWNER TO postgres;

--
-- Name: certificates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.certificates_id_seq OWNED BY public.certificates.id;


--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollments (
    id integer NOT NULL,
    path_id integer,
    user_id integer,
    enrollment_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.enrollments OWNER TO postgres;

--
-- Name: enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enrollments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.enrollments_id_seq OWNER TO postgres;

--
-- Name: enrollments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enrollments_id_seq OWNED BY public.enrollments.id;


--
-- Name: learning_paths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_paths (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    is_public boolean DEFAULT true,
    creator_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.learning_paths OWNER TO postgres;

--
-- Name: learning_paths_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.learning_paths_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.learning_paths_id_seq OWNER TO postgres;

--
-- Name: learning_paths_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.learning_paths_id_seq OWNED BY public.learning_paths.id;


--
-- Name: progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.progress (
    id integer NOT NULL,
    user_id integer,
    resource_id integer,
    is_completed boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.progress OWNER TO postgres;

--
-- Name: progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.progress_id_seq OWNER TO postgres;

--
-- Name: progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.progress_id_seq OWNED BY public.progress.id;


--
-- Name: resources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resources (
    id integer NOT NULL,
    path_id integer,
    type character varying(50) NOT NULL,
    url text NOT NULL,
    resource_order integer NOT NULL,
    title character varying(255),
    description text,
    estimated_time integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.resources OWNER TO postgres;

--
-- Name: resources_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.resources_id_seq OWNER TO postgres;

--
-- Name: resources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resources_id_seq OWNED BY public.resources.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: Paths id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Paths" ALTER COLUMN id SET DEFAULT nextval('public."Paths_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: certificates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates ALTER COLUMN id SET DEFAULT nextval('public.certificates_id_seq'::regclass);


--
-- Name: enrollments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments ALTER COLUMN id SET DEFAULT nextval('public.enrollments_id_seq'::regclass);


--
-- Name: learning_paths id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_paths ALTER COLUMN id SET DEFAULT nextval('public.learning_paths_id_seq'::regclass);


--
-- Name: progress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress ALTER COLUMN id SET DEFAULT nextval('public.progress_id_seq'::regclass);


--
-- Name: resources id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources ALTER COLUMN id SET DEFAULT nextval('public.resources_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: Paths; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Paths" (id, title, description, is_public, "createdAt", "updatedAt", creator_id) FROM stdin;
1	Web Development Basics	Learn the fundamentals of web development	t	2025-04-20 19:16:57.321+05:30	2025-04-20 19:16:57.321+05:30	2
2	Frontend Development	It includes javascript,reactjs and node js 	t	2025-04-21 06:13:28.953+05:30	2025-04-21 06:13:28.953+05:30	4
3	Backend Development	It includes nodejs and express	t	2025-04-21 06:29:53.726+05:30	2025-04-21 06:29:53.726+05:30	4
4	Backend Development	It includes nodejs and express	t	2025-04-21 06:30:06.254+05:30	2025-04-21 06:30:06.254+05:30	4
5	Backend Development	node js ,express	t	2025-04-21 07:02:14.685+05:30	2025-04-21 07:02:14.685+05:30	4
6	Javascript	It is javascript fundamentals	t	2025-04-21 08:05:17.512+05:30	2025-04-21 08:05:17.512+05:30	4
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, name, email, password, role, "createdAt", "updatedAt") FROM stdin;
1	Aswini	ashukommineni14@gmail.com	$2b$10$MnyYMcXYnIirZkcMiEjKqeXnLpvMYb3E858qhzXNn7ptzPqWayKFq	admin	2025-04-20 19:12:33.428+05:30	2025-04-20 19:12:33.428+05:30
2	Lahari	komminenilahari12@gmail.com	$2b$10$i6Vso52Snv9NwOLcytwquu1Rox6/mcDgQgi747abidK9/4eyZSXCm	creator	2025-04-20 19:14:55.256+05:30	2025-04-20 19:14:55.256+05:30
3	Sneha	sneha@gmail.com	$2b$10$nUy0d2wxNLLkmOesqyZzUeY.dZrz4iwD5McjKFsN77gHaOpowcdle	learner	2025-04-21 05:17:13.82+05:30	2025-04-21 05:17:13.82+05:30
4	Monika	monika@gmail.com	$2b$10$m9YMTs61xb8TwShBX70IdeeeWfaI/vSyctEvQwNzEmSgIgWgVHZM2	creator	2025-04-21 05:58:40.703+05:30	2025-04-21 05:58:40.703+05:30
\.


--
-- Data for Name: certificates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certificates (id, user_id, path_id, issue_date, certificate_link) FROM stdin;
5	8	3	2025-04-21 14:46:46.532659	\N
6	8	1	2025-04-21 14:47:37.278448	\N
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrollments (id, path_id, user_id, enrollment_date) FROM stdin;
1	1	2	2025-04-21 10:02:34.405666
2	2	2	2025-04-21 10:02:34.405666
\.


--
-- Data for Name: learning_paths; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_paths (id, title, description, is_public, creator_id, created_at, updated_at) FROM stdin;
1	Introduction to Python	Learn the basics of Python programming	t	1	2025-04-21 10:02:34.37579	2025-04-21 10:02:34.37579
2	Mastering JavaScript	Become an expert in JavaScript for web development	f	1	2025-04-21 10:02:34.37579	2025-04-21 10:02:34.37579
3	Android Development Basics	A beginner-friendly path to learn how to build Android apps using Kotlin and Android Studio.	t	2	2025-04-21 10:11:19.63243	2025-04-21 10:11:19.63243
5	Introduction to Cloud Computing	Understand the basic concepts of cloud computing, including the definition, types of cloud models, and service models.	t	2	2025-04-21 15:59:24.680918	2025-04-21 15:59:24.680918
6	Frontend Web Development Basics	A beginner-friendly path covering HTML, CSS, and JavaScript essentials.	t	2	2025-04-21 16:33:04.702088	2025-04-21 16:33:04.702088
\.


--
-- Data for Name: progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.progress (id, user_id, resource_id, is_completed, created_at, updated_at) FROM stdin;
5	2	2	t	2025-04-21 10:09:09.508097	2025-04-21 10:09:09.508097
6	2	3	t	2025-04-21 10:09:11.75326	2025-04-21 10:09:11.75326
15	10	4	t	2025-04-21 15:16:55.373573	2025-04-21 15:16:55.373573
12	8	4	t	2025-04-21 14:42:04.806848	2025-04-21 14:42:04.806848
16	11	4	t	2025-04-21 15:22:48.818101	2025-04-21 15:22:48.818101
17	11	2	t	2025-04-21 15:43:27.42066	2025-04-21 15:43:27.42066
18	11	3	t	2025-04-21 15:43:35.790643	2025-04-21 15:43:35.790643
19	10	2	t	2025-04-21 15:44:33.153151	2025-04-21 15:44:33.153151
20	10	3	t	2025-04-21 15:45:55.830506	2025-04-21 15:45:55.830506
21	2	4	t	2025-04-21 15:48:47.112475	2025-04-21 15:48:47.112475
22	12	4	t	2025-04-21 15:52:06.697534	2025-04-21 15:52:06.697534
23	12	2	t	2025-04-21 15:52:30.443143	2025-04-21 15:52:30.443143
24	12	3	t	2025-04-21 15:55:20.808944	2025-04-21 15:55:20.808944
25	2	5	t	2025-04-21 16:04:58.043033	2025-04-21 16:04:58.043033
26	8	8	t	2025-04-21 16:54:41.42275	2025-04-21 16:54:41.42275
13	8	2	t	2025-04-21 14:47:16.60426	2025-04-21 14:47:16.60426
14	8	3	t	2025-04-21 14:47:35.674743	2025-04-21 14:47:35.674743
\.


--
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resources (id, path_id, type, url, resource_order, title, description, estimated_time, created_at) FROM stdin;
2	1	video	https://example.com/python-video	1	Python Basics	Learn about variables, data types, and functions in Python	40	2025-04-21 10:02:34.397903
3	1	article	https://example.com/python-article	2	Control Structures in Python	Learn how to use loops and conditionals in Python	50	2025-04-21 10:02:34.397903
4	3	video	https://www.youtube.com/watch?v=fis26HvvDII	1	Introduction to Android Development	Learn what Android development is, tools needed, and basics of the platform.	30	2025-04-21 10:12:31.664084
5	5	article	https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-cloud-computing/	0	What is Cloud Computing?	introduction	15	2025-04-21 16:01:32.834612
6	5	video	https://www.youtube.com/watch?v=2WbwpJ47bbM	1	 Introduction to Cloud Computing 	basics	10	2025-04-21 16:02:42.084255
7	5	quiz	https://clickydrip.com/personality-quiz-google-forms/	2	Cloud Computing Basics Quiz	Basic quiz	30	2025-04-21 16:03:47.720952
8	6	video	https://www.youtube.com/watch?v=UB1O30fR-EE	0	HTML Crash Course	Learn the basics of HTML in this crash course.	45	2025-04-21 16:33:47.944322
9	6	article	https://css-tricks.com/snippets/css/a-guide-to-flexbox/	1	CSS Flexbox Guide	Master Flexbox layout with this detailed article.	30	2025-04-21 16:34:31.292399
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password_hash, role, created_at, updated_at) FROM stdin;
1	Aswini	ashukommineni14@gmail.com	$2b$10$RoP3HX9THSPtB5NImcKCdOUgnNtUE01Me4kMjvFUP82bfb8P9N3V2	admin	2025-04-21 09:12:58.749997	2025-04-21 09:12:58.749997
2	Lahari	komminenilahari12@gmail.com	$2b$10$0dPG0UosXsg3nutFKtXQH.2ldVvTLNJFTdBvEn.ECQHcNEOPomCVy	creator	2025-04-21 09:15:25.019956	2025-04-21 09:15:25.019956
8	Monika	monika@gmail.com	$2b$10$VLkUYiq9JIKuCgpydst4mOfVTy1WIYdTKIwnkhrK0tSG24BmSAksa	learner	2025-04-21 13:38:57.568775	2025-04-21 13:38:57.568775
9	Amruta	amruta@gmail.com	$2b$10$b9lJY21/Khs/QkgFL6vn/uFkBoKoCQdV/rrUPABWhL7uDNtSdhbrq	learner	2025-04-21 13:52:07.503252	2025-04-21 13:52:07.503252
10	Prasanna	prasanna@gmail.com	$2b$10$QR.xjj7Ndsmwn0Kx6NX5.eWR3Iyq1KvisHbHCwxtofekD1yY5Hg7C	learner	2025-04-21 15:16:37.077833	2025-04-21 15:16:37.077833
11	Varshini	varshini@gmail.com	$2b$10$pyDy3zHyCbTkEAiABmF2puge.cwqF6OmBVYeF0QAOAr/0KN2wr8mq	learner	2025-04-21 15:22:28.191646	2025-04-21 15:22:28.191646
12	Pravallika	pravallika@gmail.com	$2b$10$GozrMaa3ZiALU/cusxWuiOXLvVo0lyzEGb8XFjqLZH5EgolNf0RVG	learner	2025-04-21 15:51:34.636723	2025-04-21 15:51:34.636723
\.


--
-- Name: Paths_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Paths_id_seq"', 6, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 4, true);


--
-- Name: certificates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.certificates_id_seq', 6, true);


--
-- Name: enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enrollments_id_seq', 2, true);


--
-- Name: learning_paths_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.learning_paths_id_seq', 6, true);


--
-- Name: progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.progress_id_seq', 26, true);


--
-- Name: resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resources_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: Paths Paths_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Paths"
    ADD CONSTRAINT "Paths_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_email_key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key1" UNIQUE (email);


--
-- Name: Users Users_email_key10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key10" UNIQUE (email);


--
-- Name: Users Users_email_key11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key11" UNIQUE (email);


--
-- Name: Users Users_email_key12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key12" UNIQUE (email);


--
-- Name: Users Users_email_key13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key13" UNIQUE (email);


--
-- Name: Users Users_email_key14; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key14" UNIQUE (email);


--
-- Name: Users Users_email_key15; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key15" UNIQUE (email);


--
-- Name: Users Users_email_key16; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key16" UNIQUE (email);


--
-- Name: Users Users_email_key17; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key17" UNIQUE (email);


--
-- Name: Users Users_email_key18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key18" UNIQUE (email);


--
-- Name: Users Users_email_key19; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key19" UNIQUE (email);


--
-- Name: Users Users_email_key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key2" UNIQUE (email);


--
-- Name: Users Users_email_key20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key20" UNIQUE (email);


--
-- Name: Users Users_email_key21; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key21" UNIQUE (email);


--
-- Name: Users Users_email_key22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key22" UNIQUE (email);


--
-- Name: Users Users_email_key23; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key23" UNIQUE (email);


--
-- Name: Users Users_email_key24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key24" UNIQUE (email);


--
-- Name: Users Users_email_key25; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key25" UNIQUE (email);


--
-- Name: Users Users_email_key26; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key26" UNIQUE (email);


--
-- Name: Users Users_email_key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key3" UNIQUE (email);


--
-- Name: Users Users_email_key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key4" UNIQUE (email);


--
-- Name: Users Users_email_key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key5" UNIQUE (email);


--
-- Name: Users Users_email_key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key6" UNIQUE (email);


--
-- Name: Users Users_email_key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key7" UNIQUE (email);


--
-- Name: Users Users_email_key8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key8" UNIQUE (email);


--
-- Name: Users Users_email_key9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key9" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: certificates certificates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_pkey PRIMARY KEY (id);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- Name: learning_paths learning_paths_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_paths
    ADD CONSTRAINT learning_paths_pkey PRIMARY KEY (id);


--
-- Name: progress progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT progress_pkey PRIMARY KEY (id);


--
-- Name: resources resources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: Paths Paths_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Paths"
    ADD CONSTRAINT "Paths_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: certificates certificates_path_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_path_id_fkey FOREIGN KEY (path_id) REFERENCES public.learning_paths(id) ON DELETE CASCADE;


--
-- Name: certificates certificates_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: enrollments enrollments_path_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_path_id_fkey FOREIGN KEY (path_id) REFERENCES public.learning_paths(id) ON DELETE CASCADE;


--
-- Name: enrollments enrollments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: learning_paths learning_paths_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_paths
    ADD CONSTRAINT learning_paths_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: progress progress_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT progress_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.resources(id) ON DELETE CASCADE;


--
-- Name: progress progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress
    ADD CONSTRAINT progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: resources resources_path_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resources
    ADD CONSTRAINT resources_path_id_fkey FOREIGN KEY (path_id) REFERENCES public.learning_paths(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

